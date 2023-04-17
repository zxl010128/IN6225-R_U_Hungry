package com.example.ruhungry.service.impl;

import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.baomidou.mybatisplus.extension.plugins.pagination.Page;
import com.baomidou.mybatisplus.extension.service.impl.ServiceImpl;
import com.example.ruhungry.entity.Product;
import com.example.ruhungry.mapper.ProductMapper;
import com.example.ruhungry.service.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

@Service
public class ProductServiceImpl extends ServiceImpl<ProductMapper, Product> implements ProductService {

    @Autowired
    private ProductMapper productMapper;

    @Override
    public List<Product> getAllProducts() {
        return productMapper.selectList(null);
    }

    @Override
    public List<Product> listProductsByPage(int pageNum, int pageSize) {
        Page<Product> page = new Page<>(pageNum, pageSize);
        QueryWrapper<Product> wrapper = new QueryWrapper<>();
        wrapper.orderByAsc("product_id");
        return productMapper.selectPage(page, wrapper).getRecords();
    }

    @Override
    public int countAll() {
        return productMapper.countAll();
    }

    @Override
    public Map<String, List<Product>> getAllProductsGroupedByType() {
        // 查询所有产品
        List<Product> productList = productMapper.selectList(null);

        // 按照产品类型分组
        Map<String, List<Product>> productMap = new HashMap<>();
        for (Product product : productList) {
            String productType = product.getProductType();
            if (!productMap.containsKey(productType)) {
                productMap.put(productType, new ArrayList<>());
            }
            productMap.get(productType).add(product);
        }

        return productMap;
    }

}
