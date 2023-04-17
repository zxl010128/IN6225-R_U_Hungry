package com.example.ruhungry.mapper;

import com.baomidou.mybatisplus.core.mapper.BaseMapper;
import com.example.ruhungry.entity.Product;
import org.apache.ibatis.annotations.Mapper;
import org.apache.ibatis.annotations.Select;

import java.util.List;

@Mapper
public interface ProductMapper extends BaseMapper<Product> {

    @Select("select count(*) from Product")
    int countAll();

}
