package com.narang_norang.NarangNorang.member.controller;

import com.narang_norang.NarangNorang.member.domain.dto.CreateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.dto.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.LoginMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.LoginMemberResponse;
import com.narang_norang.NarangNorang.member.service.MemberService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RestController;

import javax.validation.Valid;
import java.net.URI;

@RequiredArgsConstructor
@RestController
@RequestMapping("/narang-norang")
public class MemberController {

    private final MemberService memberService;

    @PostMapping("/sign-up")
    public ResponseEntity<CreateMemberResponse> add(@RequestBody @Valid final CreateMemberRequest request) {

        CreateMemberResponse response = memberService.createMember(request);
        URI uri = URI.create("/narang-norang/sign-up");

        return ResponseEntity.created(uri).body(response);
    }

    @PostMapping("/login")
    public ResponseEntity<LoginMemberResponse> login(@RequestBody @Valid final LoginMemberRequest loginRequest) {
        LoginMemberResponse login = memberService.login(loginRequest);
        URI uri = URI.create("/narang-norang/login");

        return ResponseEntity.ok(login);
    }
}
