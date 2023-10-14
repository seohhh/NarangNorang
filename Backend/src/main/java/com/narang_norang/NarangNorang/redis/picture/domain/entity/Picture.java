package com.narang_norang.NarangNorang.redis.picture.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.redis.core.index.Indexed;
import org.springframework.web.multipart.MultipartFile;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;
import java.time.LocalDateTime;

@RedisHash(value = "picture", timeToLive = 86400L)
@Builder
@Getter
public class Picture {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    @Indexed
    private Integer pictureSeq;

    @Indexed
    private String roomCode;

    @Indexed
    private String subscriberId;

    private String pictureName;

    private String pictureContentType;

    private byte[] pictureData;

    private Long pictureSize;

    private LocalDateTime pictureTime;

}
