import React, { useEffect, useRef, useState } from "react";
import userpose from "../utils/userpose"; // 사용자 포즈 탐지 유틸리티
import "./UserVideo.css";
import * as tf from "@tensorflow/tfjs-core"; // 텐서플로우 JS 라이브러리

const MainVideoComponent = (props) => {
  const videoRef = useRef(); // 비디오 요소 참조 생성
  const canvasRef = useRef(); // 캔버스 요소 참조 생성
  const [showCanvas, setShowCanvas] = useState(false); // 캔버스 표시 상태 관리
  const [videoDimensions, setVideoDimensions] = useState({ width: 640, height: 480 }); // 비디오 크기 상태 관리

  let detector; // 포즈 감지기 참조
  let ctx; // 캔버스 컨텍스트 참조

  // 비디오 메타데이터 로드 핸들러
  const handleVideoMetadataLoaded = () => {
    // 비디오 실제 크기 설정
    setVideoDimensions({
      width: videoRef.current.videoWidth,
      height: videoRef.current.videoHeight,
    });
  };

  // 스켈레톤 표시 버튼 클릭 핸들러
const handleSkeletonClick = async () => {
  setShowCanvas(!showCanvas); // 캔버스 표시 상태 토글 (켜거나 끔)
  console.log("show", showCanvas)
  if (showCanvas) {
    if (detector) {
      // 감지기가 이미 로드되어 있을 경우
      canvasRef.current.width = videoDimensions.width; // 캔버스 너비를 비디오 너비로 설정
      canvasRef.current.height = videoDimensions.height; // 캔버스 높이를 비디오 높이로 설정
      ctx = canvasRef.current.getContext("2d"); // 캔버스에서 2D 렌더링 컨텍스트 가져오기
      userpose.startRender(videoRef.current, ctx); // 사용자 포즈 렌더링 시작 (스켈레톤 그리기)
    } else {
      // 감지기가 로드되어 있지 않을 경우 로딩
      console.log("Detector not ready yet.");
      detector = await userpose.loadDetector(); // 포즈 감지기 로딩
    }
  } else {
    // 캔버스가 숨겨진 경우 렌더링 중지
    userpose.stopRender(); // 사용자 포즈 렌더링 중지
  }
};

// 포즈 감지 버튼 클릭 핸들러
const handleDetectClick = async () => {
  if (detector) {
    // 감지기가 로드되어 있을 경우
    const poses = await userpose.detectPose(videoRef.current); // 비디오에서 현재 포즈 감지
    console.log(poses); // 콘솔에 감지된 포즈 출력
  } else {
    // 감지기가 로드되어 있지 않을 경우 로딩
    console.log("Detector not ready yet.");
    detector = await userpose.loadDetector(); // 포즈 감지기 로딩
  }
};

  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    if (props && !!videoRef) {
      props.streamManager.addVideoElement(videoRef.current);
    }

    // 메타데이터 로드 이벤트 리스너 추가 (비디오 크기를 가져오기 위해)
    videoRef.current.addEventListener("loadedmetadata", handleVideoMetadataLoaded);

    const main = async () => {
      // eslint-disable-next-line
      detector = await userpose.loadDetector(); // 포즈 감지기 로딩
      console.log(await userpose.detectPose(videoRef.current)); // 초기 포즈 감지
    };
    tf.setBackend("webgpu").then(main);

    return () => {
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      // eslint-disable-next-line
      videoRef.current.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
    };
  });

  // 컴포넌트 렌더링
  return (
    <div>
      {props.streamManager !== undefined ? (
        <div className="streamcomponent">
          <canvas ref={canvasRef} width={videoDimensions.width} height={videoDimensions.height}></canvas>
          <video autoPlay={true} ref={videoRef} width={videoDimensions.width} height={videoDimensions.height} />
          <div>
            <button onClick={handleSkeletonClick}>엑스레이 모드</button> {/* 스켈레톤 표시 버튼 */}
            <button onClick={handleDetectClick}>detectPose</button> {/* 포즈 감지 버튼 */}
            <p>{JSON.parse(props.streamManager.stream.connection.data).clientData}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default MainVideoComponent;