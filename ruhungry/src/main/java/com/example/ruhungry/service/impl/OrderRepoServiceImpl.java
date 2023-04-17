package com.example.ruhungry.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.ruhungry.entity.OrderRepo;
import com.example.ruhungry.mapper.OrderRepoMapper;
import com.example.ruhungry.service.OrderRepoService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
public class OrderRepoServiceImpl extends ServiceImpl<OrderRepoMapper, OrderRepo> implements OrderRepoService {
    @Autowired
    private OrderRepoMapper orderRepoMapper;

    @Override
    public List<OrderRepo> listOrdersByPage(int pageNum, int pageSize) {
        Page<OrderRepo> page = new Page<>(pageNum, pageSize);
        QueryWrapper<OrderRepo> wrapper = new QueryWrapper<>();
        wrapper.orderByAsc("order_id");
        return orderRepoMapper.selectPage(page, wrapper).getRecords();
    }

    @Override
    public int countAll() {
        return orderRepoMapper.countAll();
    }

    @Override
    public List<OrderRepo> getOrdersByUserId(Long userId) {
        QueryWrapper<OrderRepo> wrapper = new QueryWrapper<>();
        wrapper.eq("user_id", userId);
        return orderRepoMapper.selectList(wrapper);
    }

    @Override
    public OrderRepo getOrderById(Long orderId) {
        return orderRepoMapper.selectById(orderId);
    }
}
