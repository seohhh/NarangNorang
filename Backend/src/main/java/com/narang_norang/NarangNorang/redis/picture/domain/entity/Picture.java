package com.narang_norang.NarangNorang.redis.picture.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

@RedisHash(value = "picture", timeToLive = 3600)
@Builder
@Getter
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long pictureSeq;

    @Indexed
    private String roomCode;

    @Indexed
    private String nickname;

    private String pictureUrl;

    private LocalDateTime time;

}
