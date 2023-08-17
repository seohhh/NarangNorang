import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { switchGameEnded, switchGameStuatus, switchRenderBool } from '../slice/gameSlice';

// component
import UserVideoComponent from "../components/UserVideoComponent";
import MainVideoComponent from "../components/MainVideoComponent";
import ToolbarComponent from "../components/ToolbarComponent";
import Stretching from "../components/Stretching";
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

import gameBackgourndImg from "../assets/gamebackground2.jpg";

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
  const [stretchingStart, setStretchingStart] = useState(false);
  const [connectionId, setConnectionId] = useState("")
  const dispatch = useDispatch()

  const [first, setFirst] = useState(null);
  const [second, setSecond] = useState(null);
  const [third, setThird] = useState(null);

  // const myUserNameFromUrl = urlParams.get("nickname");

  const hostNickname = useSelector((state) => state.login.userNickname);
  const hostSeq = useSelector((state) => state.login.userSeq)

  const checkStatus = useSelector((state) => state.game.gameStart);
  // const scoreRlt = useSelector((state) => state.game.scoreRlt);
  const gameEnded = useSelector((state) => state.game.gameEnded);

  const [gameStatus, setGameStatus] = useState(false)
  const [scoreRlt, setScoreRlt] = useState([])

  const checkVideoId = useSelector((state) => state.game.videoId)
  // const [stretchingStatus, setStretchingStatus] = useState(false)
  const [videoId, setVideoId] = useState(null)


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

  // const preventClose = (e) => {
  //   e.preventDefault();
  //   e.returnValue = ""; // chrome에서는 설정이 필요해서 넣은 코드
  //   window.location.href=`https://i9c208.p.ssafy.io/exit?sessionId=${sessionId}&subscriberId=${connectionId}`
  // }

  useEffect(() => {
    if (session) {
      session.signal({
        data: gameStatus,
        to: [],
        type: "gameStatus"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkStatus]);

  useEffect(() => {
    if (scoreRlt && session && sessionId) {

      const Ranker = []
      console.log(scoreRlt, "스코어rlt");
      console.log(session);



      scoreRlt.forEach((connectionId) => {
        session.streamManagers.forEach((streamManager) => {
          if (streamManager.stream && streamManager.stream.session && streamManager.stream.session.connection && streamManager.stream.session.connection.connectionId === connectionId) {
            Ranker.push(streamManager);
          }
        })
      })
      console.log(Ranker, "여기 랭커!!");
      if (Ranker.length === 1) {
        setFirst(Ranker[0]);
      } else if (Ranker.length === 2 ) {
        setFirst(Ranker[0]);
        setSecond(Ranker[1]);
      } else if (Ranker.length === 3) {
        setFirst(Ranker[0]);
        setSecond(Ranker[1]);
        setThird(Ranker[2]);
      }

      setRank(true);

      setTimeout(() => {
        closeRankModal();
      }, 16800);

      console.log("게임 끝!!!@!@!!@!@@121!@!@!@!@$!#@%#$^%!@#$%&*")
      dispatch(switchGameEnded())
      dispatch(switchGameStuatus(sessionId))

    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scoreRlt])

  useEffect(() => {
    if (gameEnded && session) {
      axios({
        method: 'GET',
        url: `/participant/room/${session.sessionId}`
      }).then((res) => {
        setScoreRlt(res.data);
      }).catch((err) => {
        console.log(err);
      })

      console.log(scoreRlt, "점수데이터!!!!!!")
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [gameEnded])


  useEffect(() => {
    if (session && checkVideoId!==null) {
      session.signal({
        data: checkVideoId.toString(),
        to: [],
        type: "stretchingStatus"
      })
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [checkVideoId])


  const onbeforeunload = (event) => {
    leaveSession();
  };

  const joinSession = async () => {
    const OV = new OpenVidu();

    const mySession = OV.initSession();
    setSession(mySession);
    console.log(session);

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

    mySession.on("signal:rankRegist", (event) => {
      const Ranker = []
      console.log(scoreRlt, "스코어rlt");
      console.log(session);



      scoreRlt.forEach((connectionId) => {
        session.streamManagers.forEach((streamManager) => {
          if (streamManager.stream && streamManager.stream.session && streamManager.stream.session.connection && streamManager.stream.session.connection.connectionId === connectionId) {
            Ranker.push(streamManager);
          }
        })
      })
      console.log(Ranker, "여기 랭커!!");
      if (Ranker.length === 1) {
        setFirst(Ranker[0]);
      } else if (Ranker.length === 2 ) {
        setFirst(Ranker[0]);
        setSecond(Ranker[1]);
      } else if (Ranker.length === 3) {
        setFirst(Ranker[0]);
        setSecond(Ranker[1]);
        setThird(Ranker[2]);
      }
    })

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

    mySession.on("signal:stretchingStatus", (event) => {
      if (event.data) {
        setVideoId(event.data)
        setStretchingStart(true)
      }
    })

    mySession.on("signal:rankData", (event) => {
      setScoreRlt(scoreRlt)
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

      console.log(mySession, "여기");

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
    if (publisher && publisher.stream && publisher.stream.connection && publisher.stream.connection.connectionId) {
      navigate(
        `/exit?sessionId=${sessionId}&subscriberId=${publisher.stream.connection.connectionId}`
      );
    } else {
      navigate('/')
    }
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

  const deleteSubscriber = (streamManager) => {

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


  const closeIntroModal = () => {
    setGameStart(false);
  };

  const closeRankModal = () => {
    setRank(false);
  };

  const closeStretcingModal = () => {
    setStretchingStart(false);
  };

  return (
    <div style={{ backgroundColor: "#F1F0F0", overflow: "hidden", height: "100vh" }}>
      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={gameStart}
        onClose={() => closeIntroModal()}
        aria-labelledby="form-dialog-title"
        disableBackdropClick
      >
        <ContentDialog>
          <IntroMp4 src={NarangNorangIntro} autoPlay></IntroMp4>
        </ContentDialog>
      </Dialog>

      <Dialog
        fullWidth
        maxWidth={"lg"}
        open={stretchingStart}
        onClose={() => closeStretcingModal()}
        aria-labelledby="form-dialog-title"
      >
        <ContentDialog>
          <Stretching videoId={videoId}></Stretching>
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
          <Rank first={first} second={second} third={third} />
        </ContentDialog>
      </Dialog>

      {/* 초대링크로 접속한 경우: 입장 대기실 */}
      {sessionIdFromUrl != null && join === false ? (
        <div className="wrapper">
          <div id="container">
            <h2 style={{ marginBottom: "20px" }}> 입장 대기실 </h2>
            <div id="content">
              <div style={{ width: "35rem", position: "relative" }}>
                {/* 입장 대기실 화면 크기 props.guest 여부로 확인 */}
                <UserVideoComponent
                  streamManager={mainStreamManager}
                  guest={sessionIdFromUrl}
                />
                <div id="buttongroup">
                  {!videoOn ? (
                    <div onClick={camStatusChanged}>
                      <img src={videoOnIcon} alt="videoOn" style={{ margin: "8px", width: "53px" }}/>
                    </div>
                  ) : (
                    <div onClick={camStatusChanged}>
                      <img src={videoOffIcon} alt="videoOff" style={{ margin: "8px", width: "53px" }}/>
                    </div>
                  )}
                  {!audioOn ? (
                    <div onClick={micStatusChanged}>
                      <img src={audioOnIcon} alt="audioOn" style={{ margin: "8px", width: "53px" }}/>
                    </div>
                  ) : (
                    <div onClick={micStatusChanged}>
                      <img src={audioOffIcon} alt="audioOff" style={{ margin: "8px", width: "53px" }}/>
                    </div>
                  )}
                </div>
              </div>
              <div style={{ width: "40vw" }} className="center">
                <div className="center">
                  <p style={{ fontSize: "30px" }}>참여할 준비가 되셨나요?</p>
                  <div>
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
            marginTop: "1%",
          }}
        >
          <img src={gameBackgourndImg} alt="" style={{width: "100%", height: "100%", position: "absolute", top: "0px", left:"0px"}} />
          {join === true && (
            <div
              id="video-container"
              style={{
                height: "20%",
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
              maxHeight: "100%",
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
            alignItems: "center",
            marginTop: "13vh"
           }}
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
                {/* {mainStreamManager !== publisher ? ( */}
                  <div onClick={() => handleMainVideoStream(publisher)} className="col-4">
                    <UserVideoComponent streamManager={publisher} />
                  </div>
                {/* ): null} */}

                {subscribers.map((sub, i) => (
                  // <div>
                  // {mainStreamManager !== sub ? (
                    <div key={sub.id} onClick={() => handleMainVideoStream(sub)} className="col-4">
                      {/* <span>{sub.id}</span> */}
                      <UserVideoComponent streamManager={sub} />
                    </div>
                  // ): null}
                  // </div>
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
              gameStatus={gameStatus}
            />
          </div>
        </div>
      ) : null}
    </div>
  );
}

export default CustomRoom;
