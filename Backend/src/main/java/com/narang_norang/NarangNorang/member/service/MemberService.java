package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.exception.DuplicateException;
import com.narang_norang.NarangNorang.member.exception.ErrorCode;
import com.narang_norang.NarangNorang.member.exception.NotFoundException;
import com.narang_norang.NarangNorang.member.domain.dto.CreateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.dto.LoginMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.LoginMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.domain.dto.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service
@RequiredArgsConstructor
@Transactional(readOnly = true)
@Slf4j
public class MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Transactional
    public CreateMemberResponse createMember(CreateMemberRequest memberRequest) {
        isDuplicated(memberRepository.findByMemberId(memberRequest.getMemberId()), memberRequest.getMemberId());

        Member member = memberRepository.save(memberRequest.toMember(passwordEncoder));

        return new CreateMemberResponse(member);
    }

    public LoginMemberResponse login(LoginMemberRequest loginRequest) {
        Optional<Member> memberOpt = findBymemberId(loginRequest.getMemberId());

        isExistedId(memberOpt, loginRequest.getMemberId());

        Member member = memberOpt.get();
        isRightPassword(loginRequest, member);

        return new LoginMemberResponse(member.getMemberId());
    }

    private void isRightPassword(LoginMemberRequest loginRequest, Member member) {
        if (!passwordEncoder.matches(loginRequest.getPassword(), member.getPassword())) {
            log.error("Invalid password for ID : " + loginRequest.getMemberId());
            throw new IllegalArgumentException("Invalid password");
        }
    }

    private void isExistedId(Optional<Member> memberOpt, String requestId) {
        if (memberOpt.isEmpty()) {
            log.error(requestId + " is not found");
            throw new NotFoundException(requestId, ErrorCode.NOT_FOUND);
        }
    }

    private void isDuplicated(Optional<Member> memberRequest, String requestId) {
        if (memberRequest.isPresent()) {
            log.error(requestId + "is duplicated");
            throw new DuplicateException(requestId, ErrorCode.DUPLICATION);
        }
    }

    private Optional<Member> findBymemberId(String memberId) {
        return memberRepository.findByMemberId(memberId);
    }
}
