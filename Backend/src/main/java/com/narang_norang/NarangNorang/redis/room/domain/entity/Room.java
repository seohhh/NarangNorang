package com.narang_norang.NarangNorang.redis.room.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@RedisHash(value = "room", timeToLive = 3600000)
@Builder
@Getter
public class Room {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long roomSeq;
    @Indexed
    private String roomCode;
    private String hostName;
    private Long hostSeq;

}
