import React, { useState } from "react";
import styled from "styled-components";


// 나랑노랑 인트로
const Youtube = styled.div`
  width: 100%;
  height: 100%;
  position: absolute;
  top: 0;
  left: 0;
`;

function Stretching (props) {
  const videoId = props.videoId
  const url = `https://www.youtube.com/embed/${videoId}?autoplay=1`
  console.log()
  return (
    <youtube>
      <iframe
        width="560"
        height="315"
        src={url}
        title="YouTube video player"
        frameborder="0"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
      ></iframe>
    </youtube>
  )
}

export default Stretching;