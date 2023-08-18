package com.narang_norang.NarangNorang.member.controller;

import com.narang_norang.NarangNorang.member.auth.MemberDetails;
import com.narang_norang.NarangNorang.member.domain.dto.request.LoginMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.response.LoginMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.security.jwt.JwtTokenUtil;
import com.narang_norang.NarangNorang.member.service.MemberService;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.data.redis.core.RedisTemplate;
import org.springframework.data.redis.core.ValueOperations;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.Authentication;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.web.bind.annotation.*;
import springfox.documentation.annotations.ApiIgnore;

@Api(value = "인증 API", tags = {"Auth."})
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/v1/auth")
public class AuthController {

    private final MemberService memberService;

    private final PasswordEncoder passwordEncoder;

    private final RedisTemplate redisTemplate;


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
        String password = loginMemberRequest.getMemberPassword();

        Member member = memberService.getMemberByMemberId(memberId);

        if (passwordEncoder.matches(password, member.getMemberPassword())) {
            return ResponseEntity.ok(new LoginMemberResponse(200, "Success", JwtTokenUtil.getToken(memberId),
                    member.getMemberNickname(), member.getMemberSeq()));
        }

        return ResponseEntity.status(401).body(new LoginMemberResponse(401, "Invalid Password", null,
                null, null));
    }


    @PostMapping("/logout")
    @ApiOperation(value = "로그아웃", notes = "로그아웃.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공", response = LoginMemberResponse.class),
            @ApiResponse(code = 401, message = "인증 실패", response = LoginMemberResponse.class),
            @ApiResponse(code = 404, message = "사용자 없음", response = LoginMemberResponse.class),
            @ApiResponse(code = 500, message = "서버 오류", response = LoginMemberResponse.class)
    })
    public ResponseEntity<String> logout(@ApiIgnore Authentication authentication) {


        ValueOperations<String, String> logoutValueOperations = redisTemplate.opsForValue();
        logoutValueOperations.set(authentication.toString(), authentication.toString());

        return ResponseEntity.ok("logout 완료");
    }
}
