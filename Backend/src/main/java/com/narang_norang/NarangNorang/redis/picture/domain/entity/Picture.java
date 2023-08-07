package com.narang_norang.NarangNorang.redis.picture.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

import java.time.LocalDateTime;

@RedisHash(value = "picture", timeToLive = 3600)
@Builder
@Getter
public class Picture {

    @Id
    private String roomId;

    @Id
    private String nickname;

    private String pictureUrl;

    private LocalDateTime time;
}
