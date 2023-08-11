import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
// import { useState } from "react";

axios.defaults.url = 'https://i9c208.p.ssafy.io/api/v1'

function ExitRoom() {
  const urlParams = new URLSearchParams(window.location.search);
  const sessionIdFromUrl = urlParams.get("sessionId");
  const subscriberIdFromUrl = urlParams.get("subscriberId");
  const memberSeq = useSelector((state) => state.login.userSeq)
  
  const navigate = useNavigate()
  // const { images, setimages } = useState([])

  useEffect(() => {


    const loadRedisImages = () => {
      const formData = new FormData()
      formData.append('roomCode', sessionIdFromUrl)
      formData.append('subscriberId', subscriberIdFromUrl)

      axios.get('/album/capture-list', formData)
      .then((res) => {
          console.log(res)
      })
      .catch((error) => {
          console.log(error)
      })
    }

    loadRedisImages()
    if (sessionIdFromUrl === null || subscriberIdFromUrl===null) {
      navigate('/')
    }
      

  }, [navigate, sessionIdFromUrl, subscriberIdFromUrl])


  const goToMain = () => {
    saveImages()
    navigate('/')
  }

  const saveImages = () => {
    // const redisImageIndex = []

    const formData = new FormData()
    formData.append()

    axios.post('', formData)
    .then((res) => {
      console.log(res)
    })
    .catch((error) => {
      console.log(error)
    })
  }


  return (
      <div>
          <h1>exit</h1>
          <p>sessionIdFromUrl : {sessionIdFromUrl}</p>
          <p>subscriberIdFromUrl : {subscriberIdFromUrl}</p>
          <p>memberSeq: {memberSeq}</p>
          <button onClick={goToMain}>나가기</button>
          {memberSeq !== null ? (
              <button onClick={saveImages}>저장</button>
          ): null}
      </div>
      
  );
}

export default ExitRoom;