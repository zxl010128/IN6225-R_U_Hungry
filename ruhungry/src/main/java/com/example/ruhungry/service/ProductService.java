package com.example.ruhungry.service;

import com.baomidou.mybatisplus.extension.service.IService;
import com.example.ruhungry.entity.Product;

import java.util.List;
import java.util.Map;

public interface ProductService extends IService<Product> {

    List<Product> getAllProducts();

    List<Product> listProductsByPage(int pageNum, int pageSize);

    int countAll();

    Map<String, List<Product>> getAllProductsGroupedByType();
}
