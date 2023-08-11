package com.narang_norang.NarangNorang.question.domain.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.lang.Nullable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateQuestionRequest {
    @Nullable
    private Boolean questionAnswer;
}
