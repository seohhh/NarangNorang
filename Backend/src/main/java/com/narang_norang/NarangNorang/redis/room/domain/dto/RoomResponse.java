package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String roomCode;
    private String hostname;

    public RoomResponse(Room room) {
        this.roomCode = room.getRoomCode();
        this.hostname = room.getHostname();
    }

}
