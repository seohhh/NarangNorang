import React from 'react'
import { Card } from "react-bootstrap";


function StretchingCard (props) {
  const setStretchingStatus = props.setStretchingStatus
  const videoId = props.videoId
  const url = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`

  return (
    <Card
      style={{
        width: "24rem",
        margin: "3rem",
        border: "0px"
      }}
    >
      <Card.Img variant="top" src={url} />
      <Card.Body>
        <div
          className="btn startBtn"
          onClick={() => setStretchingStatus(videoId)}
        >
          시작하기
        </div>
      </Card.Body>
    </Card>
  )
}

export default StretchingCard;