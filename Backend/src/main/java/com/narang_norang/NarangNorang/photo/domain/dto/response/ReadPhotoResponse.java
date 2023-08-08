package com.narang_norang.NarangNorang.photo.domain.dto.response;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
public class ReadPhotoResponse {
    private List<Photo> photoList;

    public ReadPhotoResponse(List<Photo> photoList) {
        this.photoList = photoList;
    }
}
