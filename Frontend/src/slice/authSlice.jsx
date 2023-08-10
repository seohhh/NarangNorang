import { createSlice } from '@reduxjs/toolkit'
import axios from 'axios'

axios.defaults.baseURL = 'http://3.36.126.169:8080/api/v1'

const authSlice = createSlice({
  name: 'auth',
  initialState : {
    isLoggedin: sessionStorage.getItem('isLoggedin') === 'true',
    // isLoggedin: false,
    user: JSON.parse(sessionStorage.getItem('user')) || null,
    userNickname: null,
    userId: null,
    token: null,
    error : null,
  },
  reducers: {
    loginSuccess(state, action) {
      state.isLoggedin = true
      state.user = action.payload[0]
      state.userNickname = action.payload[0].memberNickname
      console.log(state.userNickname, "로그인 시 유저닉네임")
      state.error = null
      state.token = action.payload[0].accessToken
      state.userId = action.payload[1]
      sessionStorage.setItem('isLoggedin', 'true');
      sessionStorage.setItem('user', JSON.stringify(action.payload[0]));
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
    }
  },
});

export const { loginSuccess, loginFailure, logoutSuccess } = authSlice.actions

export const signUp = (memberId, memberPassword, memberName, memberNickname, memberEmail) => async (dispatch) => {
  axios({
    method: 'POST',
    url: '/member',
    data: {memberId, memberPassword, memberName, memberNickname, memberEmail}
  })
  .then((res) => {
    console.log(res)
    // const user = response.data
    // dispatch(signupSuccess(user))
  })
  .catch((err) => {
    console.log(memberId, memberPassword, memberName, memberNickname, memberEmail)
    console.log(err)
  })
}


export const login = (memberId, memberPassword) => async (dispatch) => {
  try {
    // API 요청을 보내는 부분
    const response = await axios.post('/auth/login', { memberId, memberPassword })
    // 로그인 성공
    console.log('로그인 성공', response.data.memberNickname)
    const user = [response.data, memberId] 
    dispatch(loginSuccess(user))
  } catch (error) {
    // 로그인 실패
    console.log('로그인 실패')
    dispatch(loginFailure())
  }
}

export const logout = (token) => async (dispatch) => {
  try {
    // API 요청을 보내는 부분
    const headers = {
      Authorization: `Bearer ${token}`,
    };
    const response = await axios.post('/auth/logout', null, {headers})
    // 로그아웃 성공
    console.log('로그아웃 성공', response)
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
