package com.narang_norang.NarangNorang.program.domain.dto;

import com.narang_norang.NarangNorang.program.domain.entity.Category;
import com.narang_norang.NarangNorang.program.domain.entity.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class ProgramResponse {

    private Long programSeq;
    private Category programCategory;
    private String programTitle;
    private String programContent;
    private String programUrl;
    private String programThumbnail;

    public ProgramResponse(Program program) {
        this.programSeq = program.getProgramSeq();
        this.programCategory = program.getProgramCategory();
        this.programTitle = program.getProgramTitle();
        this.programContent = program.getProgramContent();
        this.programUrl = program.getProgramUrl();
        this.programThumbnail = program.getProgramThumbnail();
    }
}
