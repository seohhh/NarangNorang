package com.narang_norang.NarangNorang.member.domain.entity;

import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.List;
import java.util.Objects;

@Entity
@Builder
@NoArgsConstructor
@AllArgsConstructor
@Getter
public class Member {

    @Id
    @Column(name = "member_seq")
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long memberSeq;
    @Column(unique = true)
    private String memberId;
    private String memberPassword;
    private String memberEmail;
    private String memberName;
    private String memberNickname;
    private MemberGrade memberGrade;
    @OneToMany
    @JoinColumn(name="member_seq")
    private List<Photo> photo;

    public void update(PasswordEncoder passwordEncoder, String memberPassword, String memberNickname,
                       String memberEmail, String memberName) {

        if (!Objects.isNull(memberPassword)) {
            this.memberPassword = passwordEncoder.encode(memberPassword);
        }

        if (!Objects.isNull(memberName)) {
            this.memberName = memberName;
        }

        if (!Objects.isNull(memberNickname)) {
            this.memberNickname = memberNickname;
        }

        if (!Objects.isNull(memberEmail)) {
            this.memberEmail = memberEmail;
        }
    }
}
