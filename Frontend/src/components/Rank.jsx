import React from 'react'
import rank from '../assets/ranktest.png';
import OpenViduVideoComponent from './OvVideo';
import celebrate from '../assets/celebrate.gif';
import bgm from '../assets/music/clap.mp3';

const Rank = (props) => {
  const first = props.first
  const second = props.second
  const third = props.third

  const getNicknameTag = (streamManager) => {
    if (streamManager && streamManager.stream && streamManager.stream.connection) {
      return JSON.parse(streamManager.stream.connection.data).clientData;
    }
  };

  return (
    <span style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
      <img style={{ objectFit: "fill", width: "100%", height: "100%" }} src={rank} alt="rank" />
      <img src={celebrate} alt="celebrate" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "1"}} />
      <audio src={bgm} autoPlay></audio>
      <div style={{ position: "absolute", top: "15%", left: "39%"}}>
        <OpenViduVideoComponent streamManager={first} rank={1}/>
        <div className="name-tag">
          <p id="name">{getNicknameTag(first)}</p>
        </div>
      </div>
      { second ?
        <div style={{ position: "absolute", top: "245px", left: "200px" }}>
          <OpenViduVideoComponent streamManager={second} rank={2}/>
          <div className="name-tag">
            <p id="name">{getNicknameTag(second)}</p>
          </div>
        </div>
        : null }
      { third ?
        <div style={{ position: "absolute", top: "245px", right: "200px" }}>
          <OpenViduVideoComponent streamManager={third} rank={3}/>
          <div className="name-tag">
            <p id="name">{getNicknameTag(third)}</p>
          </div>
        </div>
        : null }
    </span>
  )
}

export default Rank;