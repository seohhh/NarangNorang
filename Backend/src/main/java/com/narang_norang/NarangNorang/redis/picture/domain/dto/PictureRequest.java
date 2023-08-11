package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;
import java.time.ZoneId;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PictureRequest {

    private String roomCode;

    private String subscriberId;

    private String pictureName;

    private String pictureContentType;

    private byte[] pictureData;

    private Long pictureSize;

    private LocalDateTime pictureTime;


    public Picture toPicture() {
        return Picture.builder()
                .roomCode(roomCode)
                .subscriberId(subscriberId)
                .pictureName(pictureName)
                .pictureContentType(pictureContentType)
                .pictureData(pictureData)
                .pictureSize(pictureSize)
                .pictureTime(LocalDateTime.now(ZoneId.of("Asia/Korea")))
                .build();
    }
}
