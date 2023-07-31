package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;

@Service("memberService")
public class MemberServiceImpl implements MemberService {

    @Autowired
    MemberRepository memberRepository;

    @Autowired
    PasswordEncoder passwordEncoder;

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
