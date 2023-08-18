import React, { useState } from "react";
import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import exitIcon from "../assets/icon/exit.png";
import { Modal } from "react-bootstrap";
import './ExitRoom.css';

import LoadingSpinner from "../components/LoadingSpinner";


axios.defaults.url = 'https://i9c208.p.ssafy.io/api/v1'

function ExitRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const subscriberIdFromUrl = urlParams.get("subscriberId");
  const [selectedPictureSeq, setSelectedPictureSeq] = useState([])
  const navigate = useNavigate()

  const memberSeq = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")).memberSeq : -1
  const [ images, setImages ] = useState([])
  const [loading, setLoading] = useState(true)

  // 창 나가기 모달
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // 앨범 저장 성공 모달
  const [albumSuccessShow, setAlbumSuccessShow] = useState(false);
  const handleSuccessClose = () => setAlbumSuccessShow(false);
  const handleSuccessShow = () => setAlbumSuccessShow(true);

  // 앨범 저장 실패 모달
  const [albumFailShow, setAlbumFailShow] = useState(false);
  const handleFailClose = () => setAlbumFailShow(false);
  const handleFailShow = () => setAlbumFailShow(true);
  const [noContent, setNoContent] = useState(false);
  

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
      setLoading(false)
    })
    .catch((err) => {
      console.log(err)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [sessionIdFromUrl, subscriberIdFromUrl])

  
  const goToMain = async() => {
     const data = {
      "roomCode": sessionIdFromUrl,
      "subscriberId": subscriberIdFromUrl
    }
    await axios.post('/album/capture/delete', data)
    .then((res) => {
      navigate("/")
    })
    .catch((error) => {
      console.log(error)
    })
  }


  // 앨범에 저장
  // arr: 원하는 pictureSeq 배열
  const saveImages = () => {
    if (selectedPictureSeq.length) {
      const data = {
        "memberSeq": memberSeq,
        "redisImageSeqs": selectedPictureSeq,
        "roomCode": sessionIdFromUrl,
        "subscriberId": subscriberIdFromUrl
      }
  
      axios.post('/album/upload', data)
      .then((res) => {
        handleSuccessShow();
        setTimeout(() => {
          handleSuccessClose();
        }, 500);
        setSelectedPictureSeq([]);
      })
      .catch((error) => {
        handleFailShow();
        setTimeout(() => {
          handleFailClose();
        }, 500);
      })
    } else {
      setNoContent(true)
      handleFailShow();
        setTimeout(() => {
          handleFailClose();
        }, 500);
      setNoContent(false)
    }
  }

  // 사진 선택
  const selectImageSeq = (seq) => {
    if (selectedPictureSeq.includes(seq)) {
      setSelectedPictureSeq(selectedPictureSeq.filter((selectedSeq) => selectedSeq !== seq));
    } else {
      setSelectedPictureSeq([...selectedPictureSeq, seq]);
    }
  }


  // 선택한 이미지 컴퓨터에 다운로드
  const downloadSelectedImages = () => {
    const selectedImages = images.filter((image) =>
      selectedPictureSeq.includes(image.pictureSeq)
    );

    selectedImages.forEach((selectedImage) => {
      downloadImage(selectedImage.pictureData);
    });

    // 선택된 이미지 초기화
    setSelectedPictureSeq([]);
  };


  // 컴퓨터에 저장
  const downloadImage = (imageData) => {
    // base64 이미지 데이터를 Blob으로 디코딩
    const fileName = "캡처"
    const byteCharacters = atob(imageData);
    const byteArrays = [];
    for (let offset = 0; offset < byteCharacters.length; offset += 512) {
      const slice = byteCharacters.slice(offset, offset + 512);
      const byteNumbers = new Array(slice.length);
      for (let i = 0; i < slice.length; i++) {
        byteNumbers[i] = slice.charCodeAt(i);
      }
      const byteArray = new Uint8Array(byteNumbers);
      byteArrays.push(byteArray);
    }
    const blob = new Blob(byteArrays, { type: 'image/png' });
  
    // Blob을 File 객체로 변환하여 다운로드
    const file = new File([blob], fileName, { type: 'image/png' });
  
    // 파일 다운로드를 위한 링크 생성
    const url = URL.createObjectURL(file);
  
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    a.style.display = 'none';
    document.body.appendChild(a);
  
    // 파일 다운로드 실행
    a.click();
  
    // 사용한 URL 및 링크 제거
    URL.revokeObjectURL(url);
    document.body.removeChild(a);
  };

  const handleImageClick = (image) => {
    selectImageSeq(image.pictureSeq);
  };
  


  return (
    <div className="wrapper">
      <div className="ShadowContainer">
        <img src={exitIcon} alt="exit" onClick={handleShow} id="exitIcon"/>
        <div style={{paddingBottom: "3rem"}}>
            <div style={{fontSize: "33px"}}>
              <span style={{color: "#FFE600"}} onClick={goToMain}>나랑노랑</span>과 함께 즐거운 시간 보내셨나요?
            <div>아이와 찍은 사진을 저장해보세요!</div>
          </div>
        </div>
        
        {images.length ? (
          <div className="imageContainer">
            {images.map((image) => {
              const isSelected = selectedPictureSeq.includes(image.pictureSeq);
              return (
                <div key={image.pictureSeq} className="imageContent" style={{ cursor: 'pointer' }}
                onClick={() => handleImageClick(image)}>
                  <img src={`data:image/png;base64,${image.pictureData}`} alt="test"
                    style={{width: "10rem", borderRadius: "5px"}} />
                  <label style={{position: "absolute", top: "20px", left: "20px"}}>
                    <input
                      type="checkbox"
                      checked={isSelected}
                      style={{accentColor: "#F7DB42", width: "20px", height: "20px"}}
                      onChange={() => selectImageSeq(image.pictureSeq)}
                    />
                  </label>
                </div>)
            })}
          </div>
        ) : (
          <div>
            <h4>캡쳐된 사진이 없습니다. 소중한 추억을 남겨보세요!</h4>
          </div>
        )}
        <div style={{display: "flex", flexDirection: "row"}}>
          <div id="downloadBtn" onClick={downloadSelectedImages}>
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
            <div id="modalphotoBtn" onClick={handleClose}>사진 둘러보기</div>
            <div id="modalExitBtn" onClick={goToMain}>나가기</div>
          </div>
        </div>
      </Modal.Body>
    </Modal>
    
    <Modal show={albumSuccessShow} onHide={handleSuccessClose}>
      <Modal.Body className='modalbody'>
        <div>앨범에 저장되었습니다</div>
      </Modal.Body>
    </Modal>

    <Modal show={albumFailShow} onHide={handleFailClose}>
      <Modal.Body className='modalbody'>
        { noContent ? <div>선택된 사진이 없습니다</div> : <div>앨범 저장에 실패하였습니다</div> }
      </Modal.Body>
    </Modal>

    {loading ? (
      <LoadingSpinner />

    ): null}
    </div>
  );
} 


export default ExitRoom;