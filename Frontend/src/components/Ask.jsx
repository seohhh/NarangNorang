import { useState, React } from "react";
import styled from "styled-components";
import ask from "../assets/ask.svg";
import { Button, Modal, Form, Row, Col } from "react-bootstrap";

const Askbutton = styled.div`
  background-color: white;
  border-radius: 99px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
  padding: 10px 15px;
`;

const AskImg = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
`;

function Ask() {
  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  return (
    <>
      <Askbutton onClick={handleShow}>
        <span style={{ paddingRight: "5px" }}>문의하기</span>
        <AskImg src={ask} alt="askImg" />
      </Askbutton>
      <Modal
        size="lg"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
      >
        <Modal.Header closeButton>
          <Modal.Title>문의남기기</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Row>
            <Form.Label column lg={2}>
              이메일
            </Form.Label>
            <Col>
              <Form.Control
                type="text"
                placeholder="이메일 주소를 작성해주세요."
              />
            </Col>
          </Row>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control as="textarea" rows={5} placeholder="문의 내용을 작성해주세요." />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning">작성</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default Ask;
