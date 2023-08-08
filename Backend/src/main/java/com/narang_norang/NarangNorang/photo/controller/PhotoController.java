package com.narang_norang.NarangNorang.photo.controller;

import com.narang_norang.NarangNorang.photo.domain.dto.request.UpdatePhotoContentRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.request.UploadPhotoRequest;
import com.narang_norang.NarangNorang.photo.domain.dto.response.ReadPhotoResponse;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UpdatePhotoContentResponse;
import com.narang_norang.NarangNorang.photo.domain.dto.response.UploadPhotoResponse;
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
import java.util.List;

@Api(value = "사진 API", tags = {"Photo"})
@RequiredArgsConstructor
@RestController
@RequestMapping("/api/photo")
public class PhotoController {

    @Autowired
    PhotoService photoService;

    private final S3Uploader s3Uploader;

    @PostMapping("/{memberSeq}/image")
    @ApiOperation(value = "사진 등록", notes = "사진을 등록한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UploadPhotoResponse> uploadPhoto(@RequestParam("images") MultipartFile multipartFile,
                                                           @RequestBody @ApiParam(value = "사진 정보", required = true)UploadPhotoRequest uploadPhotoRequest) {
        try {
            String url = s3Uploader.uploadFiles(multipartFile, "static");
            Photo photo = uploadPhotoRequest.toPhoto(url);
            photoService.uploadPhoto(photo);
        } catch (Exception e) {
            return new ResponseEntity(HttpStatus.BAD_REQUEST);
        }
        return new ResponseEntity(HttpStatus.NO_CONTENT);
    }

    @GetMapping("/album/{memberSeq}")
    @ApiOperation(value = "앨범 조회", notes = "로그인한 회원의 앨범을 조회한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<ReadPhotoResponse> readPhoto(@PathVariable("memberSeq") final Long memberSeq) {
        List<Photo> photoList = photoService.getPhotoByMemberId(memberSeq);
        return ResponseEntity.ok(new ReadPhotoResponse(photoList));
    }

    @PutMapping ("/album/{photoSeq}")
    @ApiOperation(value = "앨범 사진 내용 수정", notes = "앨범 사진 내용을 수정한다.")
    @ApiResponses({
            @ApiResponse(code = 200, message = "성공"),
            @ApiResponse(code = 401, message = "인증 실패"),
            @ApiResponse(code = 404, message = "사용자 없음"),
            @ApiResponse(code = 500, message = "서버 오류")
    })
    public ResponseEntity<UpdatePhotoContentResponse> update(@PathVariable("photoSeq") final Long photoSeq,
                                                             @RequestBody @Valid final UpdatePhotoContentRequest request) {

        UpdatePhotoContentResponse response = photoService.updatePhotoContent(photoSeq, request);

        return ResponseEntity.ok(response);
    }

}
