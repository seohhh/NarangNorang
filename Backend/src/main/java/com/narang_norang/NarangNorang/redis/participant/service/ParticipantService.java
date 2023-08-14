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

    public List<Participant> findAllByRoomCode(String roomCode) {

        return participantRepository.findAllByRoomCode(roomCode);
    }

    public Participant findByRoomCodeAndParticipantId(String participantId, String roomCode) {
        Optional<Participant> participant = participantRepository.findByRoomCodeAndParticipantId(
                roomCode, participantId);

        if (participant.isEmpty()) {
            throw new IllegalArgumentException("해당하는 참가자가 존재하지 않습니다");
        }

        return participant.get();
    }

    public boolean delete(FindParticipantRequest findParticipantRequest) {
        Optional<Participant> participant = participantRepository.findByRoomCodeAndParticipantId(
                findParticipantRequest.getRoomCode(),
                findParticipantRequest.getParticipantId());

        if (participant.isEmpty()) {
            return false;
        }

        participantRepository.delete(participant.get());
        return true;
    }

    public boolean deleteAllByRoomCode(String roomCode) {
        List<Participant> participants = participantRepository.findAllByRoomCode(roomCode);

        participantRepository.deleteAll(participants);

        return true;
    }

    public void updateScore(ParticipantRequest participantRequest) {
        Optional<Participant> participant = participantRepository.findByRoomCodeAndParticipantId(
                participantRequest.getRoomCode(),
                participantRequest.getParticipantId());

        if (participant.isEmpty()) {
            throw new IllegalArgumentException("해당하는 참가자가 없습니다.");
        }

        participant.get().updateScore(participantRequest.getScore());
        participantRepository.save(participant.get());
    }

    public void isParticipant(Optional<Participant> participantOpt) {
        if (participantOpt.isEmpty()) {
            throw new IllegalArgumentException("해당하는 참가자가 없습니다.");
        }
    }
}
