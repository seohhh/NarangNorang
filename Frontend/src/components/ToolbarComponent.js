import React, { Component } from 'react';

import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';

import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
// import Fullscreen from '@material-ui/icons/Fullscreen';
// import FullscreenExit from '@material-ui/icons/FullscreenExit';
import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';

import IconButton from '@material-ui/core/IconButton';

export default class ToolbarComponent extends Component {
  constructor(props) {
      super(props)

    this.state = {
        audioOn : true,
        videoOn : true,
    }
      this.camStatusChanged = this.camStatusChanged.bind(this);
      this.micStatusChanged = this.micStatusChanged.bind(this);
    //   this.toggleFullscreen = this.toggleFullscreen.bind(this);
      this.leaveSession = this.leaveSession.bind(this);
    console.log(this.state)
  }

  componentDidUpdate() {
    // console.log(this.props)
  }

  micStatusChanged() {
      this.props.micStatusChanged();
      this.setState({
        audioOn: !this.props.audioOn
      });
  }

  camStatusChanged() {
      this.props.camStatusChanged();
      this.setState({
        videoOn: !this.props.videoOn
      });
  }

  toggleFullscreen() {
      this.setState({ fullscreen: !this.state.fullscreen });
      this.props.toggleFullscreen();
  }

  leaveSession() {
      this.props.leaveSession();
  }

  render() {
    
      return (
          <AppBar className="toolbar" id="header">
              <Toolbar className="toolbar">
                  {/* <div id="navSessionInfo">
                      <img
                          id="header_img"
                          alt="OpenVidu Logo"
                          src={logo}
                      />

                      {this.props.sessionId && <div id="titleContent">
                          <span id="session-title">{mySessionId}</span>
                      </div>}
                  </div> */}

                  <div className="buttonsContent">
                      <IconButton color="inherit" className="navButton" id="navMicButton" onClick={this.micStatusChanged}>
                          { this.state.audioOn ? <Mic /> : <MicOff color="secondary" />}
                      </IconButton>

                      <IconButton color="inherit" className="navButton" id="navCamButton" onClick={this.camStatusChanged}>
                          { this.state.videoOn ? (
                              <Videocam />
                          ) : (
                              <VideocamOff color="secondary" />
                          )}
                      </IconButton>

                      {/* <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
                          {publisher !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
                      </IconButton> */}
                      <IconButton color="secondary" className="navButton" onClick={this.leaveSession} id="navLeaveButton">
                          <PowerSettingsNew />
                      </IconButton>
                  </div>
              </Toolbar>
          </AppBar>
      );
  }
}
