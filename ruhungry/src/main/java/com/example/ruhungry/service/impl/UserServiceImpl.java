package com.example.ruhungry.service.impl;

import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.ruhungry.common.RedisUtils;
import com.example.ruhungry.entity.User;
import com.example.ruhungry.mapper.UserMapper;
import com.example.ruhungry.service.UserService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import lombok.extern.slf4j.Slf4j;

@Service
public class UserServiceImpl extends ServiceImpl<UserMapper, User> implements UserService {

    @Autowired
    UserMapper userMapper;

    @Override
    public Boolean isShop(String user_id) {

        User user = this.getById(user_id);

        return user != null && user.getUserType().equals("Shop");

    }
}
