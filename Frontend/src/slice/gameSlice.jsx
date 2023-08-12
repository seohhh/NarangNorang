import { createSlice } from '@reduxjs/toolkit'

const gameSlice = createSlice({
    name: 'game',
    initialState : {
      showCanvas: false,
      gameStart: false
    },
    reducers: {
      switchShowCanvas(state) {
        state.showCanvas = !state.showCanvas
      },
      switchGameStart(state) {
        state.gameStart = !state.gameStart
      }
    },
  });

export const { switchShowCanvas, switchGameStart } = gameSlice.actions;
export default gameSlice.reducer;