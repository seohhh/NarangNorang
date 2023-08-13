import React, { useEffect } from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';
import { useSelector } from 'react-redux';

const UserVideoComponent = (props) => {
  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(props.streamManager.stream.connection.data).clientData;
  // };

  const streamManager = props.streamManager;
  const guest = props.guest;
  const isSpeaking = props.isSpeaking;
  const render = useSelector((state) => state.game.renderBool)
  
  useEffect(() => {
    console.log(props.streamManager)
  }, [render])

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} guest={guest} isSpeaking={isSpeaking} />
          {/* <div><p>{getNicknameTag()}</p></div> */}
            {streamManager.stream.audioActive ? (
              <div>
              마이크 켜졌다.
            </div>
            ) : (
              <div>
                마이크 꺼졌다.
              </div>
            )}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
