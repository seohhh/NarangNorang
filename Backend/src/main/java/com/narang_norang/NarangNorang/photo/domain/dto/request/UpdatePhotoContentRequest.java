package com.narang_norang.NarangNorang.photo.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import org.springframework.lang.Nullable;


@Getter
@AllArgsConstructor
public class UpdatePhotoContentRequest {
    @Nullable
    private String photoContent;
}
