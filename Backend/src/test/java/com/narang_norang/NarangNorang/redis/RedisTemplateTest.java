package com.narang_norang.NarangNorang.redis;

import org.junit.jupiter.api.Test;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.test.context.SpringBootTest;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;

import static org.assertj.core.api.AssertionsForClassTypes.assertThat;

@SpringBootTest
public class RedisTemplateTest {

    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @Test
    void testStrings() {
        // given
//        ValueOperations<String, String> valueOperations = redisTemplate.opsForValue();
//        String key = "stringKey";
//
//        // when
//        valueOperations.set(key, "hello");
//
//        // then
//        String value = valueOperations.get(key);
//        assertThat(value).isEqualTo("hello");
    }
}
