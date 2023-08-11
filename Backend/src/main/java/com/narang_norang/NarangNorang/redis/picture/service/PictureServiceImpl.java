package com.narang_norang.NarangNorang.redis.picture.service;


import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import com.narang_norang.NarangNorang.redis.picture.repository.PictureRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@RequiredArgsConstructor
@Service("PictureService")
public class PictureServiceImpl implements PictureService {

    private final PictureRepository pictureRepository;


    public List<Picture> getPictureByRoomCodeAndSubscriberId(String roomCode, String subscriberId) {
        return pictureRepository.findAllByRoomCodeAndSubscriberId(roomCode, subscriberId);
    }

    public boolean savePicture(Picture picture) {
        pictureRepository.save(picture);
        return true;
    }

    public void deletePicture(Picture picture) {
        pictureRepository.delete(picture);
    }

}
