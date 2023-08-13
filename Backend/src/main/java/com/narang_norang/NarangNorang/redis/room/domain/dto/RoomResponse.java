package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import com.narang_norang.NarangNorang.redis.room.domain.entity.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class RoomResponse {
    private String roomCode;
    private String hostName;
    private Long hostSeq;
    private RoomStatus roomStatus;
    private Integer participantCount;

    public RoomResponse(Room room) {
        this.roomCode = room.getRoomCode();
        this.hostName = room.getHostName();
        this.hostSeq = room.getHostSeq();
        this.roomStatus = room.getRoomStatus();
        this.participantCount = room.getParticipantCount();
    }

}
