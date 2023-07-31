package com.narang_norang.NarangNorang.member.controller;

import com.narang_norang.NarangNorang.member.domain.dto.request.LoginMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.response.LoginMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.security.jwt.JwtTokenUtil;
import com.narang_norang.NarangNorang.member.service.MemberService;
import io.swagger.annotations.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequestMapping("/api/v1/auth")
public class AuthController {

    @Autowired
    MemberService memberService;

    @Autowired
    PasswordEncoder passwordEncoder;

    @PostMapping("/login")
    @ApiOperation(value = "로그인", notes = "<strong>아이디와 패스워드</strong>를 통해 로그인 한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginMemberResponse.class),
            @ApiResponse(code = 401, message = "인증 실패", response = LoginMemberResponse.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = LoginMemberResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = LoginMemberResponse.class)
    })
    public ResponseEntity<LoginMemberResponse> login(@RequestBody
                                                         @ApiParam(value = "로그인 정보", required = true)LoginMemberRequest loginMemberRequest) {
        String memberId = loginMemberRequest.getMemberId();
        String password = loginMemberRequest.getPassword();

        Member member = memberService.getMemberByMemberId(memberId);

        if (passwordEncoder.matches(password, member.getPassword())) {
            return ResponseEntity.ok(new LoginMemberResponse(200, "Success", JwtTokenUtil.getToken(memberId)));
        }

        return ResponseEntity.status(401).body(new LoginMemberResponse(401, "Invalid Password", null));
    }

}
