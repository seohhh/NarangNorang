package com.narang_norang.NarangNorang.photo.service;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import com.narang_norang.NarangNorang.photo.repository.PhotoRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Slf4j
@RequiredArgsConstructor
@Service("PhotoService")
@Transactional(readOnly = true)
public class PhotoServiceImpl implements PhotoService {

    private final PhotoRepository photoRepository;

    @Override
    @Transactional
    public void uploadPhoto(Photo photo) {
        photoRepository.save(photo);
    }

    @Override
    public List<Photo> getPhotoByMember(Member member) {
        List<Photo> photoList = photoRepository.findByMemberOrderByPhotoDateDesc(member);
        return photoList;
    }

    @Transactional
    @Override
    public UpdatePhotoContentResponse updatePhotoContent(UpdatePhotoContentRequest updatePhotoContentRequest) {
        Optional<Photo> photo = photoRepository.findById(updatePhotoContentRequest.getPhotoSeq());

        isPhoto(photo);
        photo.get()
                .updateContent(updatePhotoContentRequest.getPhotoContent());
        return new UpdatePhotoContentResponse(photo.get());
    }

    @Override
    @Transactional
    public boolean deletePhoto(Long photoSeq) {
        Optional<Photo> photo = photoRepository.findByPhotoSeq(photoSeq);
        isPhoto(photo);
        photoRepository.delete(photo.get());
        return true;
    }

    public String getFilenameByPhotoSeq(Long photoSeq) {
        Optional<Photo> photo = photoRepository.findByPhotoSeq(photoSeq);
        isPhoto(photo);
        return photo.get().getPhotoFilename();
    }

    public void isPhoto(Optional<Photo> photoOptional) {
        if (photoOptional.isEmpty()) {
            throw new IllegalArgumentException("해당 사진이 없습니다.");
        }
    }

}
