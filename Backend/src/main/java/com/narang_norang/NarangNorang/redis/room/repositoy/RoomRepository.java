package com.narang_norang.NarangNorang.redis.room.repositoy;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.Optional;

@EnableRedisRepositories
public interface RoomRepository extends CrudRepository<Room, Long> {

    Optional<Room> findByRoomCode(String roomId);

    Optional<Room> findByHostSeq(Long hostSeq);

    Optional<Room> findByRoomSeq(Long roomSeq);
}
