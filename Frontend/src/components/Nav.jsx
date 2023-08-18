import React, { useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import logo from "../assets/logo.png";
import { logout } from "../slice/authSlice";


const Wrapper = styled.div`
  display: flex;
  justify-content: space-between;
  background-color:transparent;
  padding: 35px 150px;
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

function CustomNavbar() {
  const isLoggedin = sessionStorage.getItem('isLoggedin')
  const user = JSON.parse(sessionStorage.getItem('user'));
  const userId = JSON.parse(sessionStorage.getItem('userId'))
  const userSeq = sessionStorage.getItem('userSeq')
  const [token, setToken] = useState(null)
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      setToken(user.accessToken)
    }
  }, [user])

  const dispatch = useDispatch()
  const handleLogout = () => {
    dispatch(logout(token));
    navigate('/');
  }

  return (
    <Wrapper>
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