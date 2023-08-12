import { configureStore } from '@reduxjs/toolkit';
import loginReducer from './slice/authSlice';
import gameReducer from './slice/gameSlice';

const store = configureStore({
  reducer: {
    login: loginReducer,
    game: gameReducer,
  },
});

export default store;
