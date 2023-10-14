package com.narang_norang.NarangNorang.redis.room.service;

import com.narang_norang.NarangNorang.redis.room.domain.dto.MakeRoomRequest;
import com.narang_norang.NarangNorang.redis.room.domain.dto.RoomResponse;
import com.narang_norang.NarangNorang.redis.room.domain.entity.Room;
import com.narang_norang.NarangNorang.redis.room.repositoy.RoomRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.Optional;

@Service
@RequiredArgsConstructor
public class RoomService {

    private final RoomRepository roomRepository;


    public RoomResponse createRoom(MakeRoomRequest makeRoomRequest) {
        return new RoomResponse(roomRepository.save(makeRoomRequest.toRoom()));
    }


    public boolean deleteRoom(String roomCode) {
        Room room = findRoomByRoomCode(roomCode);
        roomRepository.delete(room);
        return true;
    }

    public void updateRoomStatus(String roomCode, String status) {
        Room room = findRoomByRoomCode(roomCode);
        room.updateStatus(status);
        roomRepository.save(room);
    }

    public void updateRoomParticipantCountPlus(String roomCode) {
        Room room = findRoomByRoomCode(roomCode);
        room.updateParticipantCountPlus();
        roomRepository.save(room);
    }

    public void updateRoomParticipantCountMinus(String roomCode) {
        Room room = findRoomByRoomCode(roomCode);
        room.updateParticipantCountMinus();
        if (room.getParticipantCount() < 1) {
            roomRepository.delete(room);
        }
        else  {
            roomRepository.save(room);
        }
    }

    public Room findRoomByHostSeq(Long hostSeq) {
        Optional<Room> room = roomRepository.findByHostSeq(hostSeq);

        if (room.isEmpty()) {
            throw new IllegalArgumentException("Hostname에 해당하는 방이 없습니다.");
        }

        return room.get();
    }

    public Room findRoomByRoomCode(String roomCode) {
        Optional<Room> room = roomRepository.findByRoomCode(roomCode);

        if (room.isEmpty()) {
            throw new IllegalArgumentException("Room-Code에 해당하는 방이 없습니다.");
        }

        return room.get();
    }

    public boolean isExistRoomByHostSeq(Long hostSeq) {
        Optional<Room> room = roomRepository.findByHostSeq(hostSeq);
        // 객체가 있다면 true, 없다면 false
        return room.isPresent();
    }

    public boolean isExistRoomByRoomCode(String roomCode) {
        Optional<Room> room = roomRepository.findByRoomCode(roomCode);
        // 객체가 있다면 true, 없다면 false
        return room.isPresent();
    }


}
