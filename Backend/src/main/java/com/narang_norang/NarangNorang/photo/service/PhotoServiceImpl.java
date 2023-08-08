package com.narang_norang.NarangNorang.photo.service;

import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import com.narang_norang.NarangNorang.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service("PhotoService")
public class PhotoServiceImpl implements PhotoService {

    @Autowired
    PhotoRepository photoRepository;

    @Override
    public void uploadPhoto(Photo photo) {
        photoRepository.save(photo);
    }

    @Override
    public List<Photo> getPhotoByMemberId(Long memberSeq) {
        List<Photo> photoList = photoRepository.findByMemberSeq(memberSeq);
        return photoList;
    }

    @Override
    public UpdatePhotoContentResponse updatePhotoContent(Long photoSeq, UpdatePhotoContentRequest request) {
        Optional<Photo> photo = photoRepository.findByPhotoSeq(photoSeq);

        photo.get()
                .update(request.getPhotoContent());

        return new UpdatePhotoContentResponse(photo.get());
    }

    @Override
    public boolean deletePhoto(Long photoSeq) {
        Optional<Photo> photo = photoRepository.findByPhotoSeq(photoSeq);
        photoRepository.delete(photo.get());
        return true;
    }

}
