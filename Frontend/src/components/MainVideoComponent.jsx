import React, { useEffect, useRef, useState } from "react";
import userpose from "../utils/userpose";
// import POSE from "../utils/POSE";
// import html2canvas from "html2canvas";
import "./MainVideoComponent.css";
import * as tf from "@tensorflow/tfjs-core"; // 텐서플로우 JS 라이브러리
// import axios from "axios";
import { useSelector } from "react-redux";
import { handleWebcamElementId } from "../slice/gameSlice";
import { useDispatch } from "react-redux";
// import NarangNorangIntro from "../assets/game/narangnorang_intro.mp4";

// const BASE_URL = 'https://i9c208.p.ssafy.io/api/v1'

const MainVideoComponent = (props) => {
  const webcamRef = useRef(); // 비디오 요소 참조 생성
  const canvasRef = useRef(); // 캔버스 요소 참조 생성
  const [videoDimensions, setVideoDimensions] = useState({
    width: 640,
    height: 480,
  });
  console.log(webcamRef, "webcamRef확인")
  // dispatch(handleWebcamElementId(webcamRef.current))
  const showCanvas = useSelector((state) => state.game.showCanvas);
  const detectorRef = useRef(null);

  // 비디오 메타데이터 로드 핸들러
  const handleVideoMetadataLoaded = () => {
    // 비디오 실제 크기 설정
    setVideoDimensions({
      width: webcamRef.current.videoWidth,
      height: webcamRef.current.videoHeight,
    });
  };

  const dispatch = useDispatch()
  // 컴포넌트 마운트 시 실행
  useEffect(() => {
    if (webcamRef.current) {
      dispatch(handleWebcamElementId(webcamRef.current));

    }
    // 스켈레톤 표시 버튼 클릭 핸들러
    const handleSkeletonClick = async () => {
      if (showCanvas) {
        if (detectorRef.current) {
          // 감지기가 이미 로드되어 있을 경우
          canvasRef.current.width = videoDimensions.width; // 캔버스 너비를 비디오 너비로 설정
          canvasRef.current.height = videoDimensions.height; // 캔버스 높이를 비디오 높이로 설정
          const ctx = canvasRef.current.getContext("2d"); // 캔버스에서 2D 렌더링 컨텍스트 가져오기
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          userpose.startRender(webcamRef.current, ctx); // 사용자 포즈 렌더링 시작 (스켈레톤 그리기)
        } else {
          // 감지기가 로드되어 있지 않을 경우 로딩
          console.log("Detector not ready yet.");
          detectorRef.current = await userpose.loadDetector(); // 포즈 감지기 로딩
        }
      } else {
        // 캔버스가 숨겨진 경우 렌더링 중지
        userpose.stopRender(); // 사용자 포즈 렌더링 중지
      }
    };
    if (props && !!webcamRef) {
      props.streamManager.addVideoElement(webcamRef.current);
    }

    console.log(props);

    // 메타데이터 로드 이벤트 리스너 추가 (비디오 크기를 가져오기 위해)
    webcamRef.current.addEventListener(
      "loadedmetadata",
      handleVideoMetadataLoaded
    );

    const main = async () => {
      // eslint-disable-next-line
      detectorRef.current = await userpose.loadDetector(); // 포즈 감지기 로딩
      if (showCanvas) {
        handleSkeletonClick();
      }
      console.log(await userpose.detectPose(webcamRef.current));
    };
    tf.setBackend("webgpu").then(main);

    return () => {
      userpose.stopRender(videoDimensions.width, videoDimensions.height);
      // 컴포넌트 언마운트 시 이벤트 리스너 제거
      // if (webcamRef.current) {
      //   webcamRef.current.removeEventListener("loadedmetadata", handleVideoMetadataLoaded);
      // }
    };
  }, [
    props,
    props.streamManager,
    showCanvas,
    videoDimensions.width,
    videoDimensions.height,
    webcamRef.current
  ]);

  // const roomCode = props.streamManager.stream.session.sessionId;
  // const subscriberId = props.streamManager.stream.connection.connectionId;

  // const video = webcamRef.current;
  // const roomCode = props.streamManager.stream.session.sessionId;
  // const subscriberId = props.streamManager.stream.connection.connectionId;

  // const capture = async () => {
  //   if (webcamRef.current) {
  //     const canvas = await html2canvas(webcamRef.current, { scale: 2 });
  //     dispatch(handleCapture(webcamRef, canvas, roomCode, subscriberId));
  //   }
  // };

  // const getScore = () => {
  //   if (webcamRef.current)
  //     dispatch(handleGetScore(webcamRef.current))
  // }

  // 컴포넌트 렌더링
  return (
    <div>
      {props.streamManager !== undefined && !props.gameStatus ? (
        <div className="stream-component">
          <canvas
            ref={canvasRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          ></canvas>
          <video
            autoPlay={true}
            ref={webcamRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          />
          {/* <button onClick={capture}>지금 이 순간!</button>
          <button onClick={getScore}>유사도 계산</button> */}
        </div>
      ) : null}

      {props.streamManager !== undefined && props.gameStatus ? (
        <div className="game-stream">
          <canvas
            ref={canvasRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          ></canvas>
          <video
            autoPlay={true}
            ref={webcamRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          />
        </div>
      ) : null}
    </div>
  );
};

export default MainVideoComponent;
