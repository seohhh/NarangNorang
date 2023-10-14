import { useState, React } from "react";
import styled from "styled-components";
import askIcon from "../assets/icon/ask.png";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";
import axios from "axios";

axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";


const Container = styled.div`
  position: relative;
`;

const Askbutton = styled.div`
  display: flex;
  justify-content: center; // 내부 요소 간격 균등 배치
  align-items: center; // 세로 중앙 정렬
  background-color: white;
  border-radius: 99px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
  padding: 10px 15px;
  width: 130px;
  z-index: 9999;

  &:hover{
    background-color: #EEEEEE;
  }
`;

const AskImg = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
`;


function Ask() {
  const [show, setShow] = useState(false);
  const [success, setSuccess] = useState(false);

  const [questionEmail, setQuestionEmail] = useState("");
  const [questionContent, setQuestionContent] = useState("");
  const [confirmEmail, setConfirmEmail] = useState("");
  const [confirmContent, setConfirmContent] = useState("");

  const handleClose = () => {
    setConfirmContent("");
    setConfirmEmail("");
    setShow(false);
  };
  const handleShow = () => setShow(true);

  const handleSuccessClose = () => setSuccess(false);
  const handleSuccessShow = () => setSuccess(true);

  const handleEmail = (e) => {
    setQuestionEmail(e.target.value);
    var regExp = /^[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*@[0-9a-zA-Z]([-_.]?[0-9a-zA-Z])*.[a-zA-Z]{2,3}$/i;
    if (regExp.test(questionEmail)) {
      setConfirmEmail(true)
    } else {
      setConfirmEmail(false);
    }
  };

  const handleQuestion = (e) => {
    setQuestionContent(e.target.value);

    if (e.target.value) {
      setConfirmContent(true);
    } else {
      setConfirmContent(false);
    }
  };

  const submitAsk = (event) => {
    event.preventDefault();
    if (!questionContent) {
      setConfirmContent(false)
    }

    if (confirmEmail && confirmContent) {
      axios.post('/question', { questionContent, questionEmail })
      .then((res) => {
        handleClose()
        handleSuccessShow();
        setTimeout(() => {
          handleSuccessClose()
        }, 500);
      })
      .catch((err) => {
        console.log(err)
      })
    }
  };

  return (
    <>
    <Container>

      <Askbutton onClick={handleShow}>
        <span style={{ paddingRight: "5px" }}>문의하기</span>
        <AskImg src={askIcon} alt="ask" />
      </Askbutton>

      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{ fontFamily: "Pretendard-bold" }}
      >
        <Modal.Header closeButton>
          <Modal.Title style={{ fontFamily: "Happiness-Sans-Bold" }}>
            문의 남기기
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Label column lg={2}>
              이메일
            </Form.Label>
            <Col>
              <Form.Control
                type="email"
                placeholder="문의 답변 받을 이메일 주소를 작성해주세요."
                onChange={handleEmail}
              />
              {confirmEmail === false ? (
                <Form.Text className="text-muted">
                  알맞은 이메일을 입력해주세요.
                </Form.Text>
              ) : null}
            </Col>
          </Row>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              as="textarea"
              rows={5}
              placeholder="문의 내용을 작성해주세요."
              onChange={handleQuestion}
            />
          </Form.Group>
          {confirmContent === false ? (
            <Form.Text className="text-muted">
              문의 내용을 입력해주세요
            </Form.Text>
          ) : null}
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="submit"
            onClick={submitAsk}
            variant="warning"
            style={{ width: "6rem" }}
          >
            작성
          </Button>
        </Modal.Footer>
      </Modal>

      {/* 메일발송 성공 모달 */}
      <Modal show={success} onHide={handleSuccessClose}>
        <Modal.Body>
          <p>메일이 발송되었습니다.</p>
        </Modal.Body>
      </Modal>
            
    </Container>
    </>
  );
}

export default Ask;