package com.narang_norang.NarangNorang.member.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
public class UpdateMemberRequest {

    @Pattern(regexp = "^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,15}$", message = "영문,숫자,특수기호를 포함한 8자리 이상, 15자리 이하이어야 합니다.")
    @Nullable
    private String memberPassword;

    @Pattern(regexp = "^[a-zA-Zㄱ-힣0-9]*$", message = "닉네임에 특수문자를 포함할 수 없습니다.")
    @Nullable
    private String memberNickname;

    @Nullable
    private String memberEmail;

    @Nullable
    private String memberName;
}
