import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Nav_link = styled(Link)`
text-decoration: none;
color: black;
`

function Nav() {

  return (
    <>
      <Nav_link to="/">홈 </Nav_link>
      <Nav_link to="/contents"> 컨텐츠 소개 </Nav_link>
      <Nav_link to="/login">로그인 </Nav_link>
      <Nav_link to="/signup">회원가입 </Nav_link>
    </>
  );
}

export default Nav;