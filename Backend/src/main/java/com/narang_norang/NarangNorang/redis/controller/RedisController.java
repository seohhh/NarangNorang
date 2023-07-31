package com.narang_norang.NarangNorang.redis.controller;

import com.narang_norang.NarangNorang.redis.service.RedisService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.sql.Timestamp;


@RequiredArgsConstructor
@RestController
@RequestMapping("/redis")
public class RedisController {

    private final RedisService redisService;

    @PostMapping (value = "/setString")
    @ResponseBody
    public ResponseEntity<String> setValue(String key, String value) {
        Timestamp currentTimestamp = new Timestamp(System.currentTimeMillis());
        redisService.setValues(key, value);

        return ResponseEntity.status(201).body(key + ": " + value);
    }

    @GetMapping(value = "/getString")
    @ResponseBody
    public ResponseEntity<String> getValue(String key) {
        Timestamp currentTimeStamp = new Timestamp(System.currentTimeMillis());
        String value = redisService.getValues(key);

        return ResponseEntity.status(200).body(key + ": " + value);
    }
}
