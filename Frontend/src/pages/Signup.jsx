import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signUp } from "../slice/authSlice";
import { Form, Button } from 'react-bootstrap';
import { Link } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import loginImg from "../assets/loginImg.png";


axios.defaults.baseURL = 'http://3.36.126.169:8080/api/v1'

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

const SignupForm = styled(Form)`
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
  const [formData, setFormData] = useState({
    member_id: "",
    password: "",
    confirm_password: "",
    member_name: "",
    member_nickname: "",
    member_email: "",
    member_phone: "",
  });

  const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (!passwordCheck.test(formData.password)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }

    // 비밀번호 입력 확인
    if (formData.password !== formData.confirm_password) {
      setPasswordConfirm(false);
    } else {
      setPasswordConfirm(true);
    }

    if (passwordConfirm && passwordValidation) {
      dispatch(
        signUp(
          formData.member_id,
          formData.password,
          formData.member_name,
          formData.member_nickname,
          formData.member_email,
          formData.member_phone
        )
      );
    }
  };

  // 아이디 중복 검사
  const idCheckHandler = (e) => {
    axios({
      method: "Get",
      url: `member/${formData.member_id}`,
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

  // 데이터 입력시 변경된 데이터 저장
  useEffect(() => {
    setFormData({
      ...formData,
      member_id: formData.member_id,
      password: formData.password,
      confirm_password: formData.confirm_password,
      member_name: formData.member_name,
      member_nickname: formData.member_nickname,
      member_email: formData.member_email,
      member_phone: formData.member_phone,
    });
  }, [
    formData.member_id,
    formData.password,
    formData.confirm_password,
    formData.member_name,
    formData.member_nickname,
    formData.member_email,
    formData.member_phone,
  ]);

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
                  value={formData.member_name}
                  placeholder='이름을 입력하세요'
                  onChange={(e) => setFormData({ ...formData, member_name: e.target.value })}
                />
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_id">
              <Form.Label column sm="3">아이디</Form.Label>
              <Col sm="5">
                <Form.Control
                  type="text"
                  name="member_id"
                  value={formData.member_id}
                  placeholder='아이디를 입력하세요'
                  onChange={(e) => setFormData({ ...formData, member_id: e.target.value })}
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
                value={formData.password}
                placeholder='비밀번호를 입력하세요'
                onChange={(e) => setFormData({ ...formData, password: e.target.value })}
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
                value={formData.confirm_password}
                placeholder='비밀번호 한 번 더 입력하세요'
                onChange={(e) => setFormData({ ...formData, confirm_password: e.target.value })}
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
                value={formData.member_email}
                placeholder='이메일을 입력하세요'
                onChange={(e) => setFormData({ ...formData, member_email: e.target.value })}
              />
            </Col>
          </Form.Group>

          <Form.Group as={Row} className="mb-3" controlId="member_nickname">
            <Form.Label column sm="3">닉네임</Form.Label>
            <Col sm="9">
              <Form.Control
                type="text"
                name="member_nickname"
                value={formData.member_nickname}
                placeholder='닉네임을 입력하세요'
                onChange={(e) => setFormData({ ...formData, member_nickname: e.target.value })}
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
