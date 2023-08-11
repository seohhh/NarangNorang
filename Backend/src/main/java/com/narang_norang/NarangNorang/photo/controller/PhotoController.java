package com.narang_norang.NarangNorang.photo.controller;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.ReadPhotoResponse;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import com.narang_norang.NarangNorang.photo.service.PhotoService;
import com.narang_norang.NarangNorang.redis.picture.domain.entity.Picture;
import com.narang_norang.NarangNorang.redis.picture.repository.PictureRepository;
import com.narang_norang.NarangNorang.redis.picture.service.PictureService;
import com.narang_norang.NarangNorang.util.S3Uploader;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.apache.commons.io.FileUtils;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Api(value = "사진 API", tags = {"Photo"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/v1/album")
public class PhotoController {

    private final PhotoService photoService;

    private final MemberService memberService;

    private final S3Uploader s3Uploader;

    private final PictureService pictureService;

    @PostMapping("/upload")
    @ApiOperation(value = "사진 등록", notes = "사진을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> uploadPhoto(@RequestParam("memberSeq") Long memberSeq,
                                               @RequestParam("roomCode") String roomCode,
                                               @RequestParam("subscriberId") String subscriberId) {
        try {
            List<Picture> pictureList = pictureService.getPictureByRoomCodeAndSubscriberId(roomCode, subscriberId);
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            for (Picture picture : pictureList) {
                String[] texts = s3Uploader.uploadFiles(picture, "static/"+member.getMemberId());
                Photo photo = Photo.builder()
                        .member(member)
                        .photoFilename(texts[0])
                        .photoUrl(texts[1])
                        .photoDate(picture.getPictureTime().toString())
                        .build();
                photoService.uploadPhoto(photo);
            }

        } catch (Exception e) {
            return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity<>(HttpStatus.CREATED);
    }

    @GetMapping("/{memberSeq}")
    @ApiOperation(value = "앨범 조회", notes = "로그인한 회원의 앨범을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<List<ReadPhotoResponse>> readPhoto(@PathVariable("memberSeq") final Long memberSeq) {
        Member member = memberService.getMemberByMemberSeq(memberSeq);
        List<Photo> photoList = photoService.getPhotoByMember(member);

        List<ReadPhotoResponse> readPhotoResponses = new ArrayList<>();

        for (Photo photo :
                photoList) {
            readPhotoResponses.add(new ReadPhotoResponse(photo));
        }

        return ResponseEntity.ok(readPhotoResponses);
    }

    @PostMapping ("/content")
    @ApiOperation(value = "앨범 사진 내용 수정", notes = "앨범 사진 내용을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UpdatePhotoContentResponse> updateContent(
            @RequestBody @Valid final UpdatePhotoContentRequest updatePhotoContentRequestrequest) {

        UpdatePhotoContentResponse response = photoService.updatePhotoContent(updatePhotoContentRequestrequest);

        return ResponseEntity.ok(response);
    }

    @DeleteMapping("/delete/{photoSeq}")
    @ApiOperation(value = "앨범 사진 삭제", notes = "앨범 사진을 삭제한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })

    public ResponseEntity<Boolean> deletePhoto(@PathVariable("photoSeq") final Long photoSeq) throws IOException {
        String FileName = photoService.getFilenameByPhotoSeq(photoSeq);
        s3Uploader.deleteFile(FileName);
        return ResponseEntity.ok(photoService.deletePhoto(photoSeq));
    }

    @PostMapping("/capture")
    @ApiOperation(value = "캡처 저장", notes = "캡처 사진을 레디스에 저장한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> uploadCapture(@RequestParam("roomCode") String roomCode,
                                                 @RequestParam("subscriberId") String subscriberId,
                                               @RequestParam("images") MultipartFile[] multipartFiles) throws IOException {

        for (MultipartFile multipartFile : multipartFiles) {

            Picture picture = Picture.builder()
                    .roomCode(roomCode)
                    .subscriberId(subscriberId)
                    .pictureName(multipartFile.getOriginalFilename())
                    .pictureContentType(multipartFile.getContentType())
                    .pictureData(multipartFile.getBytes())
                    .pictureSize(multipartFile.getSize())
                    .pictureTime(LocalDateTime.now())
                    .build();
            pictureService.savePicture(picture);
        }

        return new ResponseEntity<>(HttpStatus.CREATED);
    }

}
