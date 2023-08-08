package com.narang_norang.NarangNorang.program.domain.dto;

import com.narang_norang.NarangNorang.program.domain.entity.Category;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import org.springframework.lang.Nullable;

@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdateProgramRequest {


    @Nullable
    private Category programCategory;

    @Nullable
    private String programTitle;

    @Nullable
    private String programContent;

    @Nullable
    private String programUrl;

    @Nullable
    private String programThumbnail;
}
