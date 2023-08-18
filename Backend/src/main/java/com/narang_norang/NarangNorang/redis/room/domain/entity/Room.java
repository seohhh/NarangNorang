package com.narang_norang.NarangNorang.redis.room.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import java.util.Objects;

@RedisHash(value = "room", timeToLive = 86400L)
@Builder
@Getter
public class Room {

    @Id
    @Indexed
    private String roomCode;
    private RoomStatus roomStatus;
    private String hostName;
    private Long hostSeq;
    private Integer participantCount;

    public void updateStatus(String status) {
        if (Objects.equals(status, "start")) {
            this.roomStatus = RoomStatus.START;
        } else {
            this.roomStatus = RoomStatus.WAIT;
        }
    }

    public void updateParticipantCountPlus() {
         this.participantCount += 1;
    }

    public void updateParticipantCountMinus() {
        this.participantCount -= 1;
    }
}
