package com.narang_norang.NarangNorang.util;

import com.amazonaws.SdkClientException;
import com.amazonaws.services.s3.AmazonS3Client;
import com.amazonaws.services.s3.model.CannedAccessControlList;
import com.amazonaws.services.s3.model.PutObjectRequest;
import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.context.annotation.ComponentScan;
import org.springframework.stereotype.Component;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.FileOutputStream;
import java.io.IOException;
import java.util.Optional;
import java.util.UUID;

@Component
@RequiredArgsConstructor
public class S3Uploader {

    private final AmazonS3Client amazonS3Client;

    @Value("${cloud.aws.s3.bucket}")
    private String bucket;

    public String[] uploadFiles(Picture picture, String dirName) throws IOException {
        System.out.println("upload 파일들어왔다");
        File uploadFile = convert(picture)  // 파일 변환할 수 없으면 에러
                .orElseThrow(() -> new IllegalArgumentException("error: MultipartFile -> File convert fail"));
        return upload(uploadFile, dirName);
    }

    public String[] upload(File uploadFile, String filePath) {
        // texts[0] = fileName , texts[1] = uploadImageUrl
        System.out.println("파일 처음 들어왔다");
        String[] texts = new String[2];
        System.out.println("파일 텍스트명 적었다");
        texts[0] = filePath + "/" + UUID.randomUUID() + uploadFile.getName();   // S3에 저장된 파일 이름
        System.out.println("파일 S3에 저장된 파일 이름 적어버려");
        texts[1] = putS3(uploadFile, texts[0]); // s3로 업로드
        System.out.println("파일 저장 해버려");
        removeNewFile(uploadFile);
        return texts;
    }

    // S3로 업로드
    private String putS3(File uploadFile, String fileName) {
        amazonS3Client.putObject(new PutObjectRequest(bucket, fileName, uploadFile).withCannedAcl(CannedAccessControlList.PublicRead));
        return amazonS3Client.getUrl(bucket, fileName).toString();
    }

    // S3의 이미지 삭제
    public void deleteFile(String fileName) throws IOException {
        try {
            amazonS3Client.deleteObject(bucket, fileName);
        } catch (SdkClientException e) {
            throw new IOException("Error deleteing file from S3", e);
        }
    }

    // 로컬에 저장된 이미지 지우기
    private void removeNewFile(File targetFile) {
        if (targetFile.delete()) {
            System.out.println("File delete success");
            return;
        }
        System.out.println("File delete fail");
    }

    // 로컬에 파일 업로드 하기
    private Optional<File> convert(Picture picture) throws IOException {
        File convertFile = new File(System.getProperty("user.dir") + "/" + picture.getPictureName());
        if (convertFile.createNewFile()) { // 바로 위에서 지정한 경로에 File이 생성됨 (경로가 잘못되었다면 생성 불가능)
            try (FileOutputStream fos = new FileOutputStream(convertFile)) { // FileOutputStream 데이터를 파일에 바이트 스트림으로 저장하기 위함
                fos.write(picture.getPictureData());
            }
            return Optional.of(convertFile);
        }
        return Optional.empty();
    }
}
