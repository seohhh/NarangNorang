package com.narang_norang.NarangNorang.redis.participant.domain.dto;

import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantResponse {

    private String participantId;
    private String roomCode;
    private Double score;


    public ParticipantResponse(Participant participant) {
        this.participantId = participant.getParticipantId();
        this.roomCode = participant.getRoomCode();
        this.score = participant.getScore();
    }
}
