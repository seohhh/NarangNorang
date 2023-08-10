package com.narang_norang.NarangNorang.redis.picture.service;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;

import java.util.List;

public interface PictureService {
    List<Picture> getPictureByRoomCodeAndSubscriberId(String roomCode, Long subscriberId);

    boolean savePicture(Picture picture);

}
