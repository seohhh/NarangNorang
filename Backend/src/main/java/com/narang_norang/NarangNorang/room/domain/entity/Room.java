package com.narang_norang.NarangNorang.room.domain.entity;


import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import org.springframework.data.annotation.Id;
import java.util.List;

@RedisHash(value = "room", timeToLive = 3600)
@Getter
@Builder
public class Room {

    @Id
    @Indexed
    private String roomId;

    private int roomMemberCount;
    private List<String> roomNicknames;
}
