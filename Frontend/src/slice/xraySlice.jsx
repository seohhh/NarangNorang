import { createSlice } from '@reduxjs/toolkit'

const xraySlice = createSlice({
    name: 'xray',
    initialState : {
      showCanvas: false
    },
    reducers: {
      switchShowCanvas(state) {
        state.showCanvas = !state.showCanvas
      },
    },
  });

export const { switchShowCanvas } = xraySlice.actions;
export default xraySlice.reducer;