package com.narang_norang.NarangNorang.redis.participant.repository;

import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import org.springframework.data.redis.repository.configuration.EnableRedisRepositories;
import org.springframework.data.repository.CrudRepository;

import java.util.List;
import java.util.Optional;

@EnableRedisRepositories
public interface ParticipantRepository extends CrudRepository<Participant, Integer> {

    Optional<Participant> findByRoomCodeAndParticipantId(String roomCode, String participantId);

    List<Participant> findAllByRoomCode(String roomCode);
}
