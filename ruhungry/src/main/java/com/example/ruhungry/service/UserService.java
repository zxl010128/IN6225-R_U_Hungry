package com.example.ruhungry.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.ruhungry.entity.User;

public interface UserService extends IService<User> {

    Boolean isShop(String user_id);

}