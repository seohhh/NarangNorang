import React from 'react';
import OpenViduVideoComponent from './OvVideo';
import './UserVideo.css';

const UserVideoComponent = (props) => {
  // const getNicknameTag = () => {
  //   // Gets the nickName of the user
  //   return JSON.parse(props.streamManager.stream.connection.data).clientData;
  // };

  const streamManager = props.streamManager;
  console.log(streamManager, "확인차");

  return (
    <div>
      {streamManager !== undefined ? (
        <div className="streamcomponent">
          <OpenViduVideoComponent streamManager={streamManager} />
          {/* <div><p>{getNicknameTag()}</p></div> */}
        </div>
      ) : null}
    </div>
  );
};

export default UserVideoComponent;
