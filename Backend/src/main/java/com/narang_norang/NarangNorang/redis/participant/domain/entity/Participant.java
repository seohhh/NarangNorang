package com.narang_norang.NarangNorang.redis.participant.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;

@RedisHash(value = "participant", timeToLive = 3600)
@Builder
@Getter
public class Participant {

    @Id
    private String nickname;

    @Id
    private String roomId;

    private Long memberSeq;

    private Grade grade;


}
