package com.example.ruhungry.controller;

import com.alibaba.fastjson.JSONObject;
import com.example.ruhungry.common.RedisUtils;
import com.example.ruhungry.common.Response;
import com.example.ruhungry.entity.OrderRepo;
import com.example.ruhungry.entity.User;
import com.example.ruhungry.service.OrderRepoService;
import com.example.ruhungry.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.util.List;

import static java.lang.Integer.parseInt;

@RestController
@Slf4j
@RequestMapping("/order")
public class OrderRepoController {

    @Autowired
    private UserService userService;

    @Autowired
    private OrderRepoService orderService;

    @GetMapping("/page")
    public Response<List<OrderRepo>> getAllProductsByPage(@RequestParam(value = "page", defaultValue = "1") int page,
                                                          @RequestParam(value = "size", defaultValue = "10") int size,
                                                          @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

//        log.info(Integer.toString(page));
//        log.info(Integer.toString(size));
//
//        log.info(productService.listProductsByPage(page, size).toString());

        return Response.success("Successfully fetch all orders", orderService.listOrdersByPage(page, size));
    }

    @GetMapping("/countAll")
    public Response<JSONObject> countAll(@RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("number", orderService.countAll());

        return Response.success("Successfully Count all", responseJson);
    }

    @PutMapping("/status/{id}")
    public Response<JSONObject> updateStatus(@PathVariable("id") Long id,
                                             @RequestHeader("Authorization") String token,
                                             @RequestBody JSONObject input) {

        String user_id = RedisUtils.getValue(token);
        String accept = input.getString("accept");

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        User user = userService.getById(user_id);
        OrderRepo order = orderService.getById(id);

        log.info(accept);

        if (user.getUserType().equals("Shop") && !order.getOrderStatus().equals("Received") &&
                !order.getOrderStatus().equals("Cooking") &&
                !order.getOrderStatus().equals("Delivering") &&
                !order.getOrderStatus().equals("Refunding")) {
            return Response.error("You don't have permission to change the status.");
        }

        if (user.getUserType().equals("User") && !order.getOrderStatus().equals("Delivered") && !order.getOrderStatus().equals("PaymentWaiting")) {
            return Response.error("You don't have permission to change the status.");
        }

        if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Received") && accept.equals("yes")) {
            order.setOrderStatus("Cooking");
        } else if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Received") && accept.equals("no")) {
            order.setOrderStatus("Order Rejected");
        } else if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Cooking")) {
            order.setOrderStatus("Delivering");
        } else if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Delivering")) {
            order.setOrderStatus("Delivered");
        } else if (user.getUserType().equals("User") && order.getOrderStatus().equals("Delivered")) {
            order.setOrderStatus("Refunding");
        } else if (user.getUserType().equals("User") && order.getOrderStatus().equals("PaymentWaiting")) {
            order.setOrderStatus("Received");
        } else if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Refunding") && accept.equals("yes")) {
            order.setOrderStatus("Refunded");
        } else if (user.getUserType().equals("Shop") && order.getOrderStatus().equals("Refunding") && accept.equals("no")) {
            order.setOrderStatus("Refund Rejected");
        } else {
            return Response.error("You don't have permission to change the status.");
        }

        boolean success = orderService.updateById(order);

        JSONObject responseJson = new JSONObject();

        if (success) {
            return Response.success("Order Status updated successfully", responseJson);
        } else {
            return Response.error("Failed to update order status");
        }

    }

    @GetMapping("/getOrders")
    public Response<List<OrderRepo>> getOrdersByUserId( @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Long userId = Long.parseLong(user_id);

        return Response.success("Successfully get all the orders",orderService.getOrdersByUserId(userId));
    }

    @PostMapping("/addOrder")
    public Response<JSONObject> register(@RequestBody OrderRepo order, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        order.setUserId(parseInt(user_id));

        boolean success = orderService.save(order);

        JSONObject responseJson = new JSONObject();
        if (success) {
            return Response.success("Successfully add Order", responseJson);
        } else {
            return Response.error("Failed to add Order");
        }

    }

    @GetMapping("/get")
    public Response<OrderRepo> getOrderByGivenId(@RequestParam(value = "id") Long orderId, @RequestHeader("Authorization") String token) {
        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        OrderRepo order = orderService.getOrderById(orderId);
        if (order == null) {
            return Response.error("Failed to add Order");
        } else {
            return Response.success("Successfully add Order", order);
        }
    }
}
