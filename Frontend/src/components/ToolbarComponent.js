import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { switchShowCanvas, switchGameStart, switchGameStuatus, setStretchingId } from "../slice/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import { handleCapture } from "../slice/gameSlice";
import html2canvas from "html2canvas";
import "./Toolbar.css";
import GameTab from "./GameTab";

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
import cameraIcon from "../assets/icon/camera.png";

import Dialog from "@material-ui/core/Dialog";


const ToolbarComponent = (props) => {
  const [audioOn, setAudioOn] = useState(props.audioOn);
  const [videoOn, setVideoOn] = useState(props.videoOn);
  const dispatch = useDispatch();

  const webcamRef = useSelector((state) => state.game.webcamRef)
  const showCanvas = useSelector((state) => state.game.showCanvas);


  // 초대링크 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 복사성공 모달
  const [copyShow, setCopyShow] = useState(false);
  const handleCopyClose = () => setCopyShow(false);
  const handleCopySuccess = () => setCopyShow(true);

  // 게임 선택 모달
  const [gameSelect, SetGameSelect] = useState(false);
  const handleGameSelect = () => {
    SetGameSelect(!gameSelect);
  };

  const mySessionId = props.sessionId;
  const inviteLink = `https://i9c208.p.ssafy.io/waiting/${mySessionId}`

  const micStatusChanged = () => {
    props.micStatusChanged();
    setAudioOn(!props.audioOn);
  };

  const camStatusChanged = () => {
    props.camStatusChanged();
    setVideoOn(!props.videoOn);
  };

  const gameStatusChanged = () => {
    dispatch(switchGameStart());
    dispatch(switchGameStuatus(props.sessionId))
    SetGameSelect(false);
  };

  const setStretchingStatus = (videoId) => {
    dispatch(setStretchingId(videoId))
    SetGameSelect(false);
  }

  // const toggleFullscreen = () => {
  //     setState({ fullscreen: !this.state.fullscreen });
  //     props.toggleFullscreen();
  // }

  const leaveSession = () => {
    props.leaveSession();
  };

  const handleCamera = async() => {
    if (webcamRef) {
      try {
        const canvas = await html2canvas(webcamRef, { scale: 2 });
        const roomCode = props.sessionId;
        const subscriberId = props.publisher.stream.connection.connectionId;

        dispatch(
          handleCapture(webcamRef, canvas, roomCode, subscriberId)
        );
      } catch (error) {
        console.error("캡쳐 실패", error);
      }
    }
  }

  const clickShowCanvas = () => {
    dispatch(switchShowCanvas());
  };

  // 복사
  const handleCopyClipBoard = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      handleClose();
      handleCopySuccess();
      setTimeout(() => {
        handleCopyClose();
      }, 500);
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div className="toolbar-container">
      <div className="iconGroup">
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-video">
              {!videoOn ? "카메라켜짐" : "카메라꺼짐"}
            </Tooltip>
          }
        >
          <div onClick={camStatusChanged}>
            <img
              src={!videoOn ? videoOnIcon : videoOffIcon}
              alt={!videoOn ? "videoOn" : "videoOff"}
              className="icon"
            />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-audio">
              {!audioOn ? "마이크켜짐" : "마이크꺼짐"}
            </Tooltip>
          }
        >
          <div onClick={micStatusChanged}>
            <img
              src={!audioOn ? audioOnIcon : audioOffIcon}
              alt={!audioOn ? "audioOn" : "audioOff"}
              className="icon"
            />
          </div>
        </OverlayTrigger>
        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-invite">초대링크</Tooltip>}
        >
          <div onClick={handleShow}>
            <img src={inviteIcon} alt="invite" className="icon" />
          </div>
        </OverlayTrigger>

        <div onClick={handleGameSelect} id="gameStartBtn">
          <div>게임시작</div>
        </div>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-camera">사진찍기</Tooltip>}
        >
          <div onClick={handleCamera}>
            <img src={cameraIcon} alt="camera" className="icon" />
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={
            <Tooltip id="tooltip-xray">
              {!showCanvas ? "엑스레이모드" : "기본모드"}
            </Tooltip>
          }
        >
          <div onClick={clickShowCanvas}>
            <img
              src={!showCanvas ? xrayIcon : noXrayIcon}
              alt={!showCanvas ? "noXray" : "xray"}
              className="icon"
            />
          </div>
        </OverlayTrigger>

        <OverlayTrigger
          placement="top"
          overlay={<Tooltip id="tooltip-leave">방나가기</Tooltip>}
        >
          <div onClick={leaveSession}>
            <img src={leaveIcon} alt="leave" className="icon" />
          </div>
        </OverlayTrigger>
      </div>

      {/* 초대링크 모달 */}
      <Modal
        show={show}
        onHide={handleClose}
        style={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
            방이 생성되었습니다
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Pretendard-bold" }}>
          <div>
            <div style={{ paddingBottom: "15px" }}>
              같이 게임을 즐기고 싶은 사용자와 이 링크를 공유하세요
            </div>
            <div id="linkContainer">
              <span onClick={() => handleCopyClipBoard(inviteLink)}>
                {inviteLink}
              </span>
              <span onClick={() => handleCopyClipBoard(inviteLink)}>
                <img src={copyIcon} alt="copy" style={{ width: "15px" }} />
              </span>
            </div>
          </div>
      </Modal.Body>
    </Modal>

    {/* 복사성공 모달 */}
    <Modal show={copyShow} onHide={handleCopyClose}>
      <Modal.Body className='modalbody'>
        <div>링크가 복사되었습니다</div>
      </Modal.Body>
    </Modal>

    <Dialog
        fullWidth
        maxWidth={"lg"}
        open={gameSelect}
        onClose={() => handleGameSelect()}
        aria-labelledby="form-dialog-title"
        style={{fontFamily: "Happiness-Sans-Bold"}}
      >
      <GameTab gameStatusChanged={gameStatusChanged} setStretchingStatus={setStretchingStatus}/>
    </Dialog>

    </div>
  );
};

export default ToolbarComponent;