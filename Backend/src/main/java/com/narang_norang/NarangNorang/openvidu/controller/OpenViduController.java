package com.narang_norang.NarangNorang.openvidu.controller;

import java.util.Map;

import javax.annotation.PostConstruct;

import com.narang_norang.NarangNorang.redis.participant.domain.dto.FindParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantRequest;
import com.narang_norang.NarangNorang.redis.participant.domain.dto.ParticipantResponse;
import com.narang_norang.NarangNorang.redis.participant.service.ParticipantService;
import com.narang_norang.NarangNorang.redis.room.domain.dto.MakeRoomRequest;
import com.narang_norang.NarangNorang.redis.room.domain.dto.RoomResponse;
import com.narang_norang.NarangNorang.redis.room.service.RoomService;
import com.narang_norang.NarangNorang.util.RandomNumberUtil;
import io.swagger.annotations.ApiOperation;
import io.swagger.annotations.ApiParam;
import io.swagger.annotations.ApiResponse;
import io.swagger.annotations.ApiResponses;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import io.openvidu.java.client.Connection;
import io.openvidu.java.client.ConnectionProperties;
import io.openvidu.java.client.OpenVidu;
import io.openvidu.java.client.OpenViduHttpException;
import io.openvidu.java.client.OpenViduJavaClientException;
import io.openvidu.java.client.Session;
import io.openvidu.java.client.SessionProperties;

@CrossOrigin(origins = "*")
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/sessions")
public class OpenViduController {

	@Value("${OPENVIDU_URL}")
	private String OPENVIDU_URL;

	@Value("${OPENVIDU_SECRET}")
	private String OPENVIDU_SECRET;

	private OpenVidu openvidu;

	private final RoomService roomService;

	private final ParticipantService participantService;

	@PostConstruct
	public void init() {
		this.openvidu = new OpenVidu(OPENVIDU_URL, OPENVIDU_SECRET);
	}

	@PostMapping()
	public ResponseEntity<String> initializeSession(@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		SessionProperties properties;
		String customSessionId = RandomNumberUtil.getRandomNumber();
		properties = new SessionProperties.Builder()
				.customSessionId(customSessionId)
				.build();
		Session session = openvidu.createSession(properties);

		return new ResponseEntity<>(session.getSessionId(), HttpStatus.OK);
	}

	@PostMapping("/{sessionId}/connections")
	public ResponseEntity<String> createConnection(@PathVariable("sessionId") String sessionId,
			@RequestBody(required = false) Map<String, Object> params)
			throws OpenViduJavaClientException, OpenViduHttpException {
		Session session = openvidu.getActiveSession(sessionId);
		if (session == null) {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
		ConnectionProperties properties = ConnectionProperties.fromJson(params).build();
		Connection connection = session.createConnection(properties);
		return new ResponseEntity<>(connection.getToken(), HttpStatus.OK);
	}

	@PostMapping("/room/save")
	@ApiOperation(value = "방 정보 저장", notes = "방 정보 레디스에 저장.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<RoomResponse> saveRoomInfo(
			@RequestBody @ApiParam(value = "방 정보", required = true) MakeRoomRequest makeRoomRequest) {
		RoomResponse roomResponse = roomService.createRoom(makeRoomRequest);
		return ResponseEntity.ok(roomResponse);
	}

	@PostMapping("/room/delete")
	@ApiOperation(value = "방 정보 삭제", notes = "방 정보 레디스에서 삭제.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> deleteRoomInfo(@PathVariable("roomSeq") Long roomSeq) {
		return ResponseEntity.ok(roomService.deleteRoom(roomSeq));
	}

	@PostMapping("/participant/save")
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

	@PostMapping("/participant/delete")
	@ApiOperation(value = "참여자 정보 삭제", notes = "참여자 정보 레디스에서 삭제.")
	@ApiResponses({
			@ApiResponse(code = 200, message = "성공"),
			@ApiResponse(code = 401, message = "인증 실패"),
			@ApiResponse(code = 404, message = "사용자 없음"),
			@ApiResponse(code = 500, message = "서버 오류")
	})
	public ResponseEntity<Boolean> deleteRoomInfo(
			@RequestBody @ApiParam(value = "참여자 정보", required = true) FindParticipantRequest findParticipantRequest) {
		return ResponseEntity.ok(participantService.delete(findParticipantRequest));
	}

}
