package com.narang_norang.NarangNorang.member.domain.dto.request;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;
import org.springframework.security.crypto.password.PasswordEncoder;

@Getter
@Setter
@AllArgsConstructor
@NoArgsConstructor
public class LoginMemberRequest {
    private String memberId;
    private String memberPassword;

    public Member toMember(PasswordEncoder passwordEncoder) {
        return Member.builder()
                .memberId(memberId)
                .memberPassword(passwordEncoder.encode(memberPassword))
                .build();
    }
}
