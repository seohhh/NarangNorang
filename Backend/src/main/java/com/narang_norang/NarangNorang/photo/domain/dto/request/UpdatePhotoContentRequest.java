package com.narang_norang.NarangNorang.photo.domain.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.annotation.Nullable;


@Getter
@NoArgsConstructor
@AllArgsConstructor
public class UpdatePhotoContentRequest {
    private Long photoSeq;
    private String photoContent;
}
