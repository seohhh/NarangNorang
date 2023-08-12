import axios from "axios";
import React, { useState } from "react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

axios.defaults.url = 'https://i9c208.p.ssafy.io/api/v1'

function ExitRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const subscriberIdFromUrl = urlParams.get("subscriberId");
  const memberSeq = sessionStorage.getItem("user") !== null ? JSON.parse(sessionStorage.getItem("user")).memberSeq : -1
  const [ images, setImages ] = useState([])
  
  const navigate = useNavigate()

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
    })
    .catch((err) => {
      console.log(err)
    })
  }, [images, sessionIdFromUrl, subscriberIdFromUrl, navigate])

  const goToMain = () => {
    saveImages()
    navigate('/')
    
  }



  const saveImages = () => {
    // const redisImageIndex = []

    const formData = new FormData()
    formData.append()
    formData.append()// 배열 넣기

    axios.post('', formData)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }

  const imageInfo = () => {
    console.log(images)
  }


  return (
      <div>
          <h1>exit</h1>
          <p>sessionIdFromUrl : {sessionIdFromUrl}</p>
          <p>subscriberIdFromUrl : {subscriberIdFromUrl}</p>
          <p>memberSeq: {memberSeq}</p>
          
          {images.map((image) => {
            return (
              <div key={image.pictureSeq}>
                <button onClick={imageInfo}>이미지</button>
              </div>
            )
          })}
          
          <button onClick={goToMain}>나가기</button>
          {memberSeq !== -1 ? (
              <button onClick={saveImages}>저장</button>
          ): null}



          {/* {images.map((image, i) => (
            <div>
              {image}
              <img src={image} alt="" />
            </div>
          ))} */}
      </div>
      
  );
}

export default ExitRoom;