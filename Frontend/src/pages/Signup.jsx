import React, { useState } from "react";
import styled from "styled-components";
import { Form, Button, Modal } from 'react-bootstrap';
import { Link, useNavigate } from "react-router-dom";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import axios from 'axios';
import loginImg from "../assets/loginImg.png";


axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

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

const Formtext = styled(Form.Text)`
  color: red;
  font-family: Pretendard-bold;
  padding-left: 5px;
`


function Signup() {
  const navigate = useNavigate()

  // 유효성 확인
  const [idValidation, setIdValidation] = useState('')
  const [emailConfirm, setEmailConfirm] = useState("")
  const [passwordConfirm, setPasswordConfirm] = useState('')
  const [passwordValidation, setPasswordValidation] = useState('')
  const [nameConfirm, setNameConfirm] = useState("")
  const [nicknameConfirm, setNickameConfirm] = useState("")

  const [memberId, setMemberId] = useState('')
  const [memberPassword, setMemeberPassword] = useState('')
  const [confirm_password, setConfirmPassword] = useState('')
  const [memberName, setMemberName] = useState('')
  const [memberNickname, setMemberNickname] = useState('')
  const [memberEmail, setMemberEmail] = useState('')

  // 회원가입 실패 모달 -> 모든 내용이 채워지지 않았을 때
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 회원가입 성공
  const [signup, setSignup] = useState(false);
  const handleSignupClose = () => setSignup(false);
  const handleSignupSuccess = () => setSignup(true);


  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };

  const handlePassword = (e) => {
    setMemeberPassword(e.target.value);
    var passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;

    if (!passwordCheck.test(e.target.value)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }
  };

  const handleConfirmPassword = (e) => {
    setConfirmPassword(e.target.value);
    if (memberPassword !== e.target.value) {
      setPasswordConfirm(false);
    } else {
      setPasswordConfirm(true);
    }
  };

  const handleMemberName = (e) => {
    setMemberName(e.target.value);
    if (e.target.value) {
      setNameConfirm(true)
    } else {
      setNameConfirm(false)
    }
  };

  const handleMemberNickname = (e) => {
    setMemberNickname(e.target.value);
    if (e.target.value) {
      setNickameConfirm(true)
    } else {
      setNickameConfirm(false)
    }
  };

  const handleMemberEmail = (e) => {
    setMemberEmail(e.target.value);
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(e.target.value)) {
      setEmailConfirm(true)
    } else {
      setEmailConfirm(false)
    }
  };

  // 회원가입
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!memberId||!memberPassword||!confirm_password||!memberName||!memberNickname||!memberEmail) {
      handleShow();
      setTimeout(() => {
        handleClose()
      }, 500);
    }

    if (memberId && memberPassword && memberName && memberNickname && emailConfirm && passwordConfirm && passwordValidation) {
      axios({
        method: 'POST',
        url: '/member',
        data: {memberId, memberPassword, memberName, memberNickname, memberEmail}
      })
      .then((res) => {
        handleSignupSuccess()
        setTimeout(() => {
          handleSignupClose()
        }, 500);
        setTimeout(() => {
          navigate(-1)
        }, 800);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

  // 아이디 중복 검사
  const idCheckHandler = (e) => {
    axios({
      method: "Get",
      url: `/member/${memberId}`,
    })
      .then((res) => {
        if (res.data === false) {
          setIdValidation(true);
        } else {
          setIdValidation(false)
        };
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
            <h1><span style={{color: "#FFE600"}}>나랑노랑</span>에 오신것을 환영합니다</h1>
          </div>
          <Form onSubmit={handleSubmit}>
            <Form.Group as={Row} className="mb-3" controlId="member_name">
              <Form.Label column sm="3">이름</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="member_name"
                  value={memberName}
                  placeholder='이름을 입력하세요'
                  onChange={handleMemberName}
                />
                {nameConfirm===false
                  ? <Formtext>이름을 입력하세요</Formtext> : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_id">
              <Form.Label column sm="3">아이디</Form.Label>
              <Col sm="5">
                <Form.Control
                  type="text"
                  name="member_id"
                  value={memberId}
                  placeholder='아이디를 입력하세요'
                  onChange={handleMemberId}
                />
                {idValidation===true
                    ? <Form.Text className="text-muted" style={{fontColor: "red", fontFamily: "Pretendard-bold"}}>사용 가능한 아이디입니다</Form.Text>
                    : (idValidation===false ? <Formtext>사용 불가능한 아이디입니다</Formtext> : null)}
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
                  value={memberPassword}
                  placeholder='비밀번호를 입력하세요'
                  onChange={handlePassword}
                  />
                {passwordValidation===false 
                  ? <Formtext>영문, 숫자, 특수기호 조합으로 8-20자리 이상 입력해주세요</Formtext> : null}
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
                  ? <Formtext>비밀번호를 확인하세요</Formtext> : null}
                </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_email">
              <Form.Label column sm="3">이메일</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="member_email"
                  value={memberEmail}
                  placeholder='이메일을 입력하세요'
                  onChange={handleMemberEmail}
                />
                {emailConfirm===false 
                  ? <Formtext>올바른 형태의 이메일을 입력하세요</Formtext> : null}
              </Col>
            </Form.Group>

            <Form.Group as={Row} className="mb-3" controlId="member_nickname">
              <Form.Label column sm="3">닉네임</Form.Label>
              <Col sm="9">
                <Form.Control
                  type="text"
                  name="member_nickname"
                  value={memberNickname}
                  placeholder='닉네임을 입력하세요'
                  onChange={handleMemberNickname}
                />
                {nicknameConfirm===false
                  ? <Formtext>닉네임을 입력하세요</Formtext> : null}
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
      

      {/* 회원가입 성공 모달 */}
      <Modal show={signup} onHide={handleSignupClose} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal.Body className="modalbody">
          <div>
            <div>회원가입이 완료되었습니다</div>
          </div>
        </Modal.Body>
      </Modal>


      {/* 회원가입 실패 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="modalbody">
          <div>모든 내용을 입력하세요</div>
        </Modal.Body>
      </Modal>
    
    </Container>
  );
}

export default Signup;
