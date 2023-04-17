package com.example.ruhungry.common;

import lombok.Data;
import java.util.Map;
import java.util.HashMap;

@Data
public class Response<T> {

    private Integer code;

    private String msg;

    private T data;

    private Map map = new HashMap();

    public static <T> Response<T> success(String msg, T object) {
        Response<T> r = new Response<T>();
        r.data = object;
        r.msg = msg;
        r.code = 1;
        return r;
    }

    public static <T> Response<T> error(String msg) {
        Response r = new Response();
        r.msg = msg;
        r.code = 0;
        return r;
    }


}
