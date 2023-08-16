import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Form, Button, Modal } from "react-bootstrap";
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

function Waiting() {
  const { sessionId } = useParams()

  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [nickname, setNickname] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate ();
  const [roomAlert, setRoomAlert] = useState(false)

  const userNickname = useSelector((state) => state.login.userNickname);

  const isLoggedin = sessionStorage.getItem('isLoggedin')
  useEffect(() => {
    if (isLoggedin === 'true' && userNickname) {
      joinCheck()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isLoggedin, navigate, sessionId, userNickname]);

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const handleNickname = (e) => {
    setNickname(e.target.value);
    console.log(nickname)
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputId, inputPw));
  };

  const joinCheck = () => {
    axios.get(APPLICATION_SERVER_URL + "/room/read/" + sessionId)
    .then((res) => {
      if (res.data.roomStatus === "WAIT" && res.data.participantCount < 6) {
        navigate(`/room?sessionId=${sessionId}&nickname=${nickname}`);
      } else {
        setRoomAlert(true)
        handleClose()
        setTimeout(() => {
          handleRoomAlertClose()
        }, 800)
      }
      console.log(res)
    })
    .catch((err) =>  {
      console.log(err)
    })
  }

  const handleRoomAlertClose = () => {
    setRoomAlert(false)
  }
  



  const onClickJoin = (e) => {
    joinCheck()
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
                value={inputId}
                onChange={handleInputId}
              />
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicPassword" style={{ width: "100%" }}>
              <Form.Label>비밀번호</Form.Label>
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력하세요."
                value={inputPw}
                onChange={handleInputPw}
              />
            </Form.Group>
            <Button type="submit" onClick={onClickLogin} style={{ width: "100%", backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>
              로그인
            </Button>
            <Button type="submit" onClick={handleShow} variant="outline-secondary" style={{ width: "100%", margin: "10px" }}>
              손님으로 참여하기
            </Button>
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
          <Button variant="secondary" onClick={handleClose}>
            로그인하기
          </Button>
          <Button variant="warning" onClick={onClickJoin}>
            참여하기
          </Button>
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