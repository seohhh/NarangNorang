package com.narang_norang.NarangNorang.program.controller;

import com.narang_norang.NarangNorang.program.domain.dto.CreateProgramRequest;
import com.narang_norang.NarangNorang.program.domain.dto.ProgramResponse;
import com.narang_norang.NarangNorang.program.domain.dto.UpdateProgramRequest;
import com.narang_norang.NarangNorang.program.domain.entity.Category;
import com.narang_norang.NarangNorang.program.service.ProgramService;
import io.swagger.annotations.Api;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Api(value = "프로그램 API", tags = {"Program"})
@RestController
@RequestMapping("/api/v1/program")
@RequiredArgsConstructor
public class ProgramController {

    private final ProgramService programService;

    @PostMapping("")
    public ResponseEntity<?> create(@RequestBody CreateProgramRequest createProgramRequest) {
        programService.createProgram(createProgramRequest);

        return ResponseEntity.ok("Success");
    }

    @PutMapping("/update/{programSeq}")
    public ResponseEntity<ProgramResponse> update(@RequestBody UpdateProgramRequest updateProgramRequest,
                                                  @PathVariable Long programSeq) {
        return ResponseEntity.ok(programService.updateProgram(updateProgramRequest, programSeq));
    }

    @GetMapping("/get")
    public ResponseEntity<List<ProgramResponse>> getProgramsAll() {
        List<ProgramResponse> list = programService.getProgramAll();

        return ResponseEntity.ok(list);
    }

    @GetMapping("/get/{category}")
    public ResponseEntity<List<ProgramResponse>> getProgramsByCategory(@RequestBody @PathVariable Category category) {
        List<ProgramResponse> list = programService.getProgramByCategory(category);

        return ResponseEntity.ok(list);
    }

    @DeleteMapping("/delete")
    public ResponseEntity<String> delete(Long programSeq) {
        Long deleteProgramSeq = programService.deleteProgram(programSeq);
        return ResponseEntity.ok("Delete Complete : " + deleteProgramSeq);
    }
}
