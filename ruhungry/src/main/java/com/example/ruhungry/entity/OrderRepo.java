package com.example.ruhungry.entity;

import com.baomidou.mybatisplus.annotation.TableId;
import com.baomidou.mybatisplus.annotation.TableName;
import lombok.Data;

import java.io.Serializable;
import java.sql.Timestamp;


@Data
@TableName("OrderRepo")
public class OrderRepo implements Serializable {

    private static final long serialVersionUID = 1L;

    @TableId
    private Integer orderId;

    private Integer userId;

    private Timestamp createTime;

    private String orderContent;

    private String recipientAddress;

    private String recipientName;

    private String recipientPhone;

    private Double orderPrice;

    private String orderStatus;

}
