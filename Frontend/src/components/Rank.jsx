import React from 'react'
import rank from '../assets/ranktest.png';
import OpenViduVideoComponent from './OvVideo';
import celebrate from '../assets/celebrate.gif';
import bgm from '../assets/music/rankbgm.mp3';

const Rank = (props) => {
  const first = props.first
  const second = props.second
  const third = props.third

  return (
    <span style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%"}}>
      <img style={{ objectFit: "fill", width: "100%", height: "100%" }} src={rank} alt="rank" />
      <img src={celebrate} alt="celebrate" style={{position: "absolute", top: 0, left: 0, width: "100%", height: "100%", zIndex: "1"}} />
      <audio src={bgm} autoPlay></audio>
      <div style={{ position: "absolute", top: "100px", left: "500px" }}>
        <OpenViduVideoComponent streamManager={first} rank={1}/>
      </div>
      { second ?
        <div style={{ position: "absolute", top: "245px", left: "200px" }}>
          <OpenViduVideoComponent streamManager={second} rank={2}/>
        </div>
        : null }
      { third ?
        <div style={{ position: "absolute", top: "245px", right: "200px" }}>
          <OpenViduVideoComponent streamManager={third} rank={3}/>
        </div>
        : null }
    </span>
  )
}

export default Rank;