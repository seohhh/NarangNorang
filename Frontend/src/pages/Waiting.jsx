import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Form, Modal } from "react-bootstrap";
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { login } from "../slice/authSlice";
import styled from "styled-components";
import logo from "../assets/logo.png";
import axios from "axios";

const APPLICATION_SERVER_URL = "https://i9c208.p.ssafy.io/api/v1";

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
  flex-direction: column;
  width: 95vw;
  height: 90vh;
  border-radius: 25px;
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

const LoginBtn = styled.div`
  width: 100%; 
  background-color: #FFEA77;
  color: #000; 
  padding: 1.6% 5%;
  display: flex;
  justify-content: center;
  border-radius: 7px;

  &:hover{
    background-color: #FFF09A;
  }
`

const GuestBtn = styled.div`
  width: 100%; 
  background-color: white;
  border: 1.8px solid rgb(201, 201, 201);
  color: #000; 
  padding: 1.6% 5%;
  display: flex;
  justify-content: center;
  border-radius: 7px;
  color: rgb(145, 145, 145);

  &:hover{
    background-color: rgb(201, 201, 201);
  }
`

function Waiting() {
  const { sessionId } = useParams()
  const isLoggedin = sessionStorage.getItem('isLoggedin')
  // const userNickname = sessionStorage.getItem('userNickname')
  const userNickname = useSelector((state) => (state.login.userNickname))

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [nickname, setNickname] = useState(userNickname);
  const [roomAlert, setRoomAlert] = useState(false)


  useEffect(() => {
    if (isLoggedin === 'true' && userNickname) {
      joinCheck(userNickname)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin, navigate, sessionId, userNickname]);

  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };

  const handleMemberPassword = (e) => {
    setMemberPassword(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    axios({
      method: 'POST',
      url: '/auth/login',
      data: { memberId, memberPassword }
    })
    .then((res) => {
      const user = [res.data, memberId] 
      dispatch(login(user));
    })
    .catch((err) => {
      console.log(err, "로그인 실패")
      handleShow()
      setTimeout(() => {
        handleClose();
      }, 600);
      setMemberId('')
      setMemberPassword('')
    })
  };

  const joinCheck = (userNickname) => {
    axios.get(APPLICATION_SERVER_URL + "/room/read/" + sessionId)
    .then((res) => {
      if (res.data.roomStatus === "WAIT" && res.data.participantCount < 6) {
        navigate(`/room?sessionId=${sessionId}&nickname=${userNickname}`);
      } else {
        setRoomAlert(true)
        handleClose()
        setTimeout(() => {
          handleRoomAlertClose()
        }, 800)
      }
    })
    .catch((err) =>  {
      console.log(err)
    })
  }

  const handleRoomAlertClose = () => {
    setRoomAlert(false)
  }

  const onClickJoin = () => {
    joinCheck(nickname)
  }

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return(
    <>
      <Wrapper>
        <Container>
          <Content>
            <Link to="/"><img src={logo} alt="logo" style={{ width: "240px", marginBottom: "15px"}}/></Link>
            <Form.Group className="mb-3" controlId="formBasicEmail" style={{ width: "100%" }}>
              <Form.Label>아이디</Form.Label>
              <Form.Control
                type="id"
                placeholder="아이디를 입력하세요."
                value={memberId}
                onChange={handleMemberId}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: "100%" }}>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={memberPassword}
                onChange={handleMemberPassword}
              />
            </Form.Group>
            <LoginBtn type="submit" onClick={onClickLogin}>
              로그인
            </LoginBtn>
            <GuestBtn type="submit" onClick={handleShow} variant="outline-secondary" style={{ width: "100%", margin: "10px" }}>
              손님으로 참여하기
            </GuestBtn>
            <NavLink to="/signup"><span>회원이 아니신가요? <span style={{color: "#FFE600"}}>회원가입</span></span></NavLink>
          </Content>
        </Container>
      </Wrapper>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
            손님으로 참여하시겠습니까?</Modal.Title>
        </Modal.Header> 
        <Modal.Body style={{ fontFamily: "Pretendard-bold" }}>
          <div style={{ marginBottom: "20px" }}>
            손님으로 참여 시 앨범 기능을 사용할 수 없습니다. <br />그래도 계속하시겠습니까?
          </div>
          <Form style={{ fontFamily: "Pretendard-bold" }}>
            <Form.Group as={Row} className="mb-3" controlId="Nickname">
              <Form.Label column sm="2">
                닉네임
              </Form.Label>
              <Col sm="10">
                <Form.Control 
                  type="text"
                  placeholder="닉네임을 입력하세요"
                  value={nickname}
                  onChange={handleNickname}/>
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center"}}>
          <LoginBtn style={{width: "30%", fontFamily: "Pretendard-bold"}} onClick={handleClose}>
            로그인하기
          </LoginBtn>
          <GuestBtn style={{width: "30%", fontFamily: "Pretendard-bold"}}onClick={onClickJoin}>
            참여하기
          </GuestBtn>
        </Modal.Footer>
      </Modal>

      <Modal show={roomAlert} onHide={handleRoomAlertClose} style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        <Modal.Body className="modalbody">
          <div>
            <div>인원이 다 찼거나, 게임중인 방은 들어갈 수 없습니다.</div>
          </div>
        </Modal.Body>
      </Modal>
    </>
  )
}

export default Waiting;