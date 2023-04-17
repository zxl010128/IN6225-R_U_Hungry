package com.example.ruhungry;

import lombok.extern.slf4j.Slf4j;
import org.mybatis.spring.annotation.MapperScan;
import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;

@SpringBootApplication
@Slf4j
public class RuhungryApplication {

    public static void main(String[] args) {

        SpringApplication.run(RuhungryApplication.class, args);
        log.info("Successfully start...");
    }

}
