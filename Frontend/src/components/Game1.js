import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";

import NarangNorangIntro from "../assets/game/narangnorang_intro.mp4";
import Gorilla from "../assets/game/Gorilla.mp4";
import Elephant from "../assets/game/Elephant.mp4";
import Eagle from "../assets/game/Eagle.mp4";
import Frog from "../assets/game/Frog.mp4";
import Cat from "../assets/game/Cat.mp4";
import Tiger from "../assets/game/Tiger.mp4";

import html2canvas from "html2canvas";

import { useSelector, useDispatch } from "react-redux";
import { handleCapture, handleGetScore } from "../slice/gameSlice";

// 나랑노랑 인트로
const IntroMp4 = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

// 모달 크기
const IntroDialogContent = styled(DialogContent)`
  height: 700px;
`;

// 게임영상 크기
const GameVideo = styled.video`
  width: 100%;
  height: 100%;
`;


function Game1(props) {
  const { session } = props;
  const webcamRef = useSelector((state) => state.game.webcamRef)
  console.log(webcamRef, "useSelector로 game1에서 받은 값")

  const gameStart = props.gameStart;

  const [introOpen, setIntroOpen] = useState(false);
  const [gameVideoStart, setGameVideoStart] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);


  const videos = [Gorilla, Elephant, Eagle, Frog, Cat, Tiger];


  const gameRef = useRef(null); // 게임 비디오 참조

  
  const dispatch = useDispatch();


  const roomCode = props.streamManager.stream.session.sessionId;
  const subscriberId = props.streamManager.stream.connection.connectionId;
  // let scoreSum = 0;
  const [scoreSum, setScoreSum] = useState(0);



  const capture = async () => {
    if (webcamRef) {
      console.log("videoRef.current:",webcamRef )
      try {
        const canvas = await html2canvas(webcamRef, { scale: 2 });
        console.log("캡쳐 시작");
        dispatch(
          handleCapture(webcamRef, canvas, roomCode, subscriberId)
        );
        console.log("캡쳐 성공");
      } catch (error) {
        console.error("캡쳐 실패:", error);
      }
    }
  };

  const getScore = async (poseIdx) => {
    try {
      console.log("webcamRef", webcamRef);
      // 웹캠에서 사용자 포즈 감지
      if (webcamRef) {
        // const detectedPose = await userpose.detectPose(webcamRef.current);
        // const score = userpose.getScore(poseIdx, webcamRef.current)
        // const score = POSE.compare(detectedPose, currentVideoIndex); // 정답 코드와 사용자 포즈 비교

        // 비교 결과를 바탕으로 점수 계산 및 저장
        const score = dispatch(handleGetScore(poseIdx, webcamRef));
        console.log("점수 계산 완료");
        // console.log("점수는?", score);
        return score;
      }
    } catch (error) {
      console.log(error, "점수계산 에러");
    }
  };

  // const getScore = () => {
  //   if (videoRef.current) dispatch(handleGetScore(videoRef.current));
  // };

  const handleGameStartClick = () => {
    setScoreSum(0);
    console.log("handleGameStart", scoreSum);
    setIntroOpen(true);
  };
  
  useEffect(() => {
    if (gameStart) {
      handleGameStartClick();
    }
  }, []);

  useEffect(() => {
    if (session) {
      const handleSignal = (event) => {
        console.log("세션 Received signal event:", event);
        if (event.type === "startGame") {
          setGameVideoStart(true);
        }
      };

      session.on("signal", handleSignal);
      return () => {
        session.off("signal", handleSignal);
      };
    }

    // console.log("props", props);
  }, [session]);


  // 비디오가 재생 중일 때마다 1초 간격으로 getScore 함수를 호출하고 그 점수를 합산
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameRef.current) {
        getScore(currentVideoIndex).then(score => {
          setScoreSum(prevScore => prevScore + score);
        });
      }
    }, 1000); // 1초마다 호출
  
    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트되면 interval을 정리
    };
  }, [currentVideoIndex, gameRef]);

  const handleVideoEnded = async () => {
    if (currentVideoIndex < videos.length - 1) {
      await capture();
      setTimeout(() => {
        setCurrentVideoIndex(currentVideoIndex + 1);
      }, 3000);
    } else {
      setGameVideoStart(false); // 게임 비디오 재생을 종료
      // 여기에서 랭크로 넘어가기!!
    }
  };

  const handleIntroEnded = () => {
    setIntroOpen(false);
    setGameVideoStart(true);
  };

  // const handleVideoEnded = async () => {
  //   if (currentVideoIndex < videos.length - 1) {
  //     await capture();
  //     const score = await getScore(currentVideoIndex);
  //     setScoreSum(prevScore => prevScore + score); // 점수를 더해 상태 업데이트
  //     console.log("handleVideoEnded", scoreSum, score);
  //     setTimeout(() => {
  //       setCurrentVideoIndex(currentVideoIndex + 1);
  //     }, 3000);
  //   }
  //   else{
  //     setGameVideoStart(false); // 게임 비디오 재생을 종료
  //     // 여기에서 랭크로 넘어가기!!
  //   }
  // };



  return (
    <div>
      <div>점수 합계: {scoreSum}</div>
      {/* {!gameStart && (
        <div>
          <button onClick={() => handleGameStartClick()}>게임 시작</button>
        </div>
      )} */}

      {gameVideoStart && (
        <div>
          <GameVideo
            ref={gameRef}// 게임 비디오 참조
            src={videos[currentVideoIndex]}
            autoPlay
            crossOrigin="anonymous"
            onEnded={handleVideoEnded}
          ></GameVideo>

        </div>
      )}

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={introOpen}
        onClose={() => handleIntroEnded()}
        aria-labelledby="form-dialog-title"
      >
        <IntroDialogContent>
          <IntroMp4
            src={NarangNorangIntro}
            autoPlay
            onEnded={handleIntroEnded}
          ></IntroMp4>
        </IntroDialogContent>
      </Dialog>
    </div>
  );
}

export default Game1;