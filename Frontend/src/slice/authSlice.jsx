import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

const authSlice = createSlice({
  name: 'auth',
  initialState : {
    isLoggedin: sessionStorage.getItem('isLoggedin') === 'true',
    // isLoggedin: false,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    userNickname: null,
    userId: JSON.parse(sessionStorage.getItem('userId')) || null,
    token: null,
    error : null,
    userSeq: null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedin = true
      state.user = action.payload[0]
      state.userNickname = action.payload[0].memberNickname
      state.userSeq = action.payload[0].memberSeq
      state.error = null
      state.token = action.payload[0].accessToken
      state.userId = action.payload[1]
      sessionStorage.setItem('isLoggedin', 'true');
      sessionStorage.setItem('user', JSON.stringify(action.payload[0]));
      sessionStorage.setItem('userId', JSON.stringify(action.payload[1]));
      sessionStorage.setItem('userSeq', JSON.stringify(action.payload[0].memberSeq));
      sessionStorage.setItem('userNickname', JSON.stringify(action.payload[0].memberNickname));
    },
    loginFailure(state, action) {
      state.isLoggedin = false
      state.user = null 
      state.error = action.payload
      sessionStorage.removeItem('isLoggedin');
      sessionStorage.removeItem('user');
    },
    logoutSuccess(state) {
      state.isLoggedin = false
      state.user = null
      state.error = null
      state.token = null
      state.userNickname = null
      state.userId = null
      sessionStorage.removeItem('isLoggedin');
      sessionStorage.removeItem('user');
      sessionStorage.removeItem('userSeq');
      sessionStorage.removeItem('userNickname');
      sessionStorage.removeItem('userId');
    }
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions

export const login = (user) => async (dispatch) => {
  try {
    dispatch(loginSuccess(user))
  } catch (error) {
    console.log(error)
  }
}

export const logout = (token) => async (dispatch) => {
  try {
    // API 요청을 보내는 부분
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    await axios.post('/auth/logout', null, {headers})
    // 로그아웃 성공
    dispatch(logoutSuccess())
  } catch (error) {
    // 로그인 실패
    console.log('로그아웃 실패', error)
  }
}

// export const deleteUser = () => async (dispatch, getState) => {
//   try {
//     const { user } = getState().auth;

//     // API 요청을 보내는 부분
//     await axios.delete(`/api/deleteUser/${user}`)

//     // 회원 탈퇴 성공
//     dispatch(logoutSuccess())
//   } catch (error) {
//     // 회원 탈퇴 실패
//     console.log('회원탈퇴 실패')
//     console.log(error)
//     dispatch(loginFailure())
//   }
// }

export default authSlice.reducer;
