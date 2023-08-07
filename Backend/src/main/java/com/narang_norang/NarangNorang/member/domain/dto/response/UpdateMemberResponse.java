package com.narang_norang.NarangNorang.member.domain.dto.response;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.Getter;

@Getter
public class UpdateMemberResponse {

    private String memberId;

    private String memberNicname;

    private String memberEmail;

    private String memberName;

    public UpdateMemberResponse(Member member) {
        this.memberId = member.getMemberId();
        this.memberNicname = member.getMemberNickname();
        this.memberEmail = member.getMemberEmail();
        this.memberName = member.getMemberName();
    }
}
