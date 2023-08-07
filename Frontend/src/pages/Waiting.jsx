import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useParams, Link } from 'react-router-dom';
import { login } from "../slice/authSlice";
import styled from "styled-components";
import logo from "../assets/logo.png";

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  height: 100vh;
`

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 95vw;
  height: 90vh;
  border-radius: 40px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
`

const Content = styled.div`
  width: 500px;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: grey;
  margin-bottom: 5px;
`

function Waiting() {
  const { sessionId } = useParams()

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const dispatch = useDispatch();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputId, inputPw));
  };


  return(
    <Wrapper>
      <Container>
        <Content>
          <img src={logo} alt="logo" style={{ width: "300px" }}/>
          <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "100%" }}>
            <Form.Label>아이디</Form.Label>
            <Form.Control
              type="id"
              placeholder="아이디를 입력하세요."
              value={inputId}
              onChange={handleInputId}
            />
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: "100%" }}>
            <Form.Label>비밀번호</Form.Label>
            <Form.Control
              placeholder="비밀번호를 입력하세요."
              value={inputPw}
              onChange={handleInputPw}
            />
          </Form.Group>
          <Button type="submit" onClick={onClickLogin} style={{ width: "100%", backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>
            로그인
          </Button>
          <Button type="submit" variant="outline-warning" style={{ width: "100%", marginTop: "10px" }}>
            손님으로 참여하기
          </Button>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Waiting;