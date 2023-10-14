package com.narang_norang.NarangNorang.redis.picture.service;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;

import java.util.List;

public interface PictureService {
    List<Picture> getPictureByRoomCodeAndSubscriberId(String roomCode, String subscriberId);

    Picture getPictureByPictureSeq(Integer pictureSeq);

    boolean savePicture(Picture picture);

    void deletePicture(Picture picture);

}
