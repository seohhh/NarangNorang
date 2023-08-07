import React from "react";
// import { useLocation } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";

function PhotoComponent(props) {
  // const location = useLocation().pathname;
  // console.log(location)
  return (
    <Card style={{ width: "24rem", margin: "3rem"}}>
      <Card.Img variant="top" src={props.imgSrc} style={{ height: "24rem"}} />
      <Card.Body>
        <Card.Title style={{ margin: "1rem" }}>그대로 멈춰라</Card.Title>
        <Card.Text style={{ margin: "1rem" }}>
          노래에 맞춰 멈춰라!! 노래가 다시 시작되기 전까지 움직이지 않는다면
          좋은 결과를 받을 수 있을 거에요.
        </Card.Text>
        <Button variant="outline-dark" style={{ margin: "0.5rem"}}>수정</Button>
        <Button variant="outline-danger" style={{ margin: "0.5rem"}}>삭제</Button>
      </Card.Body>
    </Card>
  );
}

export default PhotoComponent;
