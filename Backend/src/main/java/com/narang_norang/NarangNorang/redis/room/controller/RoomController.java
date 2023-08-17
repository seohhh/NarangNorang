package com.narang_norang.NarangNorang.redis.room.controller;

import com.narang_norang.NarangNorang.redis.room.domain.dto.MakeRoomRequest;
import com.narang_norang.NarangNorang.redis.room.domain.dto.RoomResponse;
import com.narang_norang.NarangNorang.redis.room.service.RoomService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/v1/room")
@RequiredArgsConstructor
@Api(value = "방 API", tags = {"Room-Redis"})
public class RoomController {

    private final RoomService roomService;

    @PostMapping ("/save")
    @ApiOperation(value = "방 정보 저장", notes = "방 정보 레디스에 저장.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<RoomResponse> saveRoomInfo(
            @RequestBody MakeRoomRequest makeRoomRequest) {
        RoomResponse roomResponse = roomService.createRoom(makeRoomRequest);
        return ResponseEntity.ok(roomResponse);
    }

    @DeleteMapping("/delete/{roomCode}")
    @ApiOperation(value = "방 정보 삭제", notes = "방 정보 레디스에서 삭제.")
    @ApiResponses({
            @ApiResponse(code = 204, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> deleteRoomInfo(@PathVariable("roomCode") String roomCode) {
        return ResponseEntity.ok(roomService.deleteRoom(roomCode));
    }

    @PutMapping("/update/status/{roomCode}")
    @ApiOperation(value = "방 상태 변경", notes = "방 게임 상태.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> updateRoomStatus(@PathVariable("roomCode") String roomCode,
                                                    @RequestBody String status) {
        roomService.updateRoomStatus(roomCode, status);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update/plus/{roomCode}")
    @ApiOperation(value = "방 인원 더하기", notes = "방 게임 상태.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> updateRoomParticipantCountPlus(@PathVariable("roomCode") String roomCode) {
        roomService.updateRoomParticipantCountPlus(roomCode);
        return ResponseEntity.ok(true);
    }

    @PutMapping("/update/minus/{roomCode}")
    @ApiOperation(value = "방 인원 빼기", notes = "방 게임 상태.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> updateRoomParticipantCountMinus(@PathVariable("roomCode") String roomCode) {
        roomService.updateRoomParticipantCountMinus(roomCode);
        return ResponseEntity.ok(true);
    }

    @GetMapping("/read/{roomCode}")
    @ApiOperation(value = "방 정보 조희", notes = "방 정보.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "방 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<RoomResponse> getRoomByRoomCode(@PathVariable("roomCode") String roomCode) {
        RoomResponse roomResponse = new RoomResponse(roomService.findRoomByRoomCode(roomCode));
        return ResponseEntity.ok(roomResponse);
    }
}

