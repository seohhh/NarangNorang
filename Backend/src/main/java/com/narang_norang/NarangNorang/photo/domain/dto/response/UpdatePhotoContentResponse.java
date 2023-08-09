package com.narang_norang.NarangNorang.photo.domain.dto.response;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.Getter;

import java.time.LocalDate;
import java.util.Date;

@Getter
public class UpdatePhotoContentResponse {
    private Long photoSeq;
    private String photoUrl;
    private String photoContent;
    private String photoDate;

    public UpdatePhotoContentResponse(Photo photo) {
        this.photoSeq = photo.getPhotoSeq();
        this.photoUrl = photo.getPhotoUrl();
        this.photoContent = photo.getPhotoContent();
        this.photoDate = photo.getPhotoDate();
    }
}
