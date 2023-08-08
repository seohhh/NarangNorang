import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { Form, Button } from "react-bootstrap";
import { useParams, Link, useNavigate } from 'react-router-dom';
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
  box-shadow: 0 0 20px -13px rgba(0, 0, 0, 2);
`

const Content = styled.div`
  width: 450px;
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
  const navigate = useNavigate ();

  const isLoggedin = sessionStorage.getItem('isLoggedin')
  useEffect(() => {
    if (isLoggedin === 'true') {
      navigate(`/room?sessionId=${sessionId}`)
    }
  }, [isLoggedin, navigate, sessionId]);

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

  const onClickJoin = (e) => {
    navigate(`/room?sessionId=${sessionId}`);
  }

  return(
    <Wrapper>
      <Container>
        <Content>
          <Link to="/"><img src={logo} alt="logo" style={{ width: "240px", marginBottom: "15px"}}/></Link>
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
          <Button type="submit" onClick={onClickJoin} variant="outline-secondary" style={{ width: "100%", margin: "10px" }}>
            손님으로 참여하기
          </Button>
          <NavLink to="/signup"><span>회원이 아니신가요? <span style={{color: "#FFE600"}}>회원가입</span></span></NavLink>
        </Content>
      </Container>
    </Wrapper>
  )
}

export default Waiting;