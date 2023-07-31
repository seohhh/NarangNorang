package com.narang_norang.NarangNorang.member.controller;

import com.narang_norang.NarangNorang.member.auth.MemberDetails;
import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.response.CreateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.dto.response.ReadMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "유저 API", tags = {"Member"})
@RestController
@RequestMapping("/api/v1/member")
public class MemberController {

    @Autowired
    MemberService memberService;

    @PostMapping()
    @ApiOperation(value = "회원 가입", notes = "<strong>아이디와 패스워드</strong>을 통해 회원가입 한다.")
    @ApiResponses({
            @ApiResponse(code = 201, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<CreateMemberResponse> register(
            @RequestBody @ApiParam(value = "회원가입 정보", required = true) CreateMemberRequest createMemberRequest) {

        Member member = memberService.createMember(createMemberRequest);
        return ResponseEntity.ok(new CreateMemberResponse(member));
    }


    @GetMapping("/me")
    @ApiOperation(value = "회원 본인 정보 조회", notes = "로그인한 회원 본인의 정보를 응답한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ReadMemberResponse> getMemberInfo(@ApiIgnore Authentication authentication) {

        MemberDetails memberDetails = (MemberDetails) authentication.getDetails();

        String memberId = memberDetails.getUsername();
        Member member = memberService.getMemberByMemberId(memberId);

        return ResponseEntity.ok(new ReadMemberResponse(member));
    }
}
