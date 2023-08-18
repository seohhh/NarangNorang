package com.narang_norang.NarangNorang.question.controller;

import com.narang_norang.NarangNorang.question.domain.dto.CreateQuestionRequest;
import com.narang_norang.NarangNorang.question.domain.dto.QuestionResponse;
import com.narang_norang.NarangNorang.question.domain.dto.UpdateQuestionRequest;
import com.narang_norang.NarangNorang.question.service.QuestionService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "문의 API", tags = {"Question"})
@RestController
@RequestMapping("/api/v1/question")
@RequiredArgsConstructor
public class QuestionController {
    private final QuestionService questionService;

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateQuestionRequest createQuestionRequest) {
        questionService.createQuestion(createQuestionRequest);

        return ResponseEntity.ok("Success");
    }

    @PutMapping("/update/{questionSeq}")
    public ResponseEntity<?> update(@RequestBody UpdateQuestionRequest updateQuestionRequest,
                                    @PathVariable Long questionSeq) {
        return ResponseEntity.ok(questionService.updateQuestion(updateQuestionRequest, questionSeq));
    }

    @GetMapping("/get")
    public ResponseEntity<List<QuestionResponse>> getQuestionsAll() {
        List<QuestionResponse> list = questionService.getQuestionAll();

        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(Long questionSeq) {
        Long deleteQuestionSeq = questionService.deleteQuestion(questionSeq);

        return ResponseEntity.ok("Delete complete : " + deleteQuestionSeq);
    }
}
