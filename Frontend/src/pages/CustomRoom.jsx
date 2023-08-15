import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { switchRenderBool } from '../slice/gameSlice';

// component
import UserVideoComponent from "../components/UserVideoComponent";
import MainVideoComponent from "../components/MainVideoComponent";
import ToolbarComponent from "../components/ToolbarComponent";
import Game1 from "../components/Game1";
import "./CustomRoom.css";
import Rank from "../components/Rank";

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

const APPLICATION_SERVER_URL = "https://i9c208.p.ssafy.io/";

const IntroMp4 = styled.video`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

const ContentDialog = styled(DialogContent)`
  height: 750px;
`;

function CustomRoom(props) {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const nicknameFromUrl = urlParams.get("nickname");
  const navigate = useNavigate();

  const [sessionId, setSessionId] = useState(sessionIdFromUrl);
  const [myUserName, setMyUserName] = useState(nicknameFromUrl);
  const [session, setSession] = useState(undefined);
  const [mainStreamManager, setMainStreamManager] = useState(undefined);
  const [publisher, setPublisher] = useState(undefined);
  const [subscribers, setSubscribers] = useState([]);
  const [videoOn, setVideoOn] = useState(undefined);
  const [audioOn, setAudioOn] = useState(undefined);
  const [join, setJoin] = useState(false);
  const [gameStart, setGameStart] = useState(false);
  const [rank, setRank] = useState(false);
  const [connectionId, setConnectionId] = useState("")
  const dispatch = useDispatch()
  

  // const myUserNameFromUrl = urlParams.get("nickname");

  const hostNickname = useSelector((state) => state.login.userNickname);
  const hostSeq = useSelector((state) => state.login.userSeq)
  const checkStatus = useSelector((state) => state.game.gameStart);
  const [gameStatus, setGameStatus] = useState(false)

  useEffect(() => {
    window.addEventListener("beforeunload", preventClose);
    // url 확인
    joinSession();

    // 나가기
    return () => {
      window.removeEventListener("beforeunload", preventClose);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const preventClose = (e) => {
    e.preventDefault();
    e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
    window.location.href=`https://i9c208.p.ssafy.io/exit?sessionId=${sessionId}&subscriberId=${connectionId}`
  }

  useEffect(() => {
    if (session) {
      session.signal({
        data: gameStatus,
        to: [],
        type: "gameStatus"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkStatus])


  const onbeforeunload = (event) => {   
    leaveSession();
  };

  const joinSession = async () => {
    const OV = new OpenVidu();

    const mySession = OV.initSession();
    setSession(mySession);

    mySession.on("streamCreated", (event) => {
      
      const subscriber = mySession.subscribe(event.stream, undefined);
      console.log(subscriber)
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    // mySession.on("publisherStartSpeaking", (event) => {
    //   console.log("User " + event.connection.connectionId + " start speaking");
    //   setIsSpeaking(true);
    // });

    // mySession.on("publisherStopSpeaking", (event) => {
    //   console.log("User " + event.connection.connectionId + " stop speaking");
    //   setIsSpeaking(false);
    // });

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
      }, 16800);
    });

    mySession.on("signal:rank", (event) => {
      setRank(true);

      setTimeout(() => {
        closeRankModal();
      }, 16800);
    });

    mySession.on("signal:render", (event) => {
      dispatch(switchRenderBool())
    })

    mySession.on("signal:gameStatus", (event) => {
      if (event.data === "") {
        setGameStatus(true)
      } else  {
        setGameStatus(false)
      }
      
    })
  

    if (nicknameFromUrl === null) {
      setMyUserName(hostNickname);
    }

    try {
      const token = await getToken(sessionId);

      if (hostNickname !== null) {
        await mySession.connect(token, { clientData: hostNickname });
      } else {
        await mySession.connect(token, { clientData: myUserName });
      }

      setConnectionId(mySession.connection.connectionId)

      console.log(mySession, "여기");

      await axios.post(APPLICATION_SERVER_URL + "api/v1/participant/save",
      {
        "participantId": mySession.connection.connectionId,
        "roomCode": mySession.sessionId,
        "score": 0
      })
      console.log("참여자 정보 저장")

      await axios.put(APPLICATION_SERVER_URL + "api/v1/room/update/plus/" + mySession.sessionId)
      console.log("방인원 추가")

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
  };

  const getToken = async (mySessionId) => {
    console.log(mySessionId, "마이 세션아이디");
    if (mySessionId === null) {
      const createSessionId = await createSession(mySessionId);
      setSessionId(createSessionId);

      await axios.post(APPLICATION_SERVER_URL + "api/v1/room/save", {
        "roomCode": createSessionId,
        "hostName": hostNickname,
        "hostSeq": hostSeq
      })
      console.log("방생성")

      return await createToken(createSessionId);
    }
    return await createToken(mySessionId);
  };

  const createSession = async (sessionId) => {
    const response = await axios.post(
      APPLICATION_SERVER_URL + "api/v1/sessions",
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
      APPLICATION_SERVER_URL + "api/v1/sessions/" + sessionId + "/connections",
      {},
      {
        headers: {
          "Content-Type": "application/json",
          "Access-Control-Allow-Origin": "*",
        },
      }
    );

    return response.data; // The token
  };

  const leaveSession = async () => {
    const mySession = session;

    console.log(publisher);
    console.log(mySession);
    console.log("participantId : " + connectionId)
    console.log("roomCode : " + sessionId)
    axios.post(APPLICATION_SERVER_URL + "api/v1/participant/delete", {
      "participantId": connectionId,
      "roomCode": sessionId
    })
    console.log("참여자 정보 삭제")
    axios.put(APPLICATION_SERVER_URL + "api/v1/room/update/minus/" + sessionId)
    console.log("방인원 삭제")
    

    if (mySession) {
      mySession.disconnect();
    }

    setSession(undefined);
    setSubscribers([]);
    setSessionId("");
    setMyUserName("");
    setMainStreamManager(undefined);
    setPublisher(undefined);

    // navigate(`/`);
    navigate(
      `/exit?sessionId=${sessionId}&subscriberId=${publisher.stream.connection.connectionId}`
    );
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
      console.log(publisher.properties);
    }
  };

  const micStatusChanged = () => {
    setAudioOn(!audioOn);

    if (publisher) {
      publisher.publishAudio(audioOn);
      console.log(publisher.properties);
    }

    session.signal({
      data: "렌더링",
      to: [],
      type: "render",
    })
  };

  const deleteSubscriber = async(streamManager) => {
    // let removedSubscribers = subscribers;
    // let index = removedSubscribers.indexOf(streamManager, 0);
    // if (index > -1) {
    //   removedSubscribers.splice(index, 1);
    //   setSubscribers(removedSubscribers);
    // }

    axios.post(APPLICATION_SERVER_URL + "api/v1/participant/delete", {
      "participantId": streamManager.stream.connection.connectionId,
      "roomCode": streamManager.stream.session.sessionId
    })
    .then((res) => {
      console.log("참여자 정보 삭제")
      if (res.data) {
        axios.put(APPLICATION_SERVER_URL + "api/v1/room/update/minus/" + streamManager.stream.session.sessionId)
        console.log("방인원 삭제")
      }
    })

    console.log("나간 사람")
    console.log(streamManager)

    console.log("streamManager.connection.connectionId : "  + streamManager.stream.connection.connectionId)

    

    setSubscribers((prevSubscribers) =>
      prevSubscribers.filter((sub) => sub !== streamManager)
    );
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

  const displayRank = () => {
    session
      .signal({
        data: "순위 버튼",
        to: [],
        type: "rank",
      })
      .then(() => {})
      .catch(() => {});
  };

  const closeIntroModal = () => {
    setGameStart(false);
  };

  const closeRankModal = () => {
    setRank(false);
  };

  return (
    <div className="CustomRoomRoot" style={{ backgroundColor: "#F1F0F0" }}>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={gameStart}
        onClose={() => closeIntroModal()}
        aria-labelledby="form-dialog-title"
      >
        <ContentDialog>
          <IntroMp4 src={NarangNorangIntro} autoPlay></IntroMp4>
        </ContentDialog>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={rank}
        onClose={() => closeRankModal()}
        aria-labelledby="form-dialog-title"
      >
        <ContentDialog>
          <Rank first={mainStreamManager} second={null} third={null} />
        </ContentDialog>
      </Dialog>

      {/* 초대링크로 접속한 경우: 입장 대기실 */}
      {sessionIdFromUrl != null && join === false ? (
        <div id="wrapper">
          <div id="container">
            <h3 style={{ marginBottom: "20px" }}> 입장 대기실 </h3>
            <div id="content">
              <div style={{ width: "35rem", position: "relative" }}>
                {/* 입장 대기실 화면 크기 props.guest 여부로 확인 */}
                <UserVideoComponent
                  streamManager={mainStreamManager}
                  guest={sessionIdFromUrl}
                />
                <div id="buttongroup">
                  {!videoOn ? (
                    <div style={{ margin: "5px" }} onClick={camStatusChanged}>
                      <img src={videoOnIcon} alt="videoOn" />
                    </div>
                  ) : (
                    <div style={{ margin: "5px" }} onClick={camStatusChanged}>
                      <img src={videoOffIcon} alt="videoOff" />
                    </div>
                  )}
                  {!audioOn ? (
                    <div style={{ margin: "5px" }} onClick={micStatusChanged}>
                      <img src={audioOnIcon} alt="audioOn" />
                    </div>
                  ) : (
                    <div style={{ margin: "5px" }} onClick={micStatusChanged}>
                      <img src={audioOffIcon} alt="audioOff" />
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

     {/* 게임 중 */}
     {gameStatus ? (
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
          }}
        >
          {join === true && (
            <div
              id="video-container"
              style={{
                height: "10%",
                display: "flex",
                flexFlow: "row-wrap",
                justifyContent: "center",
              }}
            >
              <div onClick={() => handleMainVideoStream(publisher)}>
                <UserVideoComponent
                  streamManager={publisher}
                  gameStatus={gameStatus}
                />
              </div>
              {subscribers.map((sub, i) => (
                <div key={sub.id} onClick={() => handleMainVideoStream(sub)}>
                  <span>{sub.id}</span>
                  <UserVideoComponent
                    streamManager={sub}
                    gameStatus={gameStatus}
                  />
                </div>
              ))}
            </div>
          )}
          <div
            style={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
            className="row"
          >
            <div id="main-video" className="col-5">
              <div>
                <div className="game-stream">
                  <Game1 streamManager={publisher} gameStart={gameStatus}></Game1>
                </div>
              </div>
            </div>
            {mainStreamManager !== undefined && join === true ? (
              <div id="main-video" className="col-5">
                <MainVideoComponent
                  streamManager={mainStreamManager}
                  gameStatus={gameStatus}
                />
              </div>
            ) : null}
          </div>
        </div>
      ) : (
        // 방에 모여있을 때
        <div
          style={{
            display: "flex",
            flexFlow: "row wrap",
            justifyContent: "space-evenly",
            alignItems: "center" }}
          className="row"
        >
          {mainStreamManager !== undefined && join === true ? (
            <div style={{padding:"0px"}} id="main-video" className="col-5">
              <MainVideoComponent streamManager={mainStreamManager} />
            </div>
          ) : null}
          <div style={{padding:"0px"}} id="video-container" className="col-6">
            {join === true && (
              <div style={{ display: "flex", flexFlow: "row wrap", justifyContent: "space-evenly" }} className="row">
                <div onClick={() => handleMainVideoStream(publisher)} className="col-4">
                  <UserVideoComponent streamManager={publisher} />
                </div>
                {subscribers.map((sub, i) => (
                  <div key={sub.id} onClick={() => handleMainVideoStream(sub)} className="col-4">
                    {/* <span>{sub.id}</span> */}
                    <UserVideoComponent streamManager={sub} />
                  </div>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
{/* 
      {sessionIdFromUrl === null && join === true ?
        <Game1 streamManager={publisher} /> : null} */}
      {sessionIdFromUrl === null || join === true ? (
        <div>
          <div
            style={{
              position: "fixed",
              bottom: "0",
              display: "flex",
              zIndex: "3",
            }}
          >
            <ToolbarComponent
              audioOn={audioOn}
              videoOn={videoOn}
              sessionId={sessionId}
              camStatusChanged={camStatusChanged}
              micStatusChanged={micStatusChanged}
              leaveSession={leaveSession}
              publisher={publisher}
              guest={sessionIdFromUrl}
            />
          </div>
          <button onClick={displayEvery}>버튼</button>
          <button onClick={displayRank}>랭크컴포넌트</button>
        </div>
      ) : null}
    </div>
  );
}

export default CustomRoom;
