package com.narang_norang.NarangNorang.member.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

import javax.validation.constraints.Pattern;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UpdateMemberRequest {


    @Nullable
    private String memberPassword;

    @Nullable
    private String memberNickname;

    @Nullable
    private String memberEmail;

    @Nullable
    private String memberName;
}
