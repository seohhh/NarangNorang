import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import userpose from "../utils/userpose";

axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

const gameSlice = createSlice({
    name: 'game',
    initialState : {
      showCanvas: false,
      gameStart: false,
      webcamRef: null,
      renderBool: false,
      nowScore: 0,
      totalScore: 0,
    },
    reducers: {
      switchShowCanvas(state) {
        state.showCanvas = !state.showCanvas
      },
      switchGameStart(state) {
        state.gameStart = !state.gameStart
      },
      switchRenderBool(state) {
        state.renderBool = !state.renderBool
      },
      setWebcamRef(state, actions) {
        state.webcamRef = actions.payload
      },
      setNowScore(state, actions) {
        state.nowScore = actions.payload
        console.log(state.nowScore);
        console.log(actions.payload);
      },
      setTotalScore(state, actions) {
        state.totalScore += actions.payload
      }
    },
  });


export const handleCapture = (videoRef, canvas, roomCode, subscriberId) => async (dispatch) => {
  try {
    if (!videoRef) return;

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
export const handleGetScore = (gameRef, webcamRef) => async (dispatch) => {
  
  try {
    const score = userpose.getScore(gameRef, webcamRef);
    // console.log("getScore videoRef", videoRef)
    console.log("getScore", score);
    return score;
  } catch (error) {
    console.log(error, "점수계산 에러")
  }
}

export const handleWebcamRef = (webcamRef) => async (dispatch) => {
  try {
    dispatch(setWebcamRef(webcamRef))
  } catch (error) {
    console.log(error, "webcamRef 에러")
  }
} 


export const render = (dispatch) => {
  dispatch(switchRenderBool())
}

export const { switchShowCanvas, switchGameStart, setWebcamRef, switchRenderBool, setGameRef, setNowScore, setTotalScore } = gameSlice.actions;
export default gameSlice.reducer;