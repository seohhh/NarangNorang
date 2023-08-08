package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PictureResponse {

    private Long pictureSeq;

    private String roomCode;

    private String nickname;

    private String pictureUrl;

    private LocalDateTime time;

    public PictureResponse(Picture picture) {
        this.pictureSeq = picture.getPictureSeq();
        this.roomCode = picture.getRoomCode();
        this.nickname = picture.getNickname();
        this.pictureUrl = picture.getPictureUrl();
        this.time = picture.getTime();
    }
}
