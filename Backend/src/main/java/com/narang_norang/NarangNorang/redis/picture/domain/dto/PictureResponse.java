package com.narang_norang.NarangNorang.redis.picture.domain.dto;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.web.multipart.MultipartFile;

import java.time.LocalDateTime;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class PictureResponse {

    private Integer pictureSeq;

    private String roomCode;

    private String subscriberId;

    private String pictureName;

    private String pictureContentType;

    private byte[] pictureData;

    private Long pictureSize;

    private LocalDateTime pictureTime;

    public PictureResponse(Picture picture) {
        this.pictureSeq = picture.getPictureSeq();
        this.roomCode = picture.getRoomCode();
        this.subscriberId = picture.getSubscriberId();
        this.pictureName = picture.getPictureName();
        this.pictureContentType = picture.getPictureContentType();
        this.pictureData = picture.getPictureData();
        this.pictureSize = picture.getPictureSize();
        this.pictureTime = picture.getPictureTime();
    }
}
