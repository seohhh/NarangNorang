package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import lombok.Getter;

@Getter
public class MakeRoomResponse {
    private String roomId;
    private String hostname;

    public MakeRoomResponse(Room room) {
        this.roomId = room.getRoomId();
        this.hostname = room.getHostname();
    }

}
