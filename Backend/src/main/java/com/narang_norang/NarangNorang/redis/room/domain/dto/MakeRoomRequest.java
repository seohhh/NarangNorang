package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MakeRoomRequest {

    private String roomCode;
    private String hostname;

    public Room toRoom() {
        return Room.builder()
                .roomCode(roomCode)
                .hostname(hostname)
                .build();
    }
}
