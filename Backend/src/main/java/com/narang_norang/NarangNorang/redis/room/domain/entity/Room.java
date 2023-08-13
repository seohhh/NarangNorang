package com.narang_norang.NarangNorang.redis.room.domain.entity;

import lombok.Builder;
import lombok.Getter;
import org.springframework.data.redis.core.RedisHash;
import org.springframework.data.annotation.Id;
import org.springframework.data.redis.core.index.Indexed;

import javax.persistence.GeneratedValue;
import javax.persistence.GenerationType;

@RedisHash(value = "room")
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

    public Boolean updateStatus() {
        if (this.roomStatus == RoomStatus.WAIT) {
            this.roomStatus = RoomStatus.START;
        } else {
            this.roomStatus = RoomStatus.WAIT;
        }
        return true;
    }

    public void updateParticipantCountPlus() {
         this.participantCount += 1;
    }

    public void updateParticipantCountMinus() {
        this.participantCount -= 1;
    }
}
