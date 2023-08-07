package com.narang_norang.NarangNorang.redis.room.domain.entity;


import com.narang_norang.NarangNorang.member.domain.entity.Member;
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
    private String roomId;

    private String hostname;

}
