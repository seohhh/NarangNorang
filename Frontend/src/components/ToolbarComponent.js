import React, { useState } from 'react';
// import Fullscreen from '@material-ui/icons/Fullscreen';
// import FullscreenExit from '@material-ui/icons/FullscreenExit';
// import PowerSettingsNew from '@material-ui/icons/PowerSettingsNew';
import { Modal } from "react-bootstrap";
import './Toolbar.css';
import { switchShowCanvas } from "../slice/xraySlice";
import { useSelector, useDispatch } from "react-redux";


// import { div, exp } from '@tensorflow/tfjs-core';

// icon
import inviteIcon from "../assets/icon/invite.png";
import leaveIcon from "../assets/icon/leave.png";
import xrayIcon from "../assets/icon/xray.png";
import copyIcon from "../assets/icon/copy.png";
import videoOnIcon from "../assets/icon/videoOn.png";
import videoOffIcon from "../assets/icon/videoOff.png";
import audioOnIcon from "../assets/icon/audioOn.png";
import audioOffIcon from "../assets/icon/audioOff.png";
import noXrayIcon from "../assets/icon/noXray.png";


const ToolbarComponent = (props) => {
  const [audioOn, setAudioOn] = useState(props.audioOn)
  const [videoOn, setVideoOn] = useState(props.videoOn)
  const dispatch = useDispatch()

  const showCanvas = useSelector((state) => (state.xray.showCanvas))
  console.log(showCanvas, "useSelector로 확인한 값")
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

  const clickShowCanvas = () => {
    dispatch(switchShowCanvas())
  }

  // 복사
  const handleCopyClipBoard = async (text) => {
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
    <div className="iconGroup">
      { !videoOn ?
        (<div onClick={camStatusChanged}>
          <img src={videoOnIcon} alt="videoOn" className="icon" />
        </div>) :
        (<div onClick={camStatusChanged}>
          <img src={videoOffIcon} alt="videoOff" className="icon" />
        </div>)}
      { !audioOn ?
        (<div onClick={micStatusChanged}>
          <img src={audioOnIcon} alt="audioOn" className="icon" />
        </div>) :
        (<div onClick={micStatusChanged}>
          <img src={audioOffIcon} alt="audioOff" className="icon" />
        </div>)}
      <div onClick={handleShow}>
        <img src={inviteIcon} alt="invite" className="icon" />
      </div>
      { !showCanvas ?
        (<div onClick={clickShowCanvas}>
          <img src={xrayIcon} alt="noXray" className="icon" />
        </div>) :
        (<div onClick={clickShowCanvas}>
          <img src={noXrayIcon} alt="xray" className="icon" />
        </div>)}
      <div onClick={leaveSession}>
        <img src={leaveIcon} alt="leave" className="icon" />
      </div>
    </div>

    {/* 초대링크 모달 */}
    <Modal show={show} onHide={handleClose} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
      <Modal.Header closeButton>
        <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
          방이 생성되었습니다</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{ fontFamily: "Pretendard-bold" }}>
        <div>
          <div style={{ paddingBottom: "15px" }}>같이 게임을 즐기고 싶은 사용자와 이 링크를 공유하세요</div>
          <div id="linkContainer">
            <span onClick={() => handleCopyClipBoard(inviteLink)}>{inviteLink}</span>
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
