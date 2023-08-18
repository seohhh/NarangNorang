package com.narang_norang.NarangNorang.redis.room.domain.dto;

import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import com.narang_norang.NarangNorang.redis.room.domain.entity.RoomStatus;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class MakeRoomRequest {

    private String roomCode;
    private String hostName;
    private Long hostSeq;

    public Room toRoom() {
        return Room.builder()
                .roomCode(roomCode)
                .hostName(hostName)
                .hostSeq(hostSeq)
                .roomStatus(RoomStatus.WAIT)
                .participantCount(0)
                .build();
    }
}
