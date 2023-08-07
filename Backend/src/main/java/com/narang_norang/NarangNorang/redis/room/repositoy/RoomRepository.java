package com.narang_norang.NarangNorang.redis.room.repositoy;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends CrudRepository<Room, String> {

    Optional<Room> findByRoomId(String roomId);
}
