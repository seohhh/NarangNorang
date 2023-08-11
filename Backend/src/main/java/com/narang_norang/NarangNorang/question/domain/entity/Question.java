package com.narang_norang.NarangNorang.question.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.CreationTimestamp;
import org.hibernate.annotations.DynamicInsert;

import javax.persistence.*;
import java.time.LocalDateTime;
import java.util.Objects;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
@DynamicInsert
public class Question {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long questionSeq;

    private String questionEmail;

    private String questionContent;

    @CreationTimestamp
    private LocalDateTime questionDate;

    @Column(columnDefinition = "boolean default false", nullable = false)
    private Boolean questionAnswer;

    public void update(Boolean questionAnswer) {
        if(!Objects.isNull(questionAnswer)) {
            this.questionAnswer = questionAnswer;
        }
    }
}
