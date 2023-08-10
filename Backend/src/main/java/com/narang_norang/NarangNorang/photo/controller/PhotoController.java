package com.narang_norang.NarangNorang.photo.controller;

import com.narang_norang.NarangNorang.member.domain.entity.Member;
import com.narang_norang.NarangNorang.member.service.MemberService;
import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.ReadPhotoResponse;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.entity.Photo;
import com.narang_norang.NarangNorang.photo.service.PhotoService;
import com.narang_norang.NarangNorang.util.S3Uploader;
import io.swagger.annotations.*;
import lombok.RequiredArgsConstructor;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import javax.validation.Valid;
import java.io.IOException;
import java.util.ArrayList;
import java.util.List;

@Api(value = "사진 API", tags = {"Photo"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/album")
public class PhotoController {

    private final PhotoService photoService;

    private final MemberService memberService;

    private final S3Uploader s3Uploader;

    @PostMapping("/upload")
    @ApiOperation(value = "사진 등록", notes = "사진을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<Boolean> uploadPhoto(@RequestParam("memberSeq") Long memberSeq,
                                               @RequestParam("images") MultipartFile multipartFile) {
        try {
            Member member = memberService.getMemberByMemberSeq(memberSeq);
            String[] texts = s3Uploader.uploadFiles(multipartFile, "static/"+member.getMemberId());
            Photo photo = Photo.builder()
                            .member(member)
                            .photoFilename(texts[0])
                            .photoUrl(texts[1])
                            .build();
            photoService.uploadPhoto(photo);
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

    @PutMapping ("/content/{photoSeq}")
    @ApiOperation(value = "앨범 사진 내용 수정", notes = "앨범 사진 내용을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UpdatePhotoContentResponse> updateContent(@PathVariable("photoSeq") final Long photoSeq,
                                                             @RequestBody @Valid final UpdatePhotoContentRequest request) {

        UpdatePhotoContentResponse response = photoService.updatePhotoContent(photoSeq, request);

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

}
