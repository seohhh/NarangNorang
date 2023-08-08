package com.narang_norang.NarangNorang.photo.service;

import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;

import java.util.List;

public interface PhotoService {

    void uploadPhoto(Photo photo);
    List<Photo> getPhotoByMemberId(Long memberSeq);

    UpdatePhotoContentResponse updatePhotoContent(Long photoSeq, UpdatePhotoContentRequest request);

    boolean deletePhoto(Long photoSeq);

}
