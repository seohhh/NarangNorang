package com.narang_norang.NarangNorang.redis.participant.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@RedisHash(value = "participant", timeToLive = 86400L)
@Builder
@Getter
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer participantSeq;

    @Indexed
    private String participantId;

    @Indexed
    private String roomCode;

    private Double score;

    public void updateScore(Double score) {
        this.score = score;
    }


}
