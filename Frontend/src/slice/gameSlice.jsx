import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import userpose from "../utils/userpose";

axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

const gameSlice = createSlice({
    name: 'game',
    initialState : {
      showCanvas: false,
      gameStart: false,
      videoRef: null,
    },
    reducers: {
      switchShowCanvas(state) {
        state.showCanvas = !state.showCanvas
      },
      switchGameStart(state) {
        state.gameStart = !state.gameStart
      },
      setVideoRef(state, action) {
        state.videoRef = action.payload
        console.log(state.videoRef, "gameslice에서 확인")
      }
    },
  });


export const handleCapture = (videoRef, canvas, roomCode, subscriberId) => async (dispatch) => {
  try {
    if (!videoRef.current) return;

    canvas.toBlob((blob) => {
      if (blob !== null) {

        let file = new File([blob], "캡쳐.png", { type: blob.type })
        const formData = new FormData()
        formData.append('images', file)
        formData.append('roomCode', roomCode)
        formData.append('subscriberId', subscriberId)

        const header = {header: {"Content-Type": "multipart/form-data"}}
      
        axios.post('/album/capture', formData, {header})
        .then((response) => {
          console.log(response)
          console.log(file)
        })
        .catch((error) => {
          console.log(error)
          console.log(file)
        })
      }
    });
  } catch (error) {
    console.log(error, "캡처 에러")
  }

}
export const handleGetScore = (poseIdx, videoRef) => async (dispatch) => {
  
  try {
    const score = userpose.getScore(poseIdx, videoRef);
    console.log("similarity score", score);
    return score;
  } catch (error) {
    console.log(error, "점수계산 에러")
  }
}

export const handleVideoRef = (videoRef) => async (dispatch) => {
  try {
    dispatch(setVideoRef(videoRef))
  } catch (error) {
    console.log(error, "videoRef 에러")
  }
} 

export const { switchShowCanvas, switchGameStart, setVideoRef } = gameSlice.actions;
export default gameSlice.reducer;