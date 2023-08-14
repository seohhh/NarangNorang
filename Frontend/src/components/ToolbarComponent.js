import React, { useState } from "react";
import { Modal } from "react-bootstrap";
import { switchShowCanvas, switchGameStart } from "../slice/gameSlice";
import { useSelector, useDispatch } from "react-redux";
import { Tooltip, OverlayTrigger } from "react-bootstrap";
import "./Toolbar.css";

// icone
import inviteIcon from "../assets/icon/invite.png";
import leaveIcon from "../assets/icon/leave.png";
import xrayIcon from "../assets/icon/xray.png";
import copyIcon from "../assets/icon/copy.png";
import videoOnIcon from "../assets/icon/videoOn.png";
import videoOffIcon from "../assets/icon/videoOff.png";
import audioOnIcon from "../assets/icon/audioOn.png";
import audioOffIcon from "../assets/icon/audioOff.png";
import noXrayIcon from "../assets/icon/noXray.png";
import gamestartIcon from "../assets/icon/gamestart.png";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@mui/material/DialogContent";
import styled from "styled-components";

import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";

import { Card, Button } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import stopImage from "../assets/contents/stop.png";
import tryImage from "../assets/contents/try.png";

const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCard = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
`;

const ContentDialog = styled(DialogContent)`
  height: 750px;
`;

const ToolbarComponent = (props) => {
  const [audioOn, setAudioOn] = useState(props.audioOn);
  const [videoOn, setVideoOn] = useState(props.videoOn);
  const dispatch = useDispatch();

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
    setGameKey("game");
  };
  const [gameKey, setGameKey] = useState("game");

  const mySessionId = props.sessionId;
  const inviteLink = `https://i9c208.p.ssafy.io/waiting/${mySessionId}`

  const guest = props.guest;

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
    SetGameSelect(false);
  };

  // const toggleFullscreen = () => {
  //     setState({ fullscreen: !this.state.fullscreen });
  //     props.toggleFullscreen();
  // }

  const leaveSession = () => {
    props.leaveSession();
  };

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
        {/* 방장인 경우 게임스타트 버튼 */}
        {!guest && (
          <OverlayTrigger
            placement="top"
            overlay={<Tooltip id="tooltip-gamestart">게임시작</Tooltip>}
          >
            <div onClick={handleGameSelect}>
              <img src={gamestartIcon} alt="gamestart" className="icon" />
            </div>
          </OverlayTrigger>
        )}
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
      >
        <ContentDialog>
          <Tabs
            id="controlled-tab-example"
            activeKey={gameKey}
            onSelect={(k) => setGameKey(k)}
            className="mb-3"
          >
            <Tab eventKey="game" title="Game">
              <div>날따라해봐요 썸네일</div>

              <MyDiv>
                <Fade cascade damping={0.2}>
                  <MyCard>
                    <div>
                      <Card
                        style={{
                          width: "24rem",
                          height: "30rem",
                          margin: "3rem",
                        }}
                      >
                        <Card.Img variant="top" src={tryImage} />
                        <Card.Body>
                          <Card.Title style={{ margin: "1rem" }}>
                            날 따라해봐요
                          </Card.Title>
                          <Card.Text style={{ margin: "1rem" }}>
                            술래의 자세를 따라해보세요. 잘 따라 한다면 좋은
                            결과를 받을 수 있을 거에요.
                          </Card.Text>

                          <div
                            className="btn btn-warning"
                            style={{ position: "absolute" }}
                            onClick={gameStatusChanged}
                          >
                            동물따라해봐요 시작!
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                    <div>
                      <Card
                        style={{
                          width: "24rem",
                          height: "30rem",
                          margin: "3rem",
                        }}
                      >
                        <Card.Img variant="top" src={stopImage} />
                        <Card.Body>
                          <Card.Title style={{ margin: "1rem" }}>
                            그대로 멈춰라
                          </Card.Title>
                          <Card.Text style={{ margin: "1rem" }}>
                            노래에 맞춰 멈춰라!! 노래가 다시 시작되기 전까지
                            움직이지 않는다면 좋은 결과를 받을 수 있을 거에요.
                          </Card.Text>

                          <div
                            className="btn btn-warning"
                            style={{ position: "absolute" }}
                            onClick={gameStatusChanged}
                          >
                            대왕모기 잡자 시작!
                          </div>
                        </Card.Body>
                      </Card>
                    </div>
                  </MyCard>
                </Fade>
              </MyDiv>
            </Tab>
            <Tab eventKey="stretching" title="Stretching">
              <p>다함께 따라해봐요 어린이 체조!</p>
              <div className="d-flex">
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/etlOSulXA_8"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
                <iframe
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/sYvmTUNGqPs"
                  title="YouTube video player"
                  frameborder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowfullscreen
                ></iframe>
              </div>
            </Tab>
          </Tabs>
        </ContentDialog>
      </Dialog>
    </div>
  );
};

export default ToolbarComponent;