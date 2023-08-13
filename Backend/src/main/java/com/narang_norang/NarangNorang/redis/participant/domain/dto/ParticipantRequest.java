package com.narang_norang.NarangNorang.redis.participant.domain.dto;

import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import io.swagger.models.auth.In;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantRequest {

    private String participantId;

    private String roomCode;

    private Double score;


    public Participant toParticipant() {
        return Participant.builder()
                .participantId(participantId)
                .roomCode(roomCode)
                .score(score)
                .build();
    }

}
