package com.example.ruhungry.controller;

import com.alibaba.fastjson.JSONObject;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.example.ruhungry.common.RedisUtils;
import com.example.ruhungry.common.Response;
import com.example.ruhungry.entity.User;
import com.example.ruhungry.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.lang3.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.util.DigestUtils;

import org.springframework.web.bind.annotation.*;

import java.security.SecureRandom;
import java.util.ArrayList;
import java.util.Base64;
import java.util.List;

@RestController
@Slf4j
@RequestMapping("/user")
public class UserController {

    @Autowired
    private UserService userService;

    @PostMapping("/login")
    public Response<JSONObject> login(@RequestBody User user) {

        String password = user.getPassword();
        password = DigestUtils.md5DigestAsHex(password.getBytes());

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, user.getUsername());

        User usr = userService.getOne(queryWrapper);
        // log.info(usr.toString());

        if (usr == null) {
            return Response.error("Login Failed. No User Found.");
        }

        if (!usr.getPassword().equals(password)) {
            return Response.error("Wrong Password.");
        }

        if (usr.getIsOnline().equals(true)) {
            return Response.error("User has already logged in.");
        }

        usr.setIsOnline(true);
        boolean updated = userService.updateById(usr);

        if (!updated) {
            return Response.error("Update status Failed.");
        }

        SecureRandom secureRandom = new SecureRandom();
        byte[] bytes = new byte[16];
        secureRandom.nextBytes(bytes);
        String token = Base64.getUrlEncoder().encodeToString(bytes);
        // log.info(token);

        RedisUtils.setValue(token, usr.getUserId().toString());

        JSONObject responseJson = new JSONObject();
        responseJson.put("token", token);
        responseJson.put("userType", usr.getUserType());

        return Response.success("Login Success.", responseJson);

    }

    @PostMapping("/register")
    public Response<JSONObject> register(@RequestBody User user) {

        // Check if username is unique
        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUsername, user.getUsername());
        long count = userService.count(queryWrapper);
        if (count > 0) {
            return Response.error("Username already exists");
        }

        // Check if email is unique
        LambdaQueryWrapper<User> queryWrapper2 = new LambdaQueryWrapper<>();
        queryWrapper2.eq(User::getEmail, user.getEmail());
        long count2 = userService.count(queryWrapper2);
        if (count2 > 0) {
            return Response.error("Email already exists");
        }

        // Check password strength
        String password = user.getPassword();
        if (StringUtils.isEmpty(password) || password.length() < 8 ||
                !StringUtils.containsAny(password, "ABCDEFGHIJKLMNOPQRSTUVWXYZ") ||
                !StringUtils.containsAny(password, "0123456789") ||
                !StringUtils.containsAny(password, "abcdefghijklmnopqrstuvwxyz")
        ) {
            return Response.error("Invalid password. Password must be at least 8 characters and contain at least one uppercase letter, one lowercase letter, and one digit.");
        }

        List<String> picList = new ArrayList<>();
        picList.add("https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/cute-chef-panda-holding-sushi-cartoon-icon-illustration-animal-food-icon-concept-isolated-premium-vector.jpeg");
        picList.add("https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/cute-panda-drinking-boba-milk-tea-cartoon-icon-illustration-animal-food-icon-concept-isolated-premium-flat-cartoon-style-vector.jpeg");
        picList.add("https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/cute-panda-eating-cereal-and-milk-breakfast-cartoon-icon-illustration-animal-food-icon-concept-isolated-premium-flat-cartoon-style-vector.jpeg");
        picList.add("https://ruhungry6225.oss-ap-southeast-1.aliyuncs.com/userIcon/cute-panda-sipping-boba-milk-tea-cartoon-icon-illustration-animal-food-icon-concept-isolated-premium-flat-cartoon-style-vector.jpeg");

        int randomIndex = (int) (Math.random() * picList.size());

        user.setUserPics(picList.get(randomIndex));
        user.setPassword(DigestUtils.md5DigestAsHex(password.getBytes()));

        boolean success = userService.save(user);

        JSONObject responseJson = new JSONObject();
        if (success) {
            return Response.success("Successfully register", responseJson);
        } else {
            return Response.error("Failed to register user");
        }

    }

    @PostMapping("/logout")
    public Response<JSONObject> logout(@RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserId, user_id);

        User usr = userService.getOne(queryWrapper);
        // log.info(usr.toString());

        if (usr == null) {
            return Response.error("Logout Failed. No User Found.");
        }

        usr.setIsOnline(false);
        boolean updated = userService.updateById(usr);

        if (!updated) {
            return Response.error("Update status Failed.");
        }

        RedisUtils.delete(token);
        RedisUtils.delete("user:" + user_id + ":cart");

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully Logout.", responseJson);

    }

    @PutMapping("/updateAddress")
    public Response<JSONObject> updateAddress(@RequestBody User user, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Boolean isShop = userService.isShop(user_id);

        // log.info(isShop.toString());

        if (isShop) {
            return Response.error("You don't have permission to use this api.");
        }

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserId, user_id);

        User usr = userService.getOne(queryWrapper);
        // log.info(usr.toString());

        usr.setAddrAddress(user.getAddrAddress());
        usr.setAddrName(user.getAddrName());
        usr.setAddrPhone(user.getAddrPhone());

        boolean updated = userService.updateById(usr);

        if (!updated) {
            return Response.error("Update Address Failed.");
        }

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully Update Address.", responseJson);

    }

    @GetMapping("/info")
    public Response<User> getUser(@RequestHeader("Authorization") String token) {
        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        LambdaQueryWrapper<User> queryWrapper = new LambdaQueryWrapper<>();
        queryWrapper.eq(User::getUserId, user_id);

        User usr = userService.getOne(queryWrapper);
        usr.setPassword(null);

        return Response.success("Successfully Get Info.", usr);

    }


}