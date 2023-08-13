import React, { useEffect } from "react";
import OpenViduVideoComponent from "./OvVideo";
import "./UserVideo.css";
import { useSelector } from "react-redux";
import audioOnIcon from "../assets/icon/audioOn.png";
import audioOffIcon from "../assets/icon/audioOff.png";

const UserVideoComponent = (props) => {
  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(props.streamManager.stream.connection.data).clientData;
  // };

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
          {!guest && audioStatus ? (
            <img
              style={{
                width: "35px",
                height: "35px",
                position: "absolute",
                zIndex: "3",
                margin: "5px",
              }}
              src={audioOnIcon}
              alt="audioOn"
            />
          ) : null}
          {!guest && !audioStatus ? (
            <img
              style={{
                width: "35px",
                height: "35px",
                position: "absolute",
                zIndex: "3",
                margin: "5px",
              }}
              src={audioOffIcon}
              alt="audioOff"
            />
          ) : null}
          <OpenViduVideoComponent
            streamManager={streamManager}
            guest={guest}
            gameStatus={gameStatus}
            isSpeaking={isSpeaking}
          />
          {/* <div><p>{getNicknameTag()}</p></div> */}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
