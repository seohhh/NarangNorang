package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class DeletePictureRequest {

    private String roomCode;
    private String subscriberId;
}
