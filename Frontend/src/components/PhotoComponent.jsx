import React, { useState } from "react";
import { Card, Button, Modal, Form } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";

const ButtonBox = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  width: 100%;
  height: 100%;
  border-radius: 1% 1% 1% 1%;
  background-color: rgba(0, 0, 0, 0.8);
  display: flex;
  justify-content: center;
  align-items: center;
  opacity: ${(props) => (props.isActive ? 1 : 0)};
  transition: opacity 0.3s ease-in-out;
`
const Date = styled.span`
  position: absolute; 
  bottom: 6%; 
  right: 8%;
  font-size: 1.2rem;
  color: #FFD954;
  text-shadow: -1.2px 0 #000, 0 1.2px #000, 1.2px 0 #000, 0 -1.2px #000;
`

const Formtext = styled(Form.Text)`
  color: red;
  font-family: Pretendard-bold;
  padding-left: 5px;
`


axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function PhotoComponent(props) {
  const [isActive, setIsActive] = useState(false);
  const photo = props.photo;

  const [editedContent, setEditedContent] = useState(photo.photoContent);
  const [show, setShow] = useState(false);
  const [confirmLimit, setConfirmLimit] = useState(true);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const doMouseOver = () => {
    setIsActive(true);
  };

  const doMouseLeave = () => {
    setIsActive(false);
  };

  const handleEditedContent = (e) => {
    setEditedContent(e.target.value)
    if (e.target.value.length > 33) {
      setConfirmLimit(false)
    } else {
      setConfirmLimit(true)
    }
  }

  const deletePhoto = (photoSeq) => {
    axios({
      method: "DELETE",
      url: `album/delete/${photoSeq}`,
    })
      .catch((err) => {
        console.log(err);
      });
  };

  const updatePhotoContent = () => {
    if (confirmLimit) {
      axios({
        method: "PUT",
        url: `album/content/`,
        data: {
          photoContent: editedContent, // 수정된 내용을 서버로 전송
          photoSeq: photo.photoSeq
        },
      })
        .then((res) => {
          handleClose();
        })
        .catch((err) => {
          console.log(err);
        });
    }
  };

  return (
    <div>
      <Card
        style={{ width: "19rem", height: "28rem", margin: "2rem" }}
        onMouseOver={doMouseOver}
        onMouseLeave={doMouseLeave}
      >
        <div style={{position: "relative", display: "flex", justifyContent: "center", alignItems: "center", height: "100%"}}>
          <Card.Img
            variant="top"
            src={photo.photoUrl}
            style={{ height: "22rem",  width: "90%", position: "relative", margin: "0" }}
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
        <Card.Body style={{padding: "0 0 16px 0", minHeight: "4rem"}}>
          <Card.Text style={{ margin: "0rem 1rem", fontFamily: "Dovemayo_wild", fontSize: "1.3rem", display: "flex", justifyContent: "center"}}>
            {photo.photoContent}
          </Card.Text>
        </Card.Body>
      </Card>

      <Modal
        show={show}
        onHide={handleClose}
        backdrop="static"
        keyboard={false}
        style={{fontFamily: "Happiness-Sans-Bold", width: "100%", margin: "2rem", height: "28rem"}}
      >
        <Modal.Header closeButton>
          <Modal.Title>사진 내용 수정</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form.Group className="mt-3" controlId="exampleForm.ControlTextarea1">
            <Form.Control
              placeholder={editedContent}
              value={editedContent}
              onChange={handleEditedContent}
            />
            {confirmLimit===false
                  ? <Formtext>33자이내로 적어주세요</Formtext> : null}
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