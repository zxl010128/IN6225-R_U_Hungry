package com.example.ruhungry.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.ruhungry.entity.OrderRepo;

import java.util.List;


public interface OrderRepoService extends IService<OrderRepo> {

    List<OrderRepo> listOrdersByPage(int pageNum, int pageSize);

    int countAll();

    List<OrderRepo> getOrdersByUserId(Long userId);

    OrderRepo getOrderById(Long orderId);
}
