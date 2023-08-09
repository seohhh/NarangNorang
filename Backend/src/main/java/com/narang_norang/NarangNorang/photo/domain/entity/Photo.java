package com.narang_norang.NarangNorang.photo.domain.entity;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Date;
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
    private Long memberSeq;
    private String photoUrl;
    private String photoContent;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "photo_date")
    private Date photoDate;

    public void update(String photoContent) {
        if (!Objects.isNull(photoContent)) {
            this.photoContent = photoContent;
        }
    }

    @PrePersist
    public void prePersist() {
        photoDate = new Date();
    }

}
