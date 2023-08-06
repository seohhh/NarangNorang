package com.narang_norang.NarangNorang.member.domain.dto.request;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.domain.entity.MemberGrade;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateMemberRequest {

    private String memberId;
    private String memberPassword;
    private String memberEmail;
    private String memberName;
    private String memberNickname;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberId(memberId)
                .memberPassword(passwordEncoder.encode(memberPassword))
                .memberEmail(memberEmail)
                .memberName(memberName)
                .memberNickname(memberNickname)
                .memberGrade(MemberGrade.MEMBER)
                .build();
    }
}
