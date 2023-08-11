import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from 'styled-components';
import { useSelector } from "react-redux";

// component
import UserVideoComponent from "../components/UserVideoComponent";
import MainVideoComponent from "../components/MainVideoComponent";
import ToolbarComponent from "../components/ToolbarComponent";
import Game1 from "../components/Game1";
import "./CustomRoom.css";

// icon
import videoOnIcon from "../assets/icon/videoOn.png";
import videoOffIcon from "../assets/icon/videoOff.png";
import audioOnIcon from "../assets/icon/audioOn.png";
import audioOffIcon from "../assets/icon/audioOff.png";

import Dialog from "@material-ui/core/Dialog";
import DialogContent from "@mui/material/DialogContent";
import NarangNorangIntro from "../assets/game/narangnorang_intro.mp4";

// import Gorilla from '../assets/game/quiz/Gorilla.png';
// import Elephant from '../assets/game/quiz/Elephant.png';
// import Eagle from '../assets/game/quiz/Eagle.png';
// import Frog from '../assets/game/quiz/Frog.png';
// import Cat from '../assets/game/quiz/Cat.png';
// import Tiger from '../assets/game/quiz/Tiger.png';
// import StartMusic from '../assets/game/music/StartMusic.mp3';
// import UUUU from '../assets/game/music/UUUU.wav';
// import GorillaMusic from '../assets/game/music/GorillaMusic.wav';
// import ElephantMusic from '../assets/game/music/ElephantMusic.wav';
// import GorillaElephantMix from '../assets/game/music/GorillaElephantMix.wav';
// import EagleMusic from '../assets/game/music/EagleMusic.wav';
// import FrogMusic from '../assets/game/music/FrogMusic.wav';
// import EagleFrogMix from '../assets/game/music/EagleFrogMix.wav';
// import CatMusic from '../assets/game/music/CatMusic.wav';
// import TigerMusic from '../assets/game/music/TigerMusic.wav';

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
  const nicknameFromUrl = urlParams.get("nickname");
  const navigate = useNavigate()

  const [sessionId, setSessionId] = useState(sessionIdFromUrl)
  const [myUserName, setMyUserName] = useState(nicknameFromUrl)
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [videoOn, setVideoOn] = useState(undefined)
  const [audioOn, setAudioOn] = useState(undefined)
  const [join, setJoin] = useState(false)
  const [gameStart, setGameStart] = useState(false)  

  // const myUserNameFromUrl = urlParams.get("nickname");

  const hostNickname = useSelector((state) => state.login.userNickname)


  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);
    // url 확인
    joinSession();

    // 나가기
    return () => {
      window.removeEventListener("beforeunload", onbeforeunload);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
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
        closeIntroModal()

      }, 16800)
    })
    if (nicknameFromUrl === null) {
      setMyUserName(hostNickname)
    }

    try {
      const token = await getToken(sessionId); 

      if (hostNickname !== null) {
        await mySession.connect(token, { clientData: hostNickname });
      } else {
        await mySession.connect(token, { clientData: myUserName });
      }

      console.log(mySession, "여기")
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
    <div style={{backgroundColor: "#F1F0F0"}}>
      <div style={{display: "flex", flexFlow: "column-reverse wrap", alignContent: "center"}}>
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
                  <UserVideoComponent streamManager={mainStreamManager} guest={sessionId} />
                  <div id="buttongroup">
                    { !videoOn ?
                      (<div style={{margin:"5px"}} onClick={camStatusChanged}>
                        <img src={videoOnIcon} alt="videoOn"/>
                      </div>) :
                      (<div style={{margin:"5px"}} onClick={camStatusChanged}>
                        <img src={videoOffIcon} alt="videoOff"/>
                      </div>)}
                    { !audioOn ?
                      (<div style={{margin:"5px"}} onClick={micStatusChanged}>
                        <img src={audioOnIcon} alt="audioOn"/>
                      </div>) :
                      (<div style={{margin:"5px"}} onClick={micStatusChanged}>
                        <img src={audioOffIcon} alt="audioOff"/>
                      </div>)}
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
        {mainStreamManager !== undefined && join === true ? (
          <div id="main-video" className="col-md-6">
            <MainVideoComponent streamManager={mainStreamManager} />
          </div>
        ) : null}
        <div id="video-container" className="col-md-6">
          { join === true && publisher !== undefined ? (
            <div
              className="stream-container"
              onClick={() => handleMainVideoStream(publisher)}
            >
              <UserVideoComponent streamManager={publisher} />
            </div>
          ) : null}

          { join === true ? (
            <div style={{ display: "flex", flexDirection: "row"}}>
              {subscribers.map((sub, i) => (
                <div
                  key={sub.id}
                  className="stream-container"
                  onClick={() => handleMainVideoStream(sub)}
                >
                  <span>{sub.id}</span>
                  <UserVideoComponent streamManager={sub} />
                </div>
              ))}
            </div>
          ) : null}
        </div>
      </div>

      {sessionIdFromUrl === null || join === true ? (
        <div>
          <Game1 />
          <div style={{ position: "fixed", bottom: "0", display: "flex", zIndex: "3" }}>
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
    </div>
  );
}

export default CustomRoom;
