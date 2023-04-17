package com.example.ruhungry.common;

import redis.clients.jedis.Jedis;

public class RedisUtils {

    private static final String REDIS_HOST = "localhost";
    private static final int REDIS_PORT = 6379;

    public static String getValue(String key) {
        Jedis jedis = null;
        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);
            return jedis.get(key);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
    }

    // Connect to Redis and set a key-value pair
    public static void setValue(String key, String value) {
        try (Jedis jedis = new Jedis(REDIS_HOST, REDIS_PORT)) {
            jedis.set(key, value);
        }
    }

    // Connect to Redis and delete a key-value pair
    public static void delete(String key) {
        Jedis jedis = null;
        try {
            jedis = new Jedis(REDIS_HOST, REDIS_PORT);
            jedis.del(key);
        } finally {
            if (jedis != null) {
                jedis.close();
            }
        }
    }

}