package com.narang_norang.NarangNorang.redis.picture.service;


import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import com.narang_norang.NarangNorang.redis.picture.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@RequiredArgsConstructor
@Service("PictureService")
public class PictureServiceImpl implements PictureService {

    private final PictureRepository pictureRepository;


    public List<Picture> getPictureByRoomCodeAndSubscriberId(String roomCode, String subscriberId) {
        return pictureRepository.findAllByRoomCodeAndSubscriberId(roomCode, subscriberId);
    }

    public Picture getPictureByPictureSeq(Integer pictureSeq) {
        Optional<Picture> pictureOpt = pictureRepository.findPictureByPictureSeq(pictureSeq);
        if (pictureOpt.isEmpty()) {
            throw new IllegalArgumentException("해당하는 캡쳐사진이 존재하지 않습니다.");
        }

        return pictureOpt.get();
    }

    public boolean savePicture(Picture picture) {
        pictureRepository.save(picture);
        return true;
    }

    public void deletePicture(Picture picture) {
        pictureRepository.delete(picture);
    }

}
