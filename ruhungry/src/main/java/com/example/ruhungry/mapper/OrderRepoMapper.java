package com.example.ruhungry.mapper;

import com.example.ruhungry.entity.OrderRepo;
import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

@Mapper
public interface OrderRepoMapper extends BaseMapper<OrderRepo> {
    @Select("select count(*) from OrderRepo")
    int countAll();
}
