import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Form, Button, Row, Col, Modal } from "react-bootstrap";
import axios from "axios";
import styled from "styled-components";
import Footer from "../components/Footer";
import Ask from "../components/Ask";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
  margin: 0 30%;
  min-height: 100vh;
`;

const PasswordBtn = styled.div`
  background-color: white;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1% 0;
  border: 1px solid #C5C5C5;

  &:hover{
    background-color: #C5C5C5;
  } 
`

const UpdateBtn = styled.div`
  background-color: #FFEA77;
  border-radius: 5px;
  width: 100%;
  display: flex;
  justify-content: center;
  padding: 1% 0;
  
  &:hover{
    background-color: #FFF6A1;
  } 
`

axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function Mypage() {
  const { userId } = useParams()
  const user = JSON.parse(sessionStorage.getItem('user'))
  const memberId = JSON.parse(sessionStorage.getItem('userId'))

  const token = user.accessToken
  const navigate = useNavigate()

  useEffect(() => {
    if (memberId !== userId) {
      navigate('/notfound')
    }
  }, [memberId, userId, navigate]);


  const [memberName, setMemberName] = useState(undefined);
  const [memberEmail, setMemberEmail] = useState(undefined);
  const [memberNickname, setMemberNickname] = useState(undefined);

  const [memberPassword, setMemberPassword] = useState(undefined);
  const [newPassword, setNewPassword] = useState(undefined);
  const [newPassword2, setNewPassword2] = useState(undefined);
  const [pwSuccess, setPwSuccess] = useState(false);
  const [pwConfirm, setPwConfirm] = useState(false);
  const [infoUpdated, setInfoUpdated] = useState(false);
  const [pwnotsame, setPwNotSame] = useState(false);

  const [validated, setValidated] = useState(false);
  const [isUpdated, setIsUpdated] = useState(false);

  const handleMemberName = (e) => {
    setMemberName(e.target.value);
  };
  const handleMemberEmail = (e) => {
    setMemberEmail(e.target.value);
  };
  const handleMemberNickname = (e) => {
    setMemberNickname(e.target.value);
  };
  const handleMemberPassword = (e) => {
    setMemberPassword(e.target.value);
  };
  const handleNewPassword = (e) => {
    setNewPassword(e.target.value);
  };
  const handleNewPassword2 = (e) => {
    setNewPassword2(e.target.value);
  };

  const changeMemberPassword = (event) => {
    event.preventDefault();
    axios({
      method: "POST",
      url: "/auth/login",
      data: { memberId, memberPassword },
    })
      .then(() => {
        if (newPassword === newPassword2) {
          axios({
            method: "PUT",
            url: `/member/me/update/${memberId}`,
            data: { memberPassword: newPassword },
          })
            .then(() => {
              setPwSuccess(true);
              setTimeout(() => {
                setPwSuccess(false);
              }, 1000);
              handleClose();
            })
            .catch((err) => {
              console.log(err);
            });
        } else {
          setPwNotSame(true);
          setTimeout(() => {
            setPwNotSame(false);
          }, 1000);
        }
      })
      .catch((err) => {
        setPwConfirm(true);
        setTimeout(() => {
          setPwConfirm(false);
        }, 1000);
      });
  };

  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity === false) {
      event.preventDefault();
      event.stopPropagation();
    } else {
      // 우선 로그인 해보기
      event.preventDefault();
      axios({
        method: "POST",
        url: "/auth/login",
        data: { memberId, memberPassword },
      })
        .then((res) => {
          // 로그인에 성공하면
          axios({
            method: "PUT",
            url: `/member/me/update/${memberId}`,
            data: { memberEmail, memberNickname, memberName },
          })
            .then((res) => {
              setInfoUpdated(true);
              setTimeout(() => {
                setInfoUpdated(false);
              }, 1000);
              setIsUpdated(true);
            })
            .catch((err) => {
              console.log(err);
            });
        })
        .catch((err) => {
          setPwConfirm(true);
          setTimeout(() => {
            setPwConfirm(false);
          }, 1000);
        });
    }

    setValidated(true);
  };

  const updateUserInfo = () => {
    axios({
      method: "GET",
      url: "/member/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setMemberName(res.data.memberName);
        setMemberEmail(res.data.memberEmail);
        setMemberNickname(res.data.memberNickname);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  useEffect(() => {
    updateUserInfo();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isUpdated]);

  return (
    <>
      <Wrapper>
        <div style={{margin: "5% 0 10% 0", fontSize: "2rem"}}>{memberNickname}의 마이페이지</div>
        <Form
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
          noValidate
          validated={validated}
          onSubmit={handleSubmit}
        >
          <Form.Group
            className="mb-2"
            as={Row}
            lg="12"
            controlId="validationCustom01"
          >
            <Form.Label column lg="4">
              아이디
            </Form.Label>
            <Col lg="8">
              <Form.Control
                disabled
                readOnly
                type="text"
                defaultValue={memberId}
              />
            </Col>
          </Form.Group>

          <Form.Group
            className="mb-2"
            as={Row}
            lg="12"
            controlId="validationCustom02"
          >
            <Form.Label column lg="4">
              이름
            </Form.Label>
            <Col lg="8">
              <Form.Control
                required
                type="text"
                defaultValue={memberName}
                onChange={handleMemberName}
              />
            </Col>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-2"
            as={Row}
            lg="12"
            controlId="validationCustom03"
          >
            <Form.Label column lg="4">
              비밀번호
            </Form.Label>
            <Col lg="8">
              <Form.Control
                type="password"
                placeholder="비밀번호를 입력해주세요."
                required
                onChange={handleMemberPassword}
              />
            </Col>
            <Form.Control.Feedback type="invalid">
              개인정보 수정을 위해 비밀번호를 입력해주세요.
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-2"
            as={Row}
            lg="12"
            controlId="validationCustom04"
          >
            <Form.Label column lg="4">
              이메일
            </Form.Label>
            <Col lg="8">
              <Form.Control
                required
                type="text"
                defaultValue={memberEmail}
                onChange={handleMemberEmail}
              />
            </Col>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>

          <Form.Group
            className="mb-2"
            as={Row}
            lg="12"
            controlId="validationCustom05"
          >
            <Form.Label column lg="4">
              닉네임
            </Form.Label>
            <Col lg="8">
              <Form.Control
                required
                type="text"
                defaultValue={memberNickname}
                onChange={handleMemberNickname}
              />
            </Col>
            <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
          </Form.Group>
          
          <div>
            <UpdateBtn variant="outline-warning" type="submit" onClick={handleSubmit}>
              정보 수정
            </UpdateBtn>
            <PasswordBtn variant="outline-primary" className="mt-2" type="submit" onClick={handleShow}>
              비밀번호변경
            </PasswordBtn>
          </div>
        </Form>
      </Wrapper>

      <Modal show={show} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
            비밀번호를 수정하시겠습니까?
          </Modal.Title>
        </Modal.Header>
        <Modal.Body style={{ fontFamily: "Pretendard-bold" }}>
          <Form style={{ fontFamily: "Pretendard-bold" }}>
            <Form.Group as={Row} className="mb-3" controlId="Nickname">
              <Form.Label column sm="3">
                비밀번호
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  placeholder="현재 비밀번호를 입력하세요."
                  onChange={handleMemberPassword}
                />
              </Col>
            </Form.Group>
            <Form.Group as={Row} className="mb-3" controlId="Nickname">
              <Form.Label column sm="3">
                새 비밀번호
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  placeholder="새 비밀번호를 입력하세요."
                  onChange={handleNewPassword}
                />
              </Col>
            </Form.Group>{" "}
            <Form.Group as={Row} className="mb-3" controlId="Nickname">
              <Form.Label column sm="3">
                비밀번호 확인
              </Form.Label>
              <Col sm="9">
                <Form.Control
                  type="password"
                  placeholder="새 비밀번호를 한번 더 입력하세요."
                  onChange={handleNewPassword2}
                />
              </Col>
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer style={{ display: "flex", justifyContent: "center" }}>
          <Button variant="secondary" onClick={changeMemberPassword}>
            비밀번호 수정
          </Button>
        </Modal.Footer>
      </Modal>

      <Modal show={pwSuccess}>
        <Modal.Body className="modalbody">
          <div>비밀번호가 수정되었습니다.</div>
        </Modal.Body>
      </Modal>

      <Modal show={pwConfirm}>
        <Modal.Body className="modalbody">
          <div>현재 비밀번호를 확인해주세요.</div>
        </Modal.Body>
      </Modal>

      <Modal show={infoUpdated}>
        <Modal.Body className="modalbody">
          <div>정보 수정에 성공하였습니다.</div>
        </Modal.Body>
      </Modal>

      <Modal show={pwnotsame}>
        <Modal.Body className="modalbody">
          <div>변경할 비밀번호를 확인해주세요.</div>
        </Modal.Body>
      </Modal>
      <Ask />
      <Footer />
    </>
  );
}

export default Mypage;