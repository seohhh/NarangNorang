package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private Long roomSeq;
    private String roomCode;
    private String hostName;
    private Long hostSeq;

    public RoomResponse(Room room) {
        this.roomSeq = room.getRoomSeq();
        this.roomCode = room.getRoomCode();
        this.hostName = room.getHostName();
        this.hostSeq = room.getHostSeq();
    }

}
