package com.example.ruhungry.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;


@Data
@TableName("User")
public class User implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId
    private Integer userId;

    private String name;

    private String username;

    private String password;

    private String email;

    private String userPics;

    private Boolean isOnline;

    private String userType;

    private String addrPhone;

    private String addrName;

    private String addrAddress;
}
