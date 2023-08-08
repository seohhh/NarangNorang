import React, { useState } from "react";
// import { useLocation } from 'react-router-dom';
import { Card, Button } from "react-bootstrap";
import styled from "styled-components";

const ButtonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24rem;
  height: 100%;
  border-radius: 1% 1% 1% 1%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

function PhotoComponent(props) {
  const [isActive, setIsActive] = useState(false);

  const doMouseOver = () => {
    setIsActive(true);
  };

  const doMouseLeave = () => {
    setIsActive(false);
  };

  return (
    <div>
      <Card
        style={{ width: "24rem", margin: "3rem" }}
        onMouseOver={doMouseOver}
        onMouseLeave={doMouseLeave}
      >
        <Card.Img
          variant="top"
          src={props.imgSrc}
          style={{ height: "24rem" }}
        />

        <ButtonBox isActive={isActive}>
          <Button style={{marginLeft: "1rem"}} variant="outline-success">수정</Button>
          <Button style={{marginLeft: "1rem"}} variant="outline-danger">삭제</Button>
        </ButtonBox>

        <Card.Body>
          <Card.Title style={{ margin: "1rem" }}>그대로 멈춰라</Card.Title>
          <Card.Text style={{ margin: "1rem" }}>
            노래에 맞춰 멈춰라!! 노래가 다시 시작되기 전까지 움직이지 않는다면
            좋은 결과를 받을 수 있을 거에요.
          </Card.Text>
        </Card.Body>
      </Card>
    </div>
  );
}

export default PhotoComponent;
