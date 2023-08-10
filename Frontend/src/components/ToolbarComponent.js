import React, { useState } from 'react';

// import AppBar from '@material-ui/core/AppBar';
// import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
// import Fullscreen from '@material-ui/icons/Fullscreen';
// import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import IconButton from '@material-ui/core/IconButton';

const ToolbarComponent = (props) => {
  const [audioOn, setAudioOn] = useState(true)
  const [videoOn, setVideoOn] = useState(true)

  const micStatusChanged = () => {
    props.micStatusChanged();
    setAudioOn(!props.audioOn)
  }

  const camStatusChanged = () => {
    props.camStatusChanged();
    setVideoOn(!props.videoOn)
  }

  // const toggleFullscreen = () => {
  //     setState({ fullscreen: !this.state.fullscreen });
  //     props.toggleFullscreen();
  // }

  const leaveSession = () => {
      props.leaveSession();
  }

    
return (
  <div className="toolbar-container">
    <div className="buttonsContent">
      <IconButton color="inherit" className="navButton" id="navMicButton" onClick={micStatusChanged}>
        { audioOn ? <Mic /> : <MicOff color="secondary" />}
      </IconButton>

      <IconButton color="inherit" className="navButton" id="navCamButton" onClick={camStatusChanged}>
      { videoOn ? (
          <Videocam />
          ) : (
            <VideocamOff color="secondary" />
          )}
      </IconButton>

      {/* <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
        {publisher !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
      </IconButton> */}
      <IconButton color="secondary" className="navButton" onClick={leaveSession} id="navLeaveButton">
        <PowerSettingsNew />
      </IconButton>
    </div>
  </div>


    // <AppBar className="toolbar">
    //   <Toolbar className="toolbar">
    //       {/* <div id="navSessionInfo">
    //           <img
    //               id="header_img"
    //               alt="OpenVidu Logo"
    //               src={logo}
    //           />

    //           {this.props.sessionId && <div id="titleContent">
    //               <span id="session-title">{mySessionId}</span>
    //           </div>}
    //       </div> */}

    //     <div className="buttonsContent">
    //       <IconButton color="inherit" className="navButton" id="navMicButton" onClick={micStatusChanged}>
    //         { audioOn ? <Mic /> : <MicOff color="secondary" />}
    //       </IconButton>

    //       <IconButton color="inherit" className="navButton" id="navCamButton" onClick={camStatusChanged}>
    //       { videoOn ? (
    //           <Videocam />
    //           ) : (
    //             <VideocamOff color="secondary" />
    //           )}
    //       </IconButton>

    //       {/* <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
    //           {publisher !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
    //       </IconButton> */}
    //       <IconButton color="secondary" className="navButton" onClick={leaveSession} id="navLeaveButton">
    //         <PowerSettingsNew />
    //       </IconButton>
    //     </div>
    //   </Toolbar>
    // </AppBar>
  );
}


export default ToolbarComponent;