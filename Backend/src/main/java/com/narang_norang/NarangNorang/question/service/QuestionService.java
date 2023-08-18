package com.narang_norang.NarangNorang.question.service;

import com.narang_norang.NarangNorang.question.domain.dto.CreateQuestionRequest;
import com.narang_norang.NarangNorang.question.domain.dto.QuestionResponse;
import com.narang_norang.NarangNorang.question.domain.dto.UpdateQuestionRequest;
import com.narang_norang.NarangNorang.question.domain.entity.Question;
import com.narang_norang.NarangNorang.question.repository.QuestionRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import javax.validation.constraints.NotNull;
import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class QuestionService {
    private final QuestionRepository questionRepository;

    @Transactional
    public void createQuestion(CreateQuestionRequest createQuestionRequest) {
        Question question = questionRepository.save(createQuestionRequest.toQuestion());

        isQuestion(question);
    }

    @Transactional
    public QuestionResponse updateQuestion(UpdateQuestionRequest updateQuestionRequest, Long questionSeq) {
        Optional<Question> questionOptional = questionRepository.findById(questionSeq);

        isExistId(questionOptional);

        questionOptional.get()
                .update(updateQuestionRequest.getQuestionAnswer());

        return new QuestionResponse(questionOptional.get());
    }

    public List<QuestionResponse> getQuestionAll() {
        List<QuestionResponse> list = new ArrayList<>();

        for (Question question : findQuestionAll()) {
            list.add(new QuestionResponse(question));
        }

        return list;
    }

    @Transactional
    public Long deleteQuestion(Long questionSeq) {
        Optional<Question> questionOptional = questionRepository.findById(questionSeq);

        isExistId(questionOptional);

        questionRepository.delete(questionOptional.get());

        return questionSeq;
    }

    public void isQuestion(Question question) {
        if (question == null) {
            throw new IllegalArgumentException("저장되지 않음");
        }
    }

    public void isExistId(@NotNull Optional<Question> questionOptional) {
        if (questionOptional.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 문의 ID");
        }
    }

    public List<Question> findQuestionAll() {
        return questionRepository.findAll();
    }
}
