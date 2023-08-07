package com.narang_norang.NarangNorang.photo.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import javax.persistence.*;

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
    @OneToMany
    @JoinColumn(name="memberSeq")
    private Long memberSeq;
    private String photoUrl;
    private String photoContent;
    private String photoDate;

}
