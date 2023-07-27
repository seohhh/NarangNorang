package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("memberService")
@RequiredArgsConstructor
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;
    private final PasswordEncoder passwordEncoder;

    @Override
    public Member createMember(CreateMemberRequest createMemberRequest) {
        Member member = createMemberRequest.toMember(passwordEncoder);
        return memberRepository.save(member);
    }

    @Override
    public Member getMemberByMemberId(String memberId) {
        Member member = memberRepository.findByMemberId(memberId).get();
        return member;
    }
}
