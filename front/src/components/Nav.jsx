import React from 'react';
import { Link } from 'react-router-dom';

function Nav() {
  return (
    <>
      <Link to="/">홈 </Link>
      <Link to="/contents">컨텐츠 소개 </Link>
      <Link to="/login">로그인 </Link>
      <Link to="/signin">회원가입 </Link>
    </>
  );
}

export default Nav;