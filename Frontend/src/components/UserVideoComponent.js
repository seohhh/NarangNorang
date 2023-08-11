import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

const UserVideoComponent = (props) => {
  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(props.streamManager.stream.connection.data).clientData;
  // };

  const streamManager = props.streamManager;
  const guest = props.guest;
  const isSpeaking = props.isSpeaking;

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} guest={guest} isSpeaking={isSpeaking} />
          {/* <div><p>{getNicknameTag()}</p></div> */}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
