import React, { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import { useSelector } from "react-redux";
// import audioOnIcon from "../assets/icon/audioOn.png";
import audioOffIcon from "../assets/icon/audioOff.png";

const UserVideoComponent = (props) => {
  
  const getNicknameTag = () => {
    if (props.streamManager && props.streamManager.stream && props.streamManager.stream.connection) {
      return JSON.parse(props.streamManager.stream.connection.data).clientData;
    }
  };

  const streamManager = props.streamManager;
  const audioStatus = streamManager ? streamManager.stream.audioActive : null;
  const guest = props.guest;
  const isSpeaking = props.isSpeaking;
  const render = useSelector((state) => state.game.renderBool);
  const gameStatus = props.gameStatus;

  useEffect(() => {
    console.log(props.streamManager);

    

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [render]);

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          {!guest && !audioStatus ? (
            <img className="audio-icon" src={audioOffIcon} alt="audioOff" />
          ) : null}
          <OpenViduVideoComponent
            streamManager={streamManager}
            guest={guest}
            gameStatus={gameStatus}
            isSpeaking={isSpeaking}
          ></OpenViduVideoComponent>
          <div className="name-tag">
            <p id="name">{getNicknameTag()}</p>
          </div>
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
