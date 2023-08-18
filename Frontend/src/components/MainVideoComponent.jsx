import React, { useEffect, useRef, useState } from "react";
import userpose from "../utils/userpose";
import "./MainVideoComponent.css";
import * as tf from "@tensorflow/tfjs-core";
import { useSelector, useDispatch } from "react-redux";
import { handleWebcamRef } from "../slice/gameSlice";
import superStar from "../assets/game/score/superStar.gif";
import winner from "../assets/game/score/winner.gif";


const MainVideoComponent = (props) => {
  const webcamRef = useRef(); // 비디오 요소 참조 생성
  const canvasRef = useRef(); // 캔버스 요소 참조 생성
  const [videoDimensions, setVideoDimensions] = useState({
    width: 640,
    height: 480,
  });
  const dispatch = useDispatch()

  dispatch(handleWebcamRef(webcamRef.current))
  const showCanvas = useSelector((state) => state.game.showCanvas);
  const detectorRef = useRef(null);

  const nowScore = useSelector((state) => state.game.nowScore);
  const totalScore = useSelector((state) => state.game.totalScore);
  const [great, setGreat] = useState(false);
  const [awesome, setAwesome] = useState(false);

  // 비디오 메타데이터 로드 핸들러
  const handleVideoMetadataLoaded = () => {
    // 비디오 실제 크기 설정
    setVideoDimensions({
      width: webcamRef.current.videoWidth,
      height: webcamRef.current.videoHeight,
    });
  };

  useEffect(() => {
    // 스켈레톤 표시 버튼 클릭 핸들러
    const handleSkeletonClick = async () => {
      if (showCanvas) {
        if (detectorRef.current && webcamRef.current !== null) {
          // 감지기가 이미 로드되어 있을 경우
          canvasRef.current.width = videoDimensions.width; // 캔버스 너비를 비디오 너비로 설정
          canvasRef.current.height = videoDimensions.height; // 캔버스 높이를 비디오 높이로 설정
          const ctx = canvasRef.current.getContext("2d"); // 캔버스에서 2D 렌더링 컨텍스트 가져오기
          ctx.translate(canvasRef.current.width, 0);
          ctx.scale(-1, 1);
          userpose.startRender(webcamRef.current, ctx); // 사용자 포즈 렌더링 시작 (스켈레톤 그리기)
        } else {
          // 감지기가 로드되어 있지 않을 경우 로딩
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
    };
    tf.setBackend("webgpu").then(main);

    return () => {
      userpose.stopRender(videoDimensions.width, videoDimensions.height);
    };
  }, [
    props,
    props.streamManager,
    showCanvas,
    videoDimensions.width,
    videoDimensions.height,
  ]);

  useEffect(() => {
    if (0.5 <= nowScore && nowScore < 0.7) {
      setGreat(true);
      setTimeout(() => {
        setGreat(false);
      }, 2000);
    } else if (nowScore >= 0.7) {
      setAwesome(true);
      setTimeout(() => {
        setAwesome(false);
      }, 2000);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [totalScore]);

  const getNicknameTag = () => {
    if (props.streamManager && props.streamManager.stream && props.streamManager.stream.connection) {
      return JSON.parse(props.streamManager.stream.connection.data).clientData;
    }
  };

  return (
    <div>
      {props.streamManager !== undefined && !props.gameStatus ? (
        <div className="stream-component">
          <canvas
            ref={canvasRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "fill",
              zIndex: "2",
            }}
          ></canvas>
          <video
            autoPlay={true}
            ref={webcamRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          />
          <div className="name-tag">
            <p id="name">{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}

      {props.streamManager !== undefined && props.gameStatus ? (
        <div className="game-stream">
          <canvas
            ref={canvasRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
            style={{
              position: "absolute",
              top: "0",
              left: "0",
              width: "100%",
              height: "100%",
              objectFit: "fill",
              zIndex: "2",
            }}
          ></canvas>
          <video
            autoPlay={true}
            ref={webcamRef}
            width={videoDimensions.width}
            height={videoDimensions.height}
          />
          <div className="name-tag">
            <p id="name">{getNicknameTag()}</p>
          </div>
          
          {great ? (
            <img
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                width: "50%",
                height: "50%",
                zIndex: "1",
              }}
              src={superStar}
              alt="great"
            />
          ) : null}
          {awesome ? (
            <img
              style={{
                position: "absolute",
                bottom: 0,
                right: 0,
                width: "50%",
                height: "50%",
                zIndex: "1",
              }}
              src={winner}
              alt="awesome"
            />
          ) : null}
        </div>
      ) : null}
    </div>
  );
};

export default MainVideoComponent;
