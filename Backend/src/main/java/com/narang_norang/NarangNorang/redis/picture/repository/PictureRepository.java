package com.narang_norang.NarangNorang.redis.picture.repository;

import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@EnableRedisRepositories
public interface PictureRepository extends CrudRepository<Picture, Integer> {

    Optional<Picture> findByPictureUrl(String pictureUrl);

    List<Picture> findAllByRoomCodeAndSubscriberId(String roomCode, String subscriberId);

    Optional<Picture> findPictureByPictureSeq(Integer pictureSeq);

    Optional<Picture> findByRoomCode(String roomCode);
}
