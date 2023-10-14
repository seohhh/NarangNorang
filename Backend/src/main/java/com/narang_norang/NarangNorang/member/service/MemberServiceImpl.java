package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.request.UpdateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.dto.response.UpdateMemberResponse;
import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.exception.ErrorCode;
import com.narang_norang.NarangNorang.member.exception.NotFoundException;
import com.narang_norang.NarangNorang.member.repository.MemberRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.Optional;

@Service("memberService")
@RequiredArgsConstructor
@Transactional(readOnly = true)
public class MemberServiceImpl implements MemberService {

    private final MemberRepository memberRepository;

    private final PasswordEncoder passwordEncoder;

    @Override
    @Transactional
    public Member createMember(CreateMemberRequest createMemberRequest) {
        Member member = createMemberRequest.toMember(passwordEncoder);

        return memberRepository.save(member);
    }

    @Override
    public Member getMemberByMemberId(String memberId) {
        Member member = memberRepository.findByMemberId(memberId).get();
        return member;
    }

    @Override
    public boolean checkMemberIdDuplicate(String memberId) {
        return memberRepository.existsByMemberId(memberId);
    }

    @Override
    @Transactional
    public UpdateMemberResponse updateMember(String memberId, UpdateMemberRequest updateMemberRequest) {
        Optional<Member> member = memberRepository.findByMemberId(memberId);

        isExistId(member, memberId);

        member.get()
                .update(passwordEncoder,
                        updateMemberRequest.getMemberPassword(),
                        updateMemberRequest.getMemberNickname(),
                        updateMemberRequest.getMemberEmail(),
                        updateMemberRequest.getMemberName());

        return new UpdateMemberResponse(member.get());
    }

    @Override
    @Transactional
    public boolean deleteMember(String memberId) {
        Optional<Member> member = memberRepository.findByMemberId(memberId);

        isExistId(member, memberId);

        memberRepository.delete(member.get());

        return true;
    }

    @Override
    public Member getMemberByMemberSeq(Long memberSeq) {
        Optional<Member> member = memberRepository.findById(memberSeq);
        if (member.isEmpty()) {
            throw new IllegalArgumentException("해당하는 회원이 없습니다.");
        }

        return member.get();
    }

    public void isExistId(Optional<Member> memberOpt, String loginRequest) {
        if (memberOpt.isEmpty()) {
            throw new NotFoundException(loginRequest, ErrorCode.NOT_FOUND);
        }
    }

}
