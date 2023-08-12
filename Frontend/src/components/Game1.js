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
import { div } from "@tensorflow/tfjs-core";


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

function Game1({ session, showGameVideo }) {
  const [introOpen, setIntroOpen] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [currentVideoIndex, setCurrentVideoIndex] = useState(0);

  const videos = [
    Gorilla,
    Elephant,
    Eagle,
    Frog,
    Cat,
    Tiger,
  ];

  const handleGameStartClick = () => {
    setIntroOpen(true);
  };

  useEffect(() => {
    if (session) {
      const handleSignal = (event) => {
        console.log("세션 Received signal event:", event); // 콘솔 로깅 추가
        if (event.type === "startGame") {
          setGameStart(true);
        }
      };

      session.on("signal", handleSignal);
      return () => {
        session.off("signal", handleSignal);
      };
    }
  }, [session]);

  const handleIntroEnded = () => {
    setIntroOpen(false);
    setGameStart(true);
  };

  const handleVideoEnded = () => {
    if (currentVideoIndex < videos.length - 1) {
      setCurrentVideoIndex(currentVideoIndex + 1);
    }
  };

  return (
    <div>
      {!gameStart && (
        <div>
          <button onClick={() => handleGameStartClick()}>게임 시작</button>
        </div>
      )}
      {showGameVideo && gameStart && (
        <div>
          <GameVideo
            src={videos[currentVideoIndex]}
            autoPlay
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