import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/authSlice';
import xrayReducer from './slice/xraySlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    xray: xrayReducer,
  },
});

export default store;
