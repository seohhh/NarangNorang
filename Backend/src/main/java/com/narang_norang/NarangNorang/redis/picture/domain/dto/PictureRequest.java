package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PictureRequest {

    private String roomCode;

    private String nickname;

    private String pictureUrl;


    public Picture toPicture() {
        return Picture.builder()
                .roomCode(roomCode)
                .nickname(nickname)
                .pictureUrl(pictureUrl)
                .time(LocalDateTime.now(ZoneId.of("Asia/Korea")))
                .build();
    }
}
