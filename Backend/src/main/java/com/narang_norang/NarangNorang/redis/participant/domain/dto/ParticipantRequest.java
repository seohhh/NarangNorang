package com.narang_norang.NarangNorang.redis.participant.domain.dto;

import com.narang_norang.NarangNorang.redis.participant.domain.entity.Grade;
import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantRequest {

    private String participantNickname;

    private String roomCode;

    @Nullable
    private Long memberSeq;

    private Grade grade;

    public Participant toParticipant() {
        return Participant.builder()
                .participantNickname(participantNickname)
                .roomCode(roomCode)
                .memberSeq(memberSeq)
                .grade(grade)
                .build();
    }

}
