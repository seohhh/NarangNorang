package com.narang_norang.NarangNorang.room.repositoy;

import com.narang_norang.NarangNorang.room.domain.entity.Room;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.repository.CrudRepository;
import org.springframework.stereotype.Repository;

import java.util.Optional;

@Repository
public interface RoomRepository extends CrudRepository<Room, String> {

    Optional<Room> findByRoomId(String roomId);
}
