package com.narang_norang.NarangNorang.redis.participant.controller;

import com.narang_norang.NarangNorang.redis.participant.domain.dto.FindParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantResponse;
import com.narang_norang.NarangNorang.redis.participant.domain.entity.Participant;
import com.narang_norang.NarangNorang.redis.participant.service.ParticipantService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;

@RestController
@RequestMapping("/api/v1/participant")
@RequiredArgsConstructor
@Api(value = "사진 API", tags = {"Participant-Redis"})
public class ParticipantController {

    private final ParticipantService participantService;

    @PostMapping("/save")
    @ApiOperation(value = "참여자 정보 저장", notes = "참여자 정보 레디스에 저장.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ParticipantResponse> saveParticipantInfo(
            @RequestBody @ApiParam(value = "참여자 정보", required = true) ParticipantRequest participantRequest) {
        ParticipantResponse participantResponse = participantService.createParticipant(participantRequest);
        return ResponseEntity.ok(participantResponse);
    }

    @PostMapping("/delete")
    @ApiOperation(value = "참여자 정보 삭제", notes = "참여자 정보 레디스에서 삭제.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> deleteParticipant(
            @RequestBody @ApiParam(value = "참여자 정보", required = true) FindParticipantRequest findParticipantRequest) {
        return ResponseEntity.ok(participantService.delete(findParticipantRequest));
    }

    @PostMapping("/deleteAll")
    @ApiOperation(value = "참여자 정보 삭제", notes = "참여자 정보 레디스에서 삭제.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> deleteParticipants(
            @RequestBody String roomCode) {
        return ResponseEntity.ok(participantService.deleteAllByRoomCode(roomCode));
    }

    @PutMapping("/update")
    @ApiOperation(value = "참여자 점수 변경", notes = "참여자 점수 수정.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> updateScore(@RequestBody ParticipantRequest participantRequest) {
        participantService.updateScore(participantRequest);

        return ResponseEntity.ok(true);
    }

    @GetMapping("/room/{roomCode}")
    @ApiOperation(value = "방 참여자 정보 조회", notes = "방에 속한 참가자 등수 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<String>> getParticipants(@PathVariable("roomCode") String roomCode) {

        List<Participant> participants = participantService.findAllByRoomCode(roomCode);

        participants.sort((p1, p2) -> {
            return Double.compare(p2.getScore(), p1.getScore());
        });

        List<String> participantIds = new ArrayList<>();

        for (Participant participant : participants) {
            participantIds.add(participant.getParticipantId());
        }

        return ResponseEntity.ok(participantIds);
    }

    @GetMapping("/detail")
    @ApiOperation(value = "방 참여자 세부 정보 조회", notes = "방에 속한 참가자 정보 조회")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ParticipantResponse> getParticipant(@RequestParam String participantId, String roomCode) {
        Participant participant = participantService.findByRoomCodeAndParticipantId(participantId, roomCode);

        return ResponseEntity.ok(new ParticipantResponse(participant));
    }
}
