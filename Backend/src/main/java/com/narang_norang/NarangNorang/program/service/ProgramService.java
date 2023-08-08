package com.narang_norang.NarangNorang.program.service;

import com.narang_norang.NarangNorang.program.domain.dto.CreateProgramRequest;
import com.narang_norang.NarangNorang.program.domain.dto.ProgramResponse;
import com.narang_norang.NarangNorang.program.domain.dto.UpdateProgramRequest;
import com.narang_norang.NarangNorang.program.domain.entity.Category;
import com.narang_norang.NarangNorang.program.domain.entity.Program;
import com.narang_norang.NarangNorang.program.repository.ProgramRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

@Service
@Transactional(readOnly = true)
@RequiredArgsConstructor
public class ProgramService {

    private final ProgramRepository programRepository;

    @Transactional
    public void createProgram(CreateProgramRequest createProgramRequest) {

        Program program = programRepository.save(createProgramRequest.toProgram());

        isProgram(program);
    }

    @Transactional
    public ProgramResponse updateProgram(UpdateProgramRequest updateProgramRequest, Long programSeq) {
        Optional<Program> programOpt = programRepository.findById(programSeq);

        isExistId(programOpt);

        programOpt.get().update(updateProgramRequest.getProgramCategory(),
                updateProgramRequest.getProgramTitle(),
                updateProgramRequest.getProgramContent(),
                updateProgramRequest.getProgramUrl(),
                updateProgramRequest.getProgramThumbnail());

        return new ProgramResponse(programOpt.get());
    }

    public List<ProgramResponse> getProgramAll() {
        List<ProgramResponse> list = new ArrayList<>();

        for (Program program:
             findProgramAll()) {
            list.add(new ProgramResponse(program));
        }

        return list;
    }

    public List<ProgramResponse> getProgramByCategory(Category category) {
        List<ProgramResponse> list = new ArrayList<>();

        for (Program program :
                findProgramByCategory(category)) {
            list.add(new ProgramResponse(program));
        }

        return list;
    }


    @Transactional
    public Long deleteProgram(Long programSeq) {
        Optional<Program> programOpt = programRepository.findById(programSeq);

        isExistId(programOpt);

        programRepository.delete(programOpt.get());

        return programSeq;
    }



    public void isProgram(Program program) {
        if (program == null) {
            throw new IllegalArgumentException("저장되지 않음");
        }
    }

    public void isExistId(Optional<Program> programOpt) {
        if (programOpt.isEmpty()) {
            throw new IllegalArgumentException("존재하지 않는 프로그램 ID입니다");
        }
    }

    public Program findProgramById(Long programId) {
        return programRepository.findById(programId).orElseThrow(() ->
                new IllegalArgumentException("program_id에 해당하는 프로그램을 찾을 수 없습니다."));
    }

    public List<Program> findProgramByCategory(Category category) {
        return programRepository.findAllByProgramCategory(category);
    }

    public List<Program> findProgramAll() {
        return programRepository.findAll();
    }

}
