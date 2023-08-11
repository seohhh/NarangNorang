package com.narang_norang.NarangNorang.question.domain.dto;

import com.narang_norang.NarangNorang.question.domain.entity.Question;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.time.LocalDateTime;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class QuestionResponse {
    private Long questionSeq;
    private String questionEmail;
    private String questionContent;
    private LocalDateTime questionDate;
    private Boolean questionAnswer;

    public QuestionResponse(Question question) {
        this.questionSeq = question.getQuestionSeq();
        this.questionEmail = question.getQuestionEmail();
        this.questionContent = question.getQuestionContent();
        this.questionDate = question.getQuestionDate();
        this.questionAnswer = question.getQuestionAnswer();
    }

}
