package com.narang_norang.NarangNorang.redis.room.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;

@RedisHash(value = "room", timeToLive = 3600000)
@Builder
@Getter
public class Room {

    @Id
    private String roomId;

    private String hostname;

}
