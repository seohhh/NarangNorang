package com.narang_norang.NarangNorang.program.repository;

import com.narang_norang.NarangNorang.program.domain.entity.Category;
import com.narang_norang.NarangNorang.program.domain.entity.Program;
import org.springframework.data.jpa.repository.JpaRepository;

import java.util.List;

public interface ProgramRepository extends JpaRepository<Program, Long> {

    List<Program> findAllByProgramCategory(Category category);
}
