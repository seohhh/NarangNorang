package com.narang_norang.NarangNorang.redis.test.controller;

import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantResponse;
import com.narang_norang.NarangNorang.redis.participant.service.ParticipantService;
import com.narang_norang.NarangNorang.redis.room.domain.dto.MakeRoomRequest;
import com.narang_norang.NarangNorang.redis.room.domain.dto.RoomResponse;
import com.narang_norang.NarangNorang.redis.room.service.RoomService;
import com.narang_norang.NarangNorang.redis.test.service.RedisService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping("/api/v1/redis")
public class RedisController {


    @Autowired
    private RedisService redisService;

    @Autowired
    private RoomService roomService;

    @Autowired
    private ParticipantService participantService;


    @Autowired
    private RedisTemplate<String, String> redisTemplate;

    @PostMapping("/redisTest")
    public ResponseEntity<?> addRedisKey() {
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        vop.set("yellow", "banana");
        vop.set("red", "apple");
        vop.set("green", "watermelon");
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/redisTest/{key}")
    public ResponseEntity<?> getRedisKey(@PathVariable String key) {
        ValueOperations<String, String> vop = redisTemplate.opsForValue();
        String value = vop.get(key);
        return new ResponseEntity<>(value, HttpStatus.OK);
    }

    @PostMapping("/redisTest/room")
    public ResponseEntity<RoomResponse> createRoom(@RequestBody MakeRoomRequest makeRoomRequest) {
        RoomResponse roomResponse = roomService.createRoom(makeRoomRequest);

        return ResponseEntity.ok(roomResponse);
    }

    @PostMapping("/redisTest/Participant")
    public ResponseEntity<ParticipantResponse> createParticipant(@RequestBody ParticipantRequest participantRequest) {

        ParticipantResponse participantResponse = participantService.createParticipant(participantRequest);

        return ResponseEntity.ok(participantResponse);
    }
}
