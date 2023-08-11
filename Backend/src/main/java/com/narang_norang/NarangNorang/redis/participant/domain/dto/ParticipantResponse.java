package com.narang_norang.NarangNorang.redis.participant.domain.dto;

import com.narang_norang.NarangNorang.redis.participant.domain.entity.Grade;
import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class ParticipantResponse {

    private Long participantSeq;

    private String participantNickname;

    private String roomCode;

    private Long memberSeq;

    private Grade grade;

    public ParticipantResponse(Participant participant) {
        this.participantSeq = participant.getParticipantSeq();
        this.participantNickname = participant.getParticipantNickname();
        this.roomCode = participant.getRoomCode();
        this.memberSeq = participant.getMemberSeq();
        this.grade = participant.getGrade();
    }
}
