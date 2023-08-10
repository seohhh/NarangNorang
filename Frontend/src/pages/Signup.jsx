import React, { useState } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signUp } from "../slice/authSlice";
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import loginImg from "../assets/loginImg.png";


axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const ImgContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFEC81;
  width: 45vw;
`

const TextContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55vw;
`

const SignupForm = styled.div`
  padding: 50px 20px 20px 20px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: grey;
  margin-bottom: 5px;
`

function Signup() {
  const dispatch = useDispatch()
  const [idValidation, setIdValidation] = useState('')
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')

  const [member_id, setMemberId] = useState('')
  const [password, setPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [member_name, setMemberName] = useState('')
  const [member_nickname, setMemberNickname] = useState('')
  const [member_email, setMemberEmail] = useState('')

  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };
  const handlePassword = (e) => {
    setPassword(e.target.value);
  };
  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
  };
  const handleMemberName = (e) => {
    setMemberName(e.target.value);
  };
  const handleMemberNickname = (e) => {
    setMemberNickname(e.target.value);
  };
  const handleMemberEmail = (e) => {
    setMemberEmail(e.target.value);
  };


  const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (!passwordCheck.test(password)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }

    // 비밀번호 입력 확인
    if (password !== confirm_password) {
      setPasswordConfirm(false);
    } else {
      setPasswordConfirm(true);
    }

    if (passwordConfirm && passwordValidation) {
      dispatch(
        signUp(
          member_id,
          password,
          member_name,
          member_nickname,
          member_email,
        )
      );
    }
  };

  // 아이디 중복 검사
  const idCheckHandler = (e) => {
    axios({
      method: "Get",
      url: `/member/${member_id}`,
    })
      .then((res) => {
        if (res.data === false) {
          setIdValidation(true);
        } else setIdValidation(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Container>
      <ImgContent>
        <Link to="/"><img src={loginImg} alt="LoginImage" /></Link>
      </ImgContent>
      <TextContent>
        <SignupForm>
          <div style={{marginBottom: "3rem"}}>
            <h1><span style={{color: "#FFE600"}}>나랑노랑</span>에 오신것을 환영합니다.</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="member_name">
              <Form.Label column sm="3">이름</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="member_name"
                  value={member_name}
                  placeholder='이름을 입력하세요'
                  onChange={handleMemberName}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_id">
              <Form.Label column sm="3">아이디</Form.Label>
              <Col sm="5">
                <Form.Control
                  type="text"
                  name="member_id"
                  value={member_id}
                  placeholder='아이디를 입력하세요'
                  onChange={handleMemberId}
                />
                {idValidation===true
                    ? <Form.Text className="text-muted">사용 가능한 아이디입니다</Form.Text>
                    : (idValidation===false ? <Form.Text className="text-muted">사용 불가능한 아이디입니다</Form.Text> : null)}
              </Col>
              <Col sm="4">
                <Button variant="primary" type="button" onClick={idCheckHandler}
                  style={{ width: "100%", backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>아이디 중복 확인</Button>
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="password">
              <Form.Label column sm="3">비밀번호</Form.Label>
                <Col sm="9">
                <Form.Control
                  type="password"
                  name="password"
                  value={password}
                  placeholder='비밀번호를 입력하세요'
                  onChange={handlePassword}
                  />
                {passwordValidation===false 
                  ? <Form.Text className="text-muted">영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요</Form.Text> : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="confirm_password">
              <Form.Label column sm="3">비밀번호 확인</Form.Label>
                <Col sm="9">
                <Form.Control
                  type="password"
                  name="confirm_password"
                  value={confirm_password}
                  placeholder='비밀번호 한 번 더 입력하세요'
                  onChange={handleConfirmPassword}
                />
                {passwordConfirm===false 
                  ? <Form.Text className="text-muted">비밀번호를 확인하세요</Form.Text> : null}
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_email">
              <Form.Label column sm="3">이메일</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="email"
                  name="member_email"
                  value={member_email}
                  placeholder='이메일을 입력하세요'
                  onChange={handleMemberEmail}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_nickname">
              <Form.Label column sm="3">닉네임</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="member_nickname"
                  value={member_nickname}
                  placeholder='닉네임을 입력하세요'
                  onChange={handleMemberNickname}
                />
              </Col>
            </Form.Group>
            <Button type="submit" style={{ width: "100%", backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>회원가입</Button>
          </Form>
          <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0" }}>
            <NavLink to="/"><span>메인으로 돌아가기</span></NavLink>
            <NavLink to="/login"><span>이미 아이디가 있으신가요? <span style={{color: "#FFE600"}}>로그인</span></span></NavLink>
          </div>
        </SignupForm>
      </TextContent>
    </Container>
  );
}

export default Signup;
