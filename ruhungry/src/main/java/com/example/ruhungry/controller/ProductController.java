package com.example.ruhungry.controller;

import com.alibaba.fastjson.JSON;
import com.alibaba.fastjson.JSONObject;
import com.aliyun.oss.OSS;
import com.aliyun.oss.OSSClientBuilder;
import com.aliyun.oss.model.ObjectMetadata;
import com.baomidou.mybatisplus.core.conditions.query.LambdaQueryWrapper;
import com.baomidou.mybatisplus.core.conditions.query.QueryWrapper;
import com.example.ruhungry.common.RedisUtils;
import com.example.ruhungry.common.Response;
import com.example.ruhungry.entity.Product;
import com.example.ruhungry.entity.User;
import com.example.ruhungry.service.ProductService;
import com.example.ruhungry.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.apache.commons.codec.binary.Base64;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.*;

import java.io.ByteArrayInputStream;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

@RestController
@Slf4j
@RequestMapping("/product")
public class ProductController {

    @Autowired
    private ProductService productService;

    @Autowired
    private UserService userService;

    @PutMapping("/{id}")
    public Response<JSONObject> editProduct(@PathVariable("id") Long id, @RequestBody Product product, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Boolean isShop = userService.isShop(user_id);

        // log.info(isShop.toString());

        if (!isShop) {
            return Response.error("You don't have permission to use this api.");
        }

        Product existingProduct = productService.getById(id);

        if (existingProduct == null) {
            return Response.error("Product does not exist.");
        }

        // update the fields of the existing product;
        existingProduct.setProductPrice(product.getProductPrice());
        existingProduct.setProductDescription(product.getProductDescription());
        existingProduct.setProductType(product.getProductType());
        existingProduct.setProductReminder(product.getProductReminder());

        // save the updated product to the database
        productService.updateById(existingProduct);

        JSONObject responseJson = new JSONObject();

        return Response.success("Successfully update", responseJson);
    }

    @DeleteMapping("/{id}")
    public Response<JSONObject> deleteProduct(@PathVariable("id") Long id, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Boolean isShop = userService.isShop(user_id);

        // log.info(isShop.toString());

        if (!isShop) {
            return Response.error("You don't have permission to use this api.");
        }

        boolean success = productService.removeById(id);

        JSONObject responseJson = new JSONObject();

        if (success) {
            return Response.success("Product deleted successfully", responseJson);
        } else {
            return Response.error("Failed to delete product");
        }
    }

    @PutMapping("/stockChange/{productId}")
    public Response updateProductIsStock(@PathVariable("productId") Long productId, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Boolean isShop = userService.isShop(user_id);

        // log.info(isShop.toString());

        if (!isShop) {
            return Response.error("You don't have permission to use this api.");
        }

        Product product = productService.getById(productId);

        if (product == null) {
            return Response.error("Product not found");
        }

        boolean isStock = product.getProductIsStock();
        product.setProductIsStock(!isStock);

        boolean success = productService.updateById(product);

        JSONObject responseJson = new JSONObject();

        if (success) {
            return Response.success("Product isStock updated successfully", responseJson);
        } else {
            return Response.error("Failed to update product isStock");
        }
    }

    @GetMapping("/list")
    public Response<List<Product>> getAllProducts(@RequestHeader("Authorization") String token) {
        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        return Response.success("Successfully fetch all products", productService.getAllProducts());
    }

    @GetMapping("/page")
    public Response<List<Product>> getAllProductsByPage(@RequestParam(value = "page", defaultValue = "1") int page,
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

        return Response.success("Successfully fetch all products", productService.listProductsByPage(page, size));
    }

    @GetMapping("/countAll")
    public Response<JSONObject> countAll(@RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        JSONObject responseJson = new JSONObject();
        responseJson.put("number", productService.countAll());

        return Response.success("Successfully Count all", responseJson);
    }

    @PostMapping("/add")
    public Response<JSONObject> addProduct(@RequestBody Product product, @RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Boolean isShop = userService.isShop(user_id);

        // log.info(isShop.toString());

        if (!isShop) {
            return Response.error("You don't have permission to use this api.");
        }

        String http = "https://";
        String endpoint = "oss-ap-southeast-1.aliyuncs.com";
        String accessKeyId = "LTAI5t5nwpTLqE9Q7YCsCnhK";
        String accessKeySecret = "YmTMbWgQEvywYNwYYRknXknrW4NAPQ";
        String bucketName = "ruhungry6225";
        String bucketFolderName = "dish/";

        // log.info(product.getProductPic());
        byte[] bytes = Base64.decodeBase64(product.getProductPic().substring(product.getProductPic().indexOf(",") + 1));

        OSS ossClient = new OSSClientBuilder().build(http+endpoint, accessKeyId, accessKeySecret);

        String filename = UUID.randomUUID().toString() + ".jpeg";

        ObjectMetadata metadata = new ObjectMetadata();

        metadata.setContentLength(bytes.length);
        metadata.setContentType("image/jpeg");

        ossClient.putObject(bucketName, bucketFolderName+ filename, new ByteArrayInputStream(bytes), metadata);

        String url = "https://" + bucketName + "." +endpoint+"/"+bucketFolderName + filename;

        product.setProductPic(url);
        product.setUserId(1);
        boolean success = productService.save(product);

        JSONObject responseJson = new JSONObject();

        if (success) {
            return Response.success("Successfully add a product.", responseJson);
        } else {
            return Response.error("Failed to add.");
        }

    }

    @GetMapping("/byType")
    public Response<JSONObject> getProductsByType(@RequestHeader("Authorization") String token) {

        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        Map<String, List<Product>> products = productService.getAllProductsGroupedByType();
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", products);
        return Response.success("Successfully add a product.", responseJson);
    }

    @PostMapping("/calculatePrice")
    public Response<JSONObject> calculatePrice(@RequestBody Map<String, Integer> products, @RequestHeader("Authorization") String token) {
        String user_id = RedisUtils.getValue(token);

        if (user_id == null) {
            return Response.error("Authorization failed");
        }

        double totalPrice = 0;
        for (String description : products.keySet()) {
            Integer quantity = products.get(description);
            LambdaQueryWrapper<Product> queryWrapper = new LambdaQueryWrapper<>();
            queryWrapper.eq(Product::getProductDescription, description);
            Product product = productService.getOne(queryWrapper);
            if (product != null) {
                totalPrice += product.getProductPrice() * quantity;
            }
        }
        JSONObject responseJson = new JSONObject();
        responseJson.put("data", totalPrice);
        return Response.success("Successfully add a product.", responseJson);
    }
}
