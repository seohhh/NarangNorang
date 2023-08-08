package com.narang_norang.NarangNorang.redis.participant.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@RedisHash(value = "participant")
@Builder
@Getter
public class Participant {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long participantSeq;

    @Indexed
    private String nickname;

    @Indexed
    private String roomCode;

    private Long memberSeq;

    private Grade grade;


}
