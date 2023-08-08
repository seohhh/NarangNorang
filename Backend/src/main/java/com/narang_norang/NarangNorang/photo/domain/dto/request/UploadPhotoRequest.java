package com.narang_norang.NarangNorang.photo.domain.dto.request;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UploadPhotoRequest {
    private Long memberSeq;
    private String photoUrl;

    public Photo toPhoto(String photoUrl) {
        return Photo.builder()
                .memberSeq(memberSeq)
                .photoUrl(photoUrl)
                .build();
    }
}
