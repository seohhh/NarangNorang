package com.narang_norang.NarangNorang.redis.participant.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class FindParticipantRequest {
    private String roomCode;
    private String participantId;
}
