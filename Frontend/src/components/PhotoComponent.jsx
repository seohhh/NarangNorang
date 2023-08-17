import React, { useState } from "react";
// import { useLocation } from 'react-router-dom';
import { Card, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const ButtonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 24rem;
  height: 100%;
  border-radius: 1% 1% 1% 1%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`;

const Date = styled.span`
  position: absolute; 
  bottom: 27%; 
  right: 5%;
  font-size: 1.2rem;
  color: #FFD954;
  text-shadow: -1.2px 0 #000, 0 1.2px #000, 1.2px 0 #000, 0 -1.2px #000;
`


axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function PhotoComponent(props) {
  const [isActive, setIsActive] = useState(false);
  const photo = props.photo;

  const [editedContent, setEditedContent] = useState(photo.photoContent);
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const doMouseOver = () => {
    setIsActive(true);
  };

  const doMouseLeave = () => {
    setIsActive(false);
  };

  const deletePhoto = (photoSeq) => {
    axios({
      method: "DELETE",
      url: `album/delete/${photoSeq}`,
    })
      .then((res) => {
        console.log(res);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhotoContent = () => {
    // 작성 버튼 클릭 시 호출되는 함수
    axios({
      method: "PUT", // PUT 요청으로 변경
      url: `album/content/`,
      data: {
        photoContent: editedContent, // 수정된 내용을 서버로 전송
        photoSeq: photo.photoSeq
      },
    })
      .then((res) => {
        console.log(res);
        // 여기서 필요한 상태 업데이트나 처리를 수행할 수 있습니다.
        handleClose(); // 모달 닫기
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <div>
      <Card
        style={{ width: "24rem", margin: "3rem", height: "32rem" }}
        onMouseOver={doMouseOver}
        onMouseLeave={doMouseLeave}
      >
        <div>
          <Card.Img
            variant="top"
            src={photo.photoUrl}
            style={{ height: "24rem", position: "relative" }}
          />
          <Date>{photo.photoDate.substr(0,10)}</Date>
        </div>

        <ButtonBox isActive={isActive}>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="outline-success"
            onClick={() => handleShow()}
          >
            수정
          </Button>
          <Button
            style={{ marginLeft: "1rem" }}
            variant="outline-danger"
            onClick={() => deletePhoto(photo.photoSeq)}
          >
            삭제
          </Button>
        </ButtonBox>
        <Card.Body>
          {/* <Card.Title style={{ margin: "1rem" }}>{photo.photoDate.substr(0,10)}</Card.Title> */}
          <Card.Text style={{ margin: "1rem", fontFamily: "Dovemayo_wild", fontSize: "1.3rem" }}>
            {photo.photoContent}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        size="mx"
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{fontFamily: "Happiness-Sans-Bold"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>사진 내용 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder={editedContent}
              value={editedContent}
              onChange={(e) => setEditedContent(e.target.value)}
            />
          </Form.Group>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="warning" onClick={updatePhotoContent}>작성</Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default PhotoComponent;
