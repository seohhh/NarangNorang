import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";

// component
import UserVideoComponent from "../components/UserVideoComponent";
import MainVideoComponent from "../components/MainVideoComponent";
import ToolbarComponent from "../components/ToolbarComponent";
import Game1 from "../components/Game1";
import "./CustomRoom.css";

// icon
import videoOn from "../assets/icon/videoOn.png";
import videoOff from "../assets/icon/videoOff.png";
import audioOn from "../assets/icon/audioOn.png";
import audioOff from "../assets/icon/audioOff.png";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NarangNorangIntro from "../assets/game/narangnorang_intro.mp4";

// import { div } from "@tensorflow/tfjs-core";
// import { div } from "@tensorflow/tfjs-core";
// import { StaticRegexReplace } from "@tensorflow/tfjs-core";

const APPLICATION_SERVER_URL = "http://3.36.126.169:8080/";

const IntroMp4 = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const IntroDialogContent = styled(DialogContent)`
  height: 700px;
`;

function CustomRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(sessionIdFromUrl);
  const [myUserName, setMyUserName] = useState("");
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [videoOn, setVideoOn] = useState(undefined);
  const [audioOn, setAudioOn] = useState(undefined);
  const [join, setJoin] = useState(false);
  const [gameStart, setGameStart] = useState(false);

  // const myUserNameFromUrl = urlParams.get("nickname");

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);

    const urlParams = new URLSearchParams(window.location.search);
    // const sessionIdFromUrl = urlParams.get("sessionId");
    const myUserNameFromUrl = urlParams.get("nickname");

    // url 확인
    setMyUserName(myUserNameFromUrl);
    joinSession();

    // 나가기
    return () => {
      console.log("나간다", window);
      window.removeEventListener("beforeunload", onbeforeunload);
    };
  }, []);

  const onbeforeunload = (event) => {
    leaveSession();
  };

  const joinSession = async () => {
    const OV = new OpenVidu();

    const mySession = OV.initSession();
    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on("streamDestroyed", (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on("exception", (exception) => {
      console.warn(exception);
    });

    mySession.on("signal:intro", (event) => {
      setGameStart(true);

      setTimeout(() => {
        closeIntroModal();
      }, 16500);
    });

    try {
      const token = await getToken(sessionId);
      await mySession.connect(token, { clientData: myUserName });
      console.log(mySession, "여기");
      let newpublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: "640x480",
        frameRate: 30,
        insertMode: "APPEND",
        mirror: true,
      });
      if (sessionIdFromUrl === null) {
        mySession.publish(newpublisher);
        setJoin(true);
      }

      setVideoOn(false);
      setAudioOn(false);
      setMainStreamManager(newpublisher);
      setPublisher(newpublisher);
      console.log(newpublisher, "newpublisher");
    } catch (error) {
      console.log(
        "There was an error connecting to the session:",
        error.code,
        error.message
      );
    }
  };

  const guestJoinSession = (e) => {
    e.preventDefault();

    session.publish(publisher);

    setJoin(true);
    // // Obtain the current video device in use
    // this.state.OV.getDevices()
    //   .then((devices) => {
    //     console.log(devices);

    //     var videoDevices = devices.filter(
    //       (device) => device.kind === "videoinput"
    //     );
    //     var currentVideoDeviceId = publisher.stream
    //       .getMediaStream()
    //       .getVideoTracks()[0]
    //       .getSettings().deviceId;
    //     var currentVideoDevice = videoDevices.find(
    //       (device) => device.deviceId === currentVideoDeviceId
    //     );
    //     this.setState({
    //       currentVideoDevice: currentVideoDevice,
    //     });

    //     console.log(videoDevices);
    //   })
    //   .catch((error) => {
    //     console.error("에러 발생:", error);
    //   });
  };

  const getToken = async (mySessionId) => {
    console.log(mySessionId, "마이 세션아이디");
    if (mySessionId === null) {
      const createSessionId = await createSession(mySessionId);
      setSessionId(createSessionId)
      return await createToken(createSessionId);
    }
    return await createToken(mySessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions",
      { customSessionId: sessionId },
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    return response.data; // The sessionId
  };

  const createToken = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );
    console.log(response.data, "크리에이트토큰");
    return response.data; // The token
  };

  const leaveSession = () => {
    const mySession = session;

    if (mySession) {
      mySession.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setSessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);

    navigate("/");
  };

  const camStatusChanged = () => {
    if (videoOn) {
      setVideoOn(false);
    } else {
      setVideoOn(true);
    }
    // setVideoOn(!videoOn);

    if (publisher) {
      publisher.publishVideo(videoOn);
    }
  };

  const micStatusChanged = () => {
    setAudioOn(!audioOn);

    if (publisher) {
      publisher.publishAudio(audioOn);
    }
  };

  const deleteSubscriber = (streamManager) => {
    let removedSubscribers = subscribers;
    let index = removedSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      removedSubscribers.splice(index, 1);
      setSubscribers(removedSubscribers);
    }
  };

  // main 화면 변경
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  };

  const displayEvery = () => {
    session
      .signal({
        data: "인트로 영상 버튼",
        to: [],
        type: "intro",
      })
      .then(() => {})
      .catch(() => {});
  };

  const closeIntroModal = () => {
    setGameStart(false);
  };

  return (
    <div style={{display: "flex",
                  flexFlow: "column-reverse wrap",
                  alignContent: "center",
                  backgroundColor: "#F1F0F0" }}>
      {sessionIdFromUrl === null || join === true ? (
        <div>
          <Game1 />
          <div style={{ position: "fixed", bottom: "0", display: "flex" }}>
            <ToolbarComponent
              audioOn={audioOn}
              videoOn={videoOn}
              sessionId={sessionId}
              camStatusChanged={camStatusChanged}
              micStatusChanged={micStatusChanged}
              leaveSession={leaveSession}
              publisher={publisher}
            />
          </div>
          <button onClick={displayEvery}>버튼</button>
        </div>
      ) : null}

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={gameStart}
        onClose={() => closeIntroModal()}
        aria-labelledby="form-dialog-title"
      >
        <IntroDialogContent>
          <IntroMp4 src={NarangNorangIntro} autoPlay></IntroMp4>
        </IntroDialogContent>
      </Dialog>

      {/* 초대링크로 접속한 경우: 입장 대기실 */}
      {sessionIdFromUrl != null && join === false ? (
        <div id="wrapper">
          <div id="container">
            <h3 style={{ marginBottom: "20px" }}> 입장 대기실 </h3>
            <div id="content">
              <div style={{ width: "35rem", position: "relative" }}>
                <UserVideoComponent streamManager={mainStreamManager} />
                <div id="buttongroup">
                  {!videoOn ? (
                    <div onClick={camStatusChanged}>
                      <img src={videoOn} alt="videoOn" />
                    </div>
                  ) : (
                    <div onClick={camStatusChanged}>
                      <img src={videoOff} alt="videoOff" />
                    </div>
                  )}
                  {!audioOn ? (
                    <div onClick={micStatusChanged}>
                      <img src={audioOn} alt="audioOn" />
                    </div>
                  ) : (
                    <div onClick={micStatusChanged}>
                      <img src={audioOff} alt="audioOff" />
                    </div>
                  )}
                </div>
              </div>
              <div style={{ width: "40vw" }} className="center">
                <div className="center">
                  <p style={{ fontSize: "30px" }}>참여할 준비가 되셨나요?</p>
                  <div id="button">
                    <input
                      type="button"
                      className="button"
                      onClick={guestJoinSession}
                      value="입장하기"
                    />
                    <input
                      className="button"
                      type="button"
                      onClick={leaveSession}
                      value="홈으로 가기"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      ) : null}

      {/* {session !== undefined ? (
        <div id="session">
          <div id="session-header">
            <h1 id="session-title">{sessionId}</h1>
            <input
              className="btn btn-large btn-danger"
              type="button"
              id="buttonLeaveSession"
              onClick={leaveSession}
              value="leave"
            />
          </div>
        </div>
        ) : null } */}

      {mainStreamManager !== undefined && join === true ? (
        <div id="main-video" className="col-md-6">
          <MainVideoComponent streamManager={mainStreamManager} />
        </div>
      ) : null}
      <div id="video-container" className="col-md-6">
        {publisher !== undefined ? (
          <div
            className="stream-container"
            onClick={() => this.handleMainVideoStream(publisher)}
          >
            {/* <UserVideoComponent streamManager={publisher} /> */}
          </div>
        ) : null}

        {sessionIdFromUrl === null || join === true ? (
          <div>
            {subscribers.map((sub, i) => (
              <div
                key={sub.id}
                className="stream-container"
                onClick={() => handleMainVideoStream(sub)}
              >
                <span>{sub.id}</span>
                {/* <UserVideoComponent streamManager={sub} /> */}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default CustomRoom;
