package com.narang_norang.NarangNorang.photo.domain.dto.response;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.Getter;
import lombok.Setter;

import javax.persistence.JoinColumn;
import javax.persistence.ManyToOne;
import java.util.List;

@Getter
@Setter
public class ReadPhotoResponse {

    private Long photoSeq;
    private String photoUrl;
    private String photoContent;
    private String photoDate;

    public ReadPhotoResponse(Photo photo) {
        this.photoSeq = photo.getPhotoSeq();
        this.photoUrl = photo.getPhotoUrl();
        this.photoContent = photo.getPhotoContent();
        this.photoDate = photo.getPhotoDate();
    }
}
