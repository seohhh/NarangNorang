package com.narang_norang.NarangNorang.photo.domain.entity;

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
    @Column(name = "album_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long photoSeq;
    @ManyToOne
    @JoinColumn(name="memberSeq")
    private Long memberSeq;
    private String photoUrl;
    private String photoContent;
    @Temporal(TemporalType.TIMESTAMP)
    @Column(name = "created_at")
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
