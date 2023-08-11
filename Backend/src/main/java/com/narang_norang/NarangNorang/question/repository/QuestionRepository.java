package com.narang_norang.NarangNorang.question.repository;

import com.narang_norang.NarangNorang.question.domain.entity.Question;
import org.springframework.data.jpa.repository.JpaRepository;

public interface QuestionRepository extends JpaRepository<Question, Long> {
}
