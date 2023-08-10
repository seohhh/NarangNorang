import { OpenVidu } from "openvidu-browser";
import axios from "axios";
import React, { useState, useEffect } from "react";
import UserVideoComponent from "../components/UserVideoComponent";
import MainVideoComponent from "../components/MainVideoComponent";
import ToolbarComponent from "../components/ToolbarComponent";
import Game1 from "../components/Game1";
import "./CustomRoom.css";
// import { div } from "@tensorflow/tfjs-core";
// import { StaticRegexReplace } from "@tensorflow/tfjs-core";

const APPLICATION_SERVER_URL = "http://3.36.126.169:8080/";

function CustomRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  
  const [sessionId, setSessionId] = useState(sessionIdFromUrl)
  const [myUserName, setMyUserName] = useState("")
  const [session, setSession] = useState(undefined)
  const [mainStreamManager, setMainStreamManager] = useState(undefined)
  const [publisher, setPublisher] = useState(undefined)
  const [subscribers, setSubscribers] = useState([])
  const [videoOn, setVideoOn] = useState(undefined)
  const [audioOn, setAudioOn] = useState(undefined)
  const [join, setJoin] = useState(false)
  const [start, setStart] = useState(false)
  
  // const myUserNameFromUrl = urlParams.get("nickname");

  useEffect(() => {
    window.addEventListener("beforeunload", onbeforeunload);

    const urlParams = new URLSearchParams(window.location.search);
    // const sessionIdFromUrl = urlParams.get("sessionId");
    const myUserNameFromUrl = urlParams.get("nickname");

    // url 확인
    setMyUserName(myUserNameFromUrl)
    joinSession();

    // 나가기
    return () => {
      console.log("나간다", window)
      window.removeEventListener("beforeunload", onbeforeunload);
    } 
  }, []);


  const onbeforeunload = (event) => {
    leaveSession();
  }

  const joinSession = async () => {
    const OV = new OpenVidu();

    const mySession = OV.initSession()
    setSession(mySession)

    mySession.on('streamCreated', (event) => {
      const subscriber = mySession.subscribe(event.stream, undefined);
      setSubscribers((prevSubscribers) => [...prevSubscribers, subscriber]);
    });

    mySession.on('streamDestroyed', (event) => {
      deleteSubscriber(event.stream.streamManager);
    });

    mySession.on('exception', (exception) => {
      console.warn(exception);
    });
    

    mySession.on('signal:alert', (event) => {
      console.log(event.data);
      alert("게임 시작");
    })

    mySession.on('signal:count', (event) => {
      if (event.data === "true") {
        setStart(true)
      } else {
        setStart(false)
      }
    })

    mySession.on('signal:check', (event) => {
      setStart(!start)
    })


    try {
      const token = await getToken(sessionId); 
      await mySession.connect(token, { clientData: myUserName });
      console.log(mySession, "여기")
      let newpublisher = await OV.initPublisherAsync(undefined, {
        audioSource: undefined,
        videoSource: undefined,
        publishAudio: true,
        publishVideo: true,
        resolution: '640x480',
        frameRate: 30,
        insertMode: 'APPEND',
        mirror: true,
      });
      mySession.publish(newpublisher);

      setVideoOn(true)
      setAudioOn(true)
      setMainStreamManager(newpublisher)
      setPublisher(newpublisher)
      console.log(newpublisher, "newpublisher")

    } catch (error) {
      console.log('There was an error connecting to the session:', error.code, error.message);
    }
  }

  const guestJoinSession = (e) => {
    e.preventDefault();
    var linkerSession = session;
    var linkedPublisher = publisher;

    setJoin(true);

    linkerSession.publish(linkedPublisher);
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
  }

  const getToken = async(mySessionId) => {
    console.log(mySessionId, "마이 세션아이디")
    if (mySessionId === null) {
      const createSessionId = await createSession(mySessionId);
      return await createToken(createSessionId);
    }
    return await createToken(mySessionId);
  };

  const createSession = async(sessionId) => {
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

  const createToken = async(sessionId) => {
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
    console.log(response.data, "크리에이트토큰")
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

  }

  const camStatusChanged = () => {

    setVideoOn(!videoOn);
    
    if (publisher) {
      publisher.publishVideo(videoOn);
    }
  }

  const micStatusChanged = () => {

    setAudioOn(!audioOn);

    if (publisher) {
      publisher.publishAudio(audioOn);
    }
  }

  const deleteSubscriber = (streamManager) => {
    let removedSubscribers = subscribers;
    let index = removedSubscribers.indexOf(streamManager, 0);
    if (index > -1) {
      removedSubscribers.splice(index, 1);
      setSubscribers(removedSubscribers);
    }
  }

  // main 화면 변경
  const handleMainVideoStream = (stream) => {
    if (mainStreamManager !== stream) {
      setMainStreamManager(stream);
    }
  }

  const displayEvery = () => {
    // session.signal({
    //   data: "hi",
    //   to: [],
    //   type: "alert",
    // })
    // .then(() => {
    // })
    // .catch((e) => {})

    session.signal({
      data: !start,
      to: [],
      type: 'count',
    })
    .then(() => {})
    .catch((e) => {})
  }

  const checkClick = () => {
    session.signal({
      data: start,
      to: [],
      type: 'check',
    })
    .then(() => {})
    .catch((e) => {})
  }

  return (
    <div>
      {sessionIdFromUrl === null || join === true ? (
        <div>
          <Game1 />
          <ToolbarComponent
            audioOn={audioOn}
            videoOn={videoOn}
            camStatusChanged={camStatusChanged}
            micStatusChanged={micStatusChanged}
            leaveSession={leaveSession}
            publisher={publisher}
          />
          <button onClick={displayEvery}>버튼</button>
          <button onClick={checkClick}>check버튼</button>
        </div>
      ) : null}

      {/* 초대링크로 접속한 경우: 입장 대기실 */}
      {(sessionIdFromUrl != null) && (join === false) ? (
        <div id="wrapper">
          <div id="container" className="jumbotron vertical-center">
            <h1> 입장 대기실 </h1>
            <input
              type="button"
              className="btn btn-success"
              onClick={guestJoinSession}
              value="입장"
            />
            <UserVideoComponent streamManager={mainStreamManager} />
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

      {(mainStreamManager !== undefined) && (join === true) ? (
        <div id="main-video" className="col-md-6">
          <MainVideoComponent
            streamManager={mainStreamManager}
          />
        </div>
      ) : null}
      <div id="video-container" className="col-md-6">
        {/* {this.state.publisher !== undefined ? (
                          <div className="stream-container col-md-6 col-xs-6" onClick={() => this.handleMainVideoStream(this.state.publisher)}>
                              <UserVideoComponent
                                  streamManager={this.state.publisher} />
                          </div>
                      ) : null} */}
      
      {sessionIdFromUrl === null || join === true ? (
        <div>
          {subscribers.map((sub, i) => (
            <div
              key={sub.id}
              className="stream-container col-md-6 col-xs-6"
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
  );
}

export default CustomRoom;