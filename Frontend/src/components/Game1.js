import React, { useState, useEffect, useRef } from "react";
import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";
import axios from "axios";

import NarangNorangIntro from "../assets/game/narangnorang_intro.mp4";
import Gorilla from "../assets/game/Gorilla.mp4";
import Elephant from "../assets/game/Elephant.mp4";
import Eagle from "../assets/game/Eagle.mp4";
import Frog from "../assets/game/Frog.mp4";
import Cat from "../assets/game/Cat.mp4";
import Tiger from "../assets/game/Tiger.mp4";
import Wow1 from "../assets/game/Wow1.mp4";
import Wow2 from "../assets/game/Wow2.mp4";
import outro from "../assets/game/outro.mp4";

import html2canvas from "html2canvas";

import { useSelector, useDispatch } from "react-redux";
import { handleCapture, handleGetScore, setNowScore, setTotalScore, switchGameEnded } from "../slice/gameSlice";

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
  object-fit: cover;
`;

axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function Game1(props) {
  const { session } = props;
  const webcamRef = useSelector((state) => state.game.webcamRef);

  const gameStart = props.gameStart;

  const [introOpen, setIntroOpen] = useState(false);
  const [gameVideoStart, setGameVideoStart] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    Wow1,
    Gorilla,
    Wow2,
    Elephant,
    Wow1,
    Eagle,
    Wow2,
    Frog,
    Wow1,
    Cat,
    Wow2,
    Tiger,
    outro,
  ];

  const gameRef = useRef(null); // 게임 비디오 참조

  const dispatch = useDispatch();

  const roomCode = props.streamManager.stream.session.sessionId;
  const participantId = props.streamManager.stream.connection.connectionId;
  const [scoreSum, setScoreSum] = useState(0);

  const capture = async () => {
    if (webcamRef) {
      try {
        const canvas = await html2canvas(webcamRef, { scale: 2 });
        dispatch(handleCapture(webcamRef, canvas, roomCode, participantId));
      } catch (error) {
        console.error(error);
      }
    }
  };

  const getScore = async () => {
    try {
      // gameRef가 유효한 경우에만 비디오의 너비와 높이 얻기 시도
      if (gameRef.current) {
        const gameVideoElement = gameRef.current;
        const videoWidth = gameVideoElement.videoWidth;
        const videoHeight = gameVideoElement.videoHeight;
        gameVideoElement.width = videoWidth; // 원하는 너비 값으로 변경
        gameVideoElement.height = videoHeight; // 원하는 높이 값으로 변경

        // 비디오가 로드되지 않은 경우 함수 종료
        if (!videoWidth || !videoHeight) {
          console.log(
            "비디오가 로드되지 않았거나 올바르지 않은 크기의 비디오입니다."
          );
          return;
        }
        const score = dispatch(handleGetScore(gameVideoElement, webcamRef));

        return score;
      }
    } catch (error) {
    }
  };

  const handleGameStartClick = () => {
    setScoreSum(0);
    setIntroOpen(true);
  };

  useEffect(() => {
    if (gameStart) {
      handleGameStartClick();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (session) {
      const handleSignal = (event) => {
        if (event.type === "startGame") {
          setGameVideoStart(true);
        }
      };
      session.on("signal", handleSignal);
      return () => {
        session.off("signal", handleSignal);
      };
    }

  }, [session]);

  // 비디오가 재생 중일 때마다 1초 간격으로 getScore 함수를 호출하고 그 점수를 합산
  useEffect(() => {
    const interval = setInterval(() => {
      if (gameRef.current) {
        getScore().then((score) => {
          dispatch(setNowScore(score));
          dispatch(setTotalScore(score))
          setScoreSum((prevScore) => prevScore + score);
        });
      }
    }, 2000); 

    return () => {
      clearInterval(interval); // 컴포넌트가 언마운트되면 interval을 정리
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentVideoIndex, gameRef]);

  const handleVideoEnded = async () => {
    if (currentVideoIndex === videos.length - 2) {
      await axios({
        method: "PUT",
        url: "/participant/update",
        data: { participantId, roomCode, score: scoreSum },
      })
        .then(() => {
        })
        .catch((err) => {
          console.log(err);
        });
    }

    if (currentVideoIndex < videos.length - 1) {
      await capture();
      const score = await getScore(currentVideoIndex);
      dispatch(setNowScore(score));
      dispatch(setTotalScore(score));
      setCurrentVideoIndex(currentVideoIndex + 1);
    } else {
      setGameVideoStart(false); // 게임 비디오 재생을 종료
      // 여기에서 방 점수 넘기고, 게임 종료 상태 만들기
        dispatch(switchGameEnded());
    }
  };

  const handleIntroEnded = () => {
    setIntroOpen(false);
    setGameVideoStart(true);
  };

  return (
    <div>
      {gameVideoStart && (
        <div style={{ width: "100%", height: "63vh" }}>
          <GameVideo
            ref={gameRef} // 게임 비디오 참조
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
