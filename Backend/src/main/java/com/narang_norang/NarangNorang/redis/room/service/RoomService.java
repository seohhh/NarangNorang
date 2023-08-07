package com.narang_norang.NarangNorang.redis.room.service;

import com.narang_norang.NarangNorang.redis.room.domain.dto.MakeRoomRequest;
import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import com.narang_norang.NarangNorang.redis.room.repositoy.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;


    public Room createRoom(MakeRoomRequest makeRoomRequest) {
        return roomRepository.save(makeRoomRequest.toRoom());
    }
}
