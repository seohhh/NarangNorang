package com.narang_norang.NarangNorang.member.controller;

import com.narang_norang.NarangNorang.member.auth.MemberDetails;
import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.request.UpdateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.response.CreateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.dto.response.ReadMemberResponse;
import com.narang_norang.NarangNorang.member.domain.dto.response.UpdateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

import javax.validation.Valid;

@Api(value = "유저 API", tags = {"Member"})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/member")
public class MemberController {

    private final MemberService memberService;

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

    @GetMapping("/{memberId}")
    public ResponseEntity<Boolean> checkMemberIdDuplicate(@PathVariable("memberId") final String memberId) {
        return ResponseEntity.ok(memberService.checkMemberIdDuplicate(memberId));
    }

    @PutMapping ("/me/update/{memberId}")
    @ApiOperation(value = "회원 본인 정보 수정", notes = "로그인한 회원 본인의 정보를 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UpdateMemberResponse> update(@PathVariable("memberId") final String memberId,
            @RequestBody @Valid final UpdateMemberRequest request) {

        UpdateMemberResponse response = memberService.updateMember(memberId, request);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/me/delete/{memberId}")
    @ApiOperation(value = "회원 본인 정보 삭제", notes = "로그인한 회원 본인의 정보를 응답삭제.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> delete(@PathVariable("memberId") final String memberId) {

        return ResponseEntity.ok(memberService.deleteMember(memberId));
    }
}
