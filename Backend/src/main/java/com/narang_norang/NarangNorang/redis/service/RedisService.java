package com.narang_norang.NarangNorang.redis.service;

import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.stereotype.Service;

import java.util.Set;

@Service
@RequiredArgsConstructor
public class RedisService {

    private final RedisTemplate<String, String> redisTemplate;


    public void setValues(String key, String value) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        values.set(key, value);
    }

    public String getValues(String key) {
        ValueOperations<String, String> values = redisTemplate.opsForValue();
        return values.get(key);
    }



    public void setSets(String key, String... values) {
        redisTemplate.opsForSet().add(key, values);
    }

    public Set<String> getSets(String key) {
        return redisTemplate.opsForSet().members(key);
    }
}
