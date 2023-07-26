package com.narang_norang.NarangNorang.member.domain.dto;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.Getter;

@Getter
public class ReadMemberResponse {

    private Long memberSeq;
    private String memberId;
    private String password;

    public ReadMemberResponse(Member member) {
        this.memberSeq = member.getMemberSeq();
        this.memberId = member.getMemberId();
        this.password = member.getPassword();
    }
}
