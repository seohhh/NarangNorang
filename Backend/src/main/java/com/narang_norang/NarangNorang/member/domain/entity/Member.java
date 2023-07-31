package com.narang_norang.NarangNorang.member.domain.entity;

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
public class Member {

    @Id
    @Column(name = "member_seq")
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long memberSeq;

    private String memberId;
    private String password;
}
