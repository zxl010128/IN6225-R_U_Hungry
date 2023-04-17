package com.example.ruhungry.entity;

import com.baomidou.mybatisplus.annotation.TableField;
import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;

@Data
@TableName("Product")
public class Product implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId
    private Integer productId;
    
    private Integer UserId;
    
    private String productPic;
    
    private Double productPrice;
    
    private String productDescription;

    @TableField("product_is_stock")
    private Boolean productIsStock;

    private String productType;

    private String productReminder;
}
