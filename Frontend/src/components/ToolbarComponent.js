import React, { useState } from 'react';
import Mic from '@material-ui/icons/Mic';
import MicOff from '@material-ui/icons/MicOff';
import Videocam from '@material-ui/icons/Videocam';
import VideocamOff from '@material-ui/icons/VideocamOff';
// import Fullscreen from '@material-ui/icons/Fullscreen';
// import FullscreenExit from '@material-ui/icons/FullscreenExit';
// import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { Modal } from "react-bootstrap";
import './Toolbar.css';

import IconButton from '@material-ui/core/IconButton';
import copyIcon from '../assets/icon/copy.png';
// import { div, exp } from '@tensorflow/tfjs-core';

// icon
import inviteIcon from '../assets/icon/invite.png';
import leaveIcon from '../assets/icon/leave.png';
import xrayIcon from '../assets/icon/xray.png';


const ToolbarComponent = (props) => {
  const [audioOn, setAudioOn] = useState(props.audioOn)
  const [videoOn, setVideoOn] = useState(props.videoOn)
  
  // 초대링크 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 복사성공 모달
  const [copyShow, setCopyShow] = useState(false);
  const handleCopyClose = () => setCopyShow(false);
  const handleCopySuccess = () => setCopyShow(true);

  // 방 나가기 모달(사진 선택)

  const mySessionId = props.sessionId;
  const inviteLink = `http://localhost:3000/waiting/${mySessionId}`

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


  // 복사
  const handleCopyClipBoard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      handleClose()
      handleCopySuccess()
      setTimeout(() => {
        handleCopyClose();
      }, 500);
    } catch (error) {
      console.log(error)
    }
  };
  
return (
  <div className="toolbar-container">
    <IconButton color="inherit" className="navButton" id="navMicButton" onClick={micStatusChanged}>
      { !audioOn ? <Mic /> : <MicOff color="secondary" />}
    </IconButton>

    <IconButton color="inherit" className="navButton" id="navCamButton" onClick={camStatusChanged}>
    { !videoOn ? (
        <Videocam />
        ) : (
          <VideocamOff color="secondary" />
        )}
    </IconButton>
    <div onClick={handleShow}>
      <img src={inviteIcon} alt="invite" />
    </div>
    {/* <div onClick={}>
      <img src={xrayIcon} alt="xray" />
    </div> */}
    <div onClick={leaveSession}>
      <img src={leaveIcon} alt="leave" />
    </div>
    {/* <IconButton color="inherit" className="navButton" onClick={this.toggleFullscreen}>
      {publisher !== undefined && this.state.fullscreen ? <FullscreenExit /> : <Fullscreen />}
    </IconButton> */}

    {/* 초대링크 모달 */}
    <Modal show={show} onHide={handleClose} style={{ padding: "50px" }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
          방이 생성되었습니다</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "Pretendard-bold" }}>
        <div>
          <div style={{ paddingBottom: "15px" }}>같이 게임을 즐기고 싶은 사용자와 이 링크를 공유하세요</div>
          <div id="linkContainer">
            <span>{inviteLink}</span>
            <span onClick={() => handleCopyClipBoard(inviteLink)}>
              <img src={copyIcon} alt="copy" style={{ width: "15px" }} /></span>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    {/* 복사성공 모달 */}
    <Modal show={copyShow} onHide={handleCopyClose}>
      <Modal.Body>
        <p>링크가 복사되었습니다</p>
      </Modal.Body>
    </Modal>
  </div>

  );
}


export default ToolbarComponent;