import React, { useState, useRef } from 'react';
import gamemusic1 from '../assets/music/gamemusic1.mp3'; // 음악 파일 경로
import { CountdownCircleTimer } from 'react-countdown-circle-timer';
import styled from 'styled-components';

const StyledButton = styled.button`
  background-color: #ff9800;
  color: white;
  font-size: 16px;
  border: none;
  border-radius: 50px;
  padding: 10px 20px;
  cursor: pointer;

  &:hover {
    background-color: #f57c00;
  }
`;

const Game = () => {
  const [isMusicPlaying, setMusicPlaying] = useState(false);
  const [showCountdown, setShowCountdown] = useState(false);
  const musicRef = useRef(null);

  const handleStartMusic = () => {
    console.log("handleStartMusic is called!");
    if (!isMusicPlaying) {
      setMusicPlaying(true);
      setShowCountdown(false);
      musicRef.current.currentTime = 0;
      musicRef.current.play();
    }
  };

  const handleStopMusic = () => {
    console.log("handleStopMusic is called!");
    if (isMusicPlaying) {
      setMusicPlaying(false);
      musicRef.current.pause();
    }
  };

  const handleMusicEnded = () => {
    console.log("handleMusicEnded is called!");
    setShowCountdown(true);
    setMusicPlaying(false);
  };

  const renderTime = (remainingTime) => {
    
    return (
      <div className="timer">
        <div className="value" style={{ fontSize: '40px' }}>
          {remainingTime}
        </div>
      </div>
    );
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', height: 'auto' }}>
      <div style={{ position: 'relative', top: '300px' }}>
        {showCountdown && (
          <div style={{ position: 'absolute', top: '50%', left: '50%', transform: 'translate(-50%, -50%)' }}>
            <CountdownCircleTimer
              isPlaying
              duration={5}
              colors={[['#ff9800', 0.33], ['#F7B801', 0.33], ['#A30000']]}
              onComplete={() => setShowCountdown(false)}
              renderTime={renderTime}
            />
          </div>
        )}
        <video
          style={{ width: '100%', height: 'auto' }}
          autoPlay
          muted
          playsInline
          onEnded={handleMusicEnded}

        />
      </div>
      <div style={{ marginTop: '2px' }}>
        {!isMusicPlaying && <StyledButton onClick={handleStartMusic}>게임시작</StyledButton>}
        {isMusicPlaying && <StyledButton onClick={handleStopMusic}>정지</StyledButton>}
      </div>
      <audio ref={musicRef} src={gamemusic1} />
    </div>
  );
};

export default Game;
