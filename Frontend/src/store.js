import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/authSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
  },
});

export default store;
