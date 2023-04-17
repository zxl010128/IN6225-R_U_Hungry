package com.example.ruhungry.controller;
import com.alibaba.fastjson.JSONObject;
import com.example.ruhungry.common.RedisUtils;
import com.example.ruhungry.common.Response;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import redis.clients.jedis.Jedis;

import java.util.Map;

@RestController
@RequestMapping("/cart")
public class CartController {

    private static final String REDIS_HOST = "localhost";
    private static final int REDIS_PORT = 6379;

    @PostMapping("/add")
    public Response<JSONObject> addToCart(@RequestBody Map<String, String> map, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        String key = "user:" + user_id + ":cart";
        String productName = map.get("productDescription");
        String number = map.get("number");

        Jedis jedis = null;

        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);

            if (jedis.hexists(key, productName)) {
                int currentNumber = Integer.parseInt(jedis.hget(key, productName));
                jedis.hset(key, productName, String.valueOf(currentNumber + 1));
            } else {
                jedis.hset(key, productName, number);
            }

        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully add to cart", responseJson);
    }

    @GetMapping("/getCart")
    public Response<Map<String, String>> addToCart(@RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Jedis jedis = null;
        Map<String, String> hashValues = null;

        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);

            hashValues = jedis.hgetAll("user:" + user_id + ":cart");

        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

        return Response.success("Successfully get info", hashValues);
    }

    @DeleteMapping("/delete")
    public Response<JSONObject> deleteToCart(@RequestBody Map<String, String> map, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        String key = "user:" + user_id + ":cart";
        String productName = map.get("productDescription");

        Jedis jedis = null;

        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);

            jedis.hdel(key, productName);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully delete cart product", responseJson);
    }

    @PutMapping("/put")
    public Response<JSONObject> updateToCart(@RequestBody Map<String, String> map, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        String key = "user:" + user_id + ":cart";
        String productName = map.get("productDescription");
        String productNum = map.get("productNum");

        Jedis jedis = null;

        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);

            jedis.hset(key, productName, productNum);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully update cart product", responseJson);
    }
}