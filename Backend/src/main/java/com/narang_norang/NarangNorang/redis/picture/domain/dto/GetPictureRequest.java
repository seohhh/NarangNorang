package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class GetPictureRequest {

    private Long memberSeq;
    private String roomCode;
    private String subscriberId;
    private List<Integer> redisImageSeqs;
}
