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
    navigate('/')
    
  }


  // arr: 원하는 pictureSeq 배열
  const saveImages = (arr) => {
    // const redisImageIndex = []

    const formData = new FormData()
    formData.append('memberSeq', memberSeq)
    formData.append('redisImageSeqs', arr)
    formData.append('roomCode', sessionIdFromUrl)
    formData.append('subscriberId', subscriberIdFromUrl)

    axios
      .post('/album/upload', formData)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })

    axios({
      method: 'POST',
      url: '/album/upload',
      params: { 'roomCode': sessionIdFromUrl, 'subscriberId': subscriberIdFromUrl }
    })
    .then((res) => {
      setImages(res.data)
    })
    .catch((err) => {
      console.log(err)
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
            <button onClick={() => saveImages([])}>앨범저장</button>
          </div>
        )
      })}
      
      <button onClick={goToMain}>나가기</button>
      {/* {memberSeq !== -1 ? (
          <button onClick={saveImages}>저장</button>
      ): null} */}



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