package com.narang_norang.NarangNorang.photo.domain.entity;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Photo {
    @Id
    @Column(name = "photo_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoSeq;
    @ManyToOne(targetEntity = Member.class)
    @JoinColumn(name="member_seq")
    private Member member;
    private String photoFilename;
    private String photoUrl;
    private String photoContent;
    private String photoDate;

    public void updateContent(String photoContent) {
        if (!Objects.isNull(photoContent)) {
            this.photoContent = photoContent;
        }
    }

}
