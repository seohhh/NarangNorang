package com.narang_norang.NarangNorang.question.domain.dto;

import com.narang_norang.NarangNorang.question.domain.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateQuestionRequest {
    private String questionEmail;
    private String questionContent;

    public Question toQuestion() {
        return Question.builder()
                .questionEmail(questionEmail)
                .questionContent(questionContent)
                .build();
    }
}
