package com.narang_norang.NarangNorang.member.domain.dto.response;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter
@Setter
public class LoginMemberResponse {

    private Integer statusCode;
    private String message;
    private String accessToken;
    private String memberNickname;

    public LoginMemberResponse(Integer statusCode, String message, String accessToken, String memberNickname) {
        this.statusCode = statusCode;
        this.message = message;
        this.accessToken = accessToken;
        this.memberNickname = memberNickname;
    }
}
