package com.narang_norang.NarangNorang.program.domain.dto;

import com.narang_norang.NarangNorang.program.domain.entity.Category;
import com.narang_norang.NarangNorang.program.domain.entity.Program;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class CreateProgramRequest {

    private Category programCategory;
    private String programTitle;
    private String programContent;
    private String programUrl;
    private String programThumbnail;

    public Program toProgram() {
        return Program.builder()
                .programCategory(programCategory)
                .programTitle(programTitle)
                .programContent(programContent)
                .programUrl(programUrl)
                .programThumbnail(programThumbnail)
                .build();
    }
}
