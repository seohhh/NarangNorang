import React from 'react';
import { Card } from "react-bootstrap";


function ContentStretchingCard (props) {
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

      </Card.Body>
    </Card>
  )
}

export default ContentStretchingCard;