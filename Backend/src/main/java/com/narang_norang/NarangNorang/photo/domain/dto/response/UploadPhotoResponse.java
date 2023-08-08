package com.narang_norang.NarangNorang.photo.domain.dto.response;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.Getter;
import lombok.Setter;

import java.util.Date;

@Getter
@Setter
public class UploadPhotoResponse {
    private Long photoSeq;
    private String photoUrl;
    private String photoContent;
    private Date photoDate;

    public UploadPhotoResponse(Photo photo) {
        this.photoSeq = photo.getPhotoSeq();
        this.photoUrl = photo.getPhotoUrl();
        this.photoContent = photo.getPhotoContent();
        this.photoDate = photo.getPhotoDate();
    }
}
