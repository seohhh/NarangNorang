package com.narang_norang.NarangNorang.photo.service;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;

import java.util.List;

public interface PhotoService {

    void uploadPhoto(Photo photo);
    List<Photo> getPhotoByMember(Member member);
    UpdatePhotoContentResponse updatePhotoContent(UpdatePhotoContentRequest updatePhotoContentRequest);
    boolean deletePhoto(Long photoSeq);
    String getFilenameByPhotoSeq(Long photoSeq);

}
