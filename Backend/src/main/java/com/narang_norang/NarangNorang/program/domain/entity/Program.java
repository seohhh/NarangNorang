package com.narang_norang.NarangNorang.program.domain.entity;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;
import org.springframework.security.crypto.password.PasswordEncoder;

import javax.persistence.*;
import java.util.Objects;

@Entity
@Getter
@AllArgsConstructor
@NoArgsConstructor
@Builder
public class Program {

    @Id
    @GeneratedValue(strategy = GenerationType.AUTO)
    private Long programSeq;

    private Category programCategory;
    private String programTitle;
    private String programContent;
    private String programUrl;
    private String programThumbnail;


    public void update(Category programCategory, String programTitle, String programContent,
                       String programUrl, String programThumbnail) {

        if (!Objects.isNull(programCategory)) {
            this.programCategory = programCategory;
        }

        if (!Objects.isNull(programTitle)) {
            this.programTitle = programTitle;
        }

        if (!Objects.isNull(programContent)) {
            this.programContent = programContent;
        }

        if (!Objects.isNull(programUrl)) {
            this.programUrl = programUrl;
        }

        if (!Objects.isNull(programThumbnail)) {
            this.programThumbnail = programThumbnail;
        }
    }

}
