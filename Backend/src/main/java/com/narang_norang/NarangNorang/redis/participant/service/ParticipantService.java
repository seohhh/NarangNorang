package com.narang_norang.NarangNorang.redis.participant.service;


import com.narang_norang.NarangNorang.redis.participant.domain.dto.FindParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantResponse;
import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import com.narang_norang.NarangNorang.redis.participant.repository.ParticipantRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@RequiredArgsConstructor
public class ParticipantService {

    private final ParticipantRepository participantRepository;

    public ParticipantResponse createParticipant(ParticipantRequest participantRequest) {
        Participant participant = participantRepository.save(participantRequest.toParticipant());

        return new ParticipantResponse(participant);
    }

    public List<ParticipantResponse> findAllByRoomCode(String roomCode) {
        List<ParticipantResponse> participantResponses = new ArrayList<>();

        for (Participant participant :
                participantRepository.findAllByRoomCode(roomCode)) {
            participantResponses.add(new ParticipantResponse(participant));
        }
        return participantResponses;
    }

    public ParticipantResponse findByRoomCodeAndNickname(FindParticipantRequest findParticipantRequest) {
        Optional<Participant> participant = participantRepository.findByRoomCodeAndNickname(
                findParticipantRequest.getRoomCode(),
                findParticipantRequest.getParticipantNickname());

        isParticipant(participant);

        return new ParticipantResponse(participant.get());
    }

    public boolean delete(FindParticipantRequest findParticipantRequest) {
        Optional<Participant> participant = participantRepository.findByRoomCodeAndNickname(
                findParticipantRequest.getRoomCode(),
                findParticipantRequest.getParticipantNickname());

        participant.ifPresent(participantRepository::delete);
        return true;
    }


    public void isParticipant(Optional<Participant> participantOpt) {
        if (participantOpt.isEmpty()) {
            throw new IllegalArgumentException("해당하는 참가자가 없습니다.");
        }
    }
}
