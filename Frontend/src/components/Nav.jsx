import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom"; // react-router-dom에서 가져온 Link 컴포넌트
import styled from "styled-components"; // styled-components를 가져옴
import logo from "../assets/logo.png"; // 로고 이미지 파일의 경로를 설정
import { logout } from "../slice/authSlice";


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:transparent;
  padding: 35px 80px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 16px;
  font-size: 1.1rem;

  &:hover{
    color: #656565;
  }
 `

 const UserBtn = styled.div`
  padding: 10px;
  border-radius: 10px;
  background-color: white;
  border: none;

  &:hover{
    background-color: #EEEEEE;
  }
 `
const NoUnderLine = styled(Link)`
  text-decoration: none;
  color: black;
`

// 컴포넌트를 정의하는 함수
function CustomNavbar() {
  const isLoggedin = sessionStorage.getItem('isLoggedin')
  const token = useSelector(state => state.login.token);
  const userId = useSelector(state => state.login.userId);
  const userSeq = sessionStorage.getItem('userSeq')
  const navigate = useNavigate();

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout(token));
    navigate('/');
  }

  return (
    <Wrapper className="container">
      <div className="align-self-center">
        <Link to="/">
          <img
            src={logo}
            height="85"
            alt="Logo"
          />
        </Link>
      </div>
      <div className="align-self-center">
        <NavLink to="/contents">컨텐츠 소개</NavLink>
        <NavLink to={`/album/${userSeq}`}>앨범</NavLink>
        {isLoggedin ?
          <NavLink to={`/mypage/${userId}`}>마이페이지</NavLink>
          : <NavLink to="/signup">회원가입</NavLink>}
      </div>
      <div className="align-self-center">
        {isLoggedin ? 
          <UserBtn variant="light" onClick={handleLogout}>로그아웃</UserBtn>
          : <NoUnderLine to="/login"><UserBtn variant="light">&nbsp;&nbsp;로그인&nbsp;&nbsp;</UserBtn></NoUnderLine>}
      </div>
    </Wrapper>
  );
}

export default CustomNavbar;