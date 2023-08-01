package com.narang_norang.NarangNorang.member.service;

import com.narang_norang.NarangNorang.member.domain.dto.request.CreateMemberRequest;
import com.narang_norang.NarangNorang.member.domain.entity.Member;

public interface MemberService {

    Member createMember(CreateMemberRequest createMemberRequest);
    Member getMemberByMemberId(String memberId);
    boolean checkMemberIdDuplicate(String memberId);
}
