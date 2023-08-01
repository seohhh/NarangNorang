import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'http://localhost:8080/api/v1'

const authSlice = createSlice({
  name: 'auth',
  initialState : {
    isLoggedin: false,
    user: null,
    error : null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedin = true
      state.user = action.payload
      state.error = null
      console.log(state.isLoggedin)
    },
    loginFailure(state, action) {
      state.isLoggedin = false
      state.user = null
      state.error = action.payload
    },
    logoutSuccess(state) {
      state.isLoggedin = false
      state.user = null
      state.error = null
    }
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions

export const signUp = (member_id, password, member_name, member_nickname, member_email, member_phone) => async (dispatch) => {
  axios({
    method: 'POST',
    url: 'member',
    data: {member_id, password, member_name, member_nickname, member_email, member_phone}
  })
  .then((res) => {
    console.log(res)
    // const user = response.data
    // dispatch(signupSuccess(user))
  })
  .catch((err) => {
    console.log(member_id, password, member_name, member_nickname, member_email, member_phone)
    console.log(err)
  })
}


export const login = (member_id, password) => async (dispatch) => {
  try {
    // API 요청을 보내는 부분
    const response = await axios.post('/auth/login', { member_id, password })
    // 로그인 성공
    console.log('로그인 성공')
    const user = response.data
    dispatch(loginSuccess(user))
  } catch (error) {
    // 로그인 실패
    console.log('로그인 실패')
    dispatch(loginFailure())
  }
}

export const logout = () => async (dispatch) => {
  try {
    // API 요청을 보내는 부분
    // const response = await axios.post('/api/logout')
    // 로그아웃 성공
    // const user = response.data
    console.log('로그아웃')
    dispatch(logoutSuccess())
  } catch (error) {
    // 로그인 실패
    console.log('로그아웃 실패')
    console.log(error)
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
