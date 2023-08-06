package com.narang_norang.NarangNorang.member.domain.dto.response;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.domain.entity.MemberGrade;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CreateMemberResponse {

    private Long memberSeq;
    private String memberId;
    private String memberPassword;
    private String memberEmail;
    private String memberName;
    private String memberNickname;

    public CreateMemberResponse(Member member) {
        this.memberSeq = member.getMemberSeq();
        this.memberId = member.getMemberId();
        this.memberPassword = member.getMemberPassword();
        this.memberEmail = member.getMemberEmail();
        this.memberName = member.getMemberName();
        this.memberNickname = member.getMemberNickname();
    }
}
