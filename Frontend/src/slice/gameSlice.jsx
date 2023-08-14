import { createSlice } from '@reduxjs/toolkit';
import axios from 'axios';
import userpose from "../utils/userpose";

axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

const gameSlice = createSlice({
    name: 'game',
    initialState : {
      showCanvas: false,
      gameStart: false,
      webcamElementId: null, // webcamRef 대신 webcamElementId 사용
      renderBool: false
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
      setWebcamElementId(state, actions) { // setWebcamRef 대신 setWebcamElementId 사용
        state.webcamElementId = actions.payload
      },
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
export const handleGetScore = (gameRef, webcamRef) => async (dispatch) => {
  
  try {
    const score = await userpose.getScore(gameRef, webcamRef);
    // console.log("getScore videoRef", videoRef)
    console.log("getScore", score);
    return score;
  } catch (error) {
    console.log(error, "점수계산 에러");
    console.error("점수계산 에러:", error.message, error.stack); // 에러 메시지와 스택 트레이스 출력
  }
}
export const handleWebcamElementId = (webcamRef) => async (dispatch) => {
  try {
    console.log('webcamRef:', webcamRef); // 로깅
    const webcamElementId = webcamRef.current ? webcamRef.current.id : null; // webcamRef의 current에서 id 값을 추출
    dispatch(setWebcamElementId(webcamElementId)); // setWebcamElementId action dispatch
  } catch (error) {
    console.log(error, "webcamElementId 에러");
  }
}


export const render = (dispatch) => {
  dispatch(switchRenderBool())
}

export const { switchShowCanvas, switchGameStart, setWebcamElementId, switchRenderBool, setGameRef } = gameSlice.actions;
export default gameSlice.reducer;