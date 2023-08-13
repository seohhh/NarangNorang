import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import exitIcon from "../assets/icon/exit.png";
import { Modal } from "react-bootstrap";
import './ExitRoom.css';


axios.defaults.url = 'https://i9c208.p.ssafy.io/api/v1'

function ExitRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const subscriberIdFromUrl = urlParams.get("subscriberId");
  const selctedPictureSeq = []

  const memberSeq = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")).memberSeq : -1
  const [ images, setImages ] = useState([])
  const [ url, setUrl ] = useState(null)
  const navigate = useNavigate()

  // 창 나가기 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  useEffect(() => {
    if (sessionIdFromUrl === null || subscriberIdFromUrl===null) {
      navigate('/')
    }
    
    axios({
      method: 'GET',
      url: '/album/capture-list',
      params: { 'roomCode': sessionIdFromUrl, 'subscriberId': subscriberIdFromUrl }
    })
    .then((res) => {
      setImages(res.data)
      console.log(res)
      console.log(images[0].pictureData, "이미지")
      // let blob = new Blob([new ArrayBuffer(images[0].pictureData)], { type: "image/png" });
      const url = URL.createObjectURL(new Blob([images[0].pictureData], { type: 'image/png' }))
      setUrl(url)
      console.log(url)
    })
    .catch((err) => {
      console.log(err)
    })
  }, [sessionIdFromUrl, subscriberIdFromUrl, navigate, images])

  const goToMain = () => {
    navigate('/')
  }


  // arr: 원하는 pictureSeq 배열
  const saveImages = () => {

    const data = {
      "memberSeq": memberSeq,
      "redisImageSeqs": selctedPictureSeq,
      "roomCode": sessionIdFromUrl,
      "subscriberId": subscriberIdFromUrl
    }

    axios.post('/album/upload', data)
    .then((res) => {
      console.log(res)
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageInfo = () => {
    console.log(images)
  }

  const selectImageSeq = (seq) => {
    if (selctedPictureSeq.indexOf(seq) > -1) {
      selctedPictureSeq.splice(selctedPictureSeq.indexOf(seq), selctedPictureSeq.indexOf(seq) + 1)
    } else {
      selctedPictureSeq.push(seq)
    }
    console.log(selctedPictureSeq)
  }


  return (
    <div className="wrapper">
      <div className="ShadowContainer">
        <div>
          <img src={exitIcon} alt="exit" onClick={handleShow} 
            style={{width: "30px", position: "absolute", top: "2rem", right: "2rem",}}/>
          <div style={{ fontSize: "35px"}}>
            <span style={{ color: "#FFE600" }} onClick={goToMain}>나랑노랑</span>과 함께 즐거운 시간 보내셨나요?
            <div>아이와 찍은 사진을 저장해보세요!</div>
          </div>
        </div>
        
        {images.map((image) => {
          return (
            <div key={image.pictureSeq}>
              {/* <img src="" alt="" /> */}
              <button onClick={imageInfo}>이미지</button>
              <button onClick={() => selectImageSeq(image.pictureSeq)}>선택</button>
              <button onClick={() => saveImages()}>앨범으로~!</button>
            </div>
          )
        })}
        {/* <img src="blob:http://3.36.126.169:6378/0a887c95-9eef-49c0-9c9b-35f224455a65" alt="test" /> */}
        <img src="blob:http://localhost:3000/e2db9b2f-5c69-44a5-bfec-a29f9bd4469a" alt="test" />
        {/* {memberSeq !== -1 ? (
            <button onClick={saveImages}>저장</button>
        ): null} */}



        {/* {images.map((image, i) => (
          <div>
            {image}
            <img src={image} alt="" />
          </div>
        ))} */}
        <div style={{display: "flex", flexDirection: "row"}}>
          <div id="downloadBtn" >
            사진 다운로드
          </div>
          { memberSeq !== -1 ? 
            (<div id="albumBtn" onClick={saveImages}>
              앨범에 저장하기
            </div>)
          : null}
        </div>
      </div>
    

    {/* 창 나가기 모달 */}
    <Modal show={show} onHide={handleClose} style={{display: "flex", justifyContent: "center", alignItems: "center"}}>
      <Modal.Header closeButton>
        <Modal.Title style={{fontFamily: "Happiness-Sans-Bold"}}>
          방나가기</Modal.Title>
      </Modal.Header>
      <Modal.Body style={{fontFamily: "Pretendard-bold"}}>
        <div>
          <div style={{paddingBottom: "15px"}}>이 창을 나가면 사진들은 모두 삭제됩니다. 그래도 나가시겠습니까?</div>
          <div style={{ display: "flex", justifyContent: "center"}}>
            <div className="modalBtn" style={{backgroundColor: "#F7DB42"}} onClick={handleClose}>사진 둘러보기</div>
            <div className="modalBtn" style={{backgroundColor: "grey", color: "white"}} onClick={goToMain}>나가기</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>

    </div>
  );
} 


export default ExitRoom;