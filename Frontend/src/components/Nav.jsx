import React from "react";
import { useSelector, useDispatch } from 'react-redux';
import { Navbar, Nav, Button } from "react-bootstrap"; // React Bootstrap에서 가져온 Navbar와 Nav 컴포넌트
import { Link } from "react-router-dom"; // react-router-dom에서 가져온 Link 컴포넌트
import styled from "styled-components"; // styled-components를 가져옴
import logo from "../assets/logo.png"; // 로고 이미지 파일의 경로를 설정
// import { logout } from "../slice/authSlice";


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color: #FFF9BE;
  padding: 35px 80px;
`

const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 16px;
`

// 컴포넌트를 정의하는 함수
function CustomNavbar() {
  const isLoggedin = useSelector(state => state.login.isLoggedin);
  // const dispatch = useDispatch()

  // const handleLogout = () => {
  //   dispatch(logout())}

  return (
    <Wrapper class="container">
      <div class="align-self-center">
        <Link to="/">
          <img
            src={logo} // 로고 이미지 파일 경로 설정
            height="70" // 로고 이미지 높이 설정
            alt="Logo" // 대체 텍스트 설정
          />
        </Link>
      </div>
      <div class="align-self-center">
        <NavLink to="/contents">컨텐츠 소개</NavLink>
        <NavLink to="/album">앨범</NavLink>
        <NavLink to="/signup">회원가입</NavLink>
      </div>
      <div class="align-self-center">
        {isLoggedin ? 
          <Button variant="light" >로그아웃</Button>
          : <NavLink to="/login"><Button variant="light">로그인</Button></NavLink>}
      </div>
    </Wrapper>
  );
}

export default CustomNavbar; // 컴포넌트를 다른 곳에서 사용할 수 있도록 내보내기