import React from "react";
import { Navbar, Nav } from "react-bootstrap"; // React Bootstrap에서 가져온 Navbar와 Nav 컴포넌트
import { Link } from "react-router-dom"; // react-router-dom에서 가져온 Link 컴포넌트
import styled from "styled-components"; // styled-components를 가져옴
import logo from "../assets/logo.png"; // 로고 이미지 파일의 경로를 설정

// styled-components를 사용하여 스타일링된 링크 컴포넌트 생성
const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
`;

// 컴포넌트를 정의하는 함수
function CustomNavbar() {
  return (
    <>
      {/* 네비게이션 바 컴포넌트 시작 */}
      <Navbar style={{ backgroundColor: "#FFF9BE" }} expand="lg">
        {/* 네비게이션 바 브랜드 영역 시작 */}
        <Navbar.Brand href="/">
          <img
            src={logo} // 로고 이미지 파일 경로 설정
            height="50" // 로고 이미지 높이 설정
            className="d-inline-block align-top" // 부트스트랩 스타일 클래스 설정
            alt="Logo" // 대체 텍스트 설정
          />
          {/* 로고 이미지의 크기와 alt 속성을 적절히 설정해주세요 */}
        </Navbar.Brand>
        {/* 네비게이션 바 브랜드 영역 끝 */}
        
        {/* 햄버거 아이콘을 클릭하여 네비게이션 메뉴 토글 */}
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        
        {/* 네비게이션 바 메뉴 영역 시작 */}
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="ml-auto"> {/* ml-auto는 메뉴를 오른쪽으로 정렬 */}
            {/* 커스텀 스타일의 링크 컴포넌트들 */}
            <NavLink to="/">홈 </NavLink>
            <NavLink to="/contents"> 컨텐츠 소개 </NavLink>
            <NavLink to="/login">로그인 </NavLink>
            <NavLink to="/signup">회원가입 </NavLink>
          </Nav>
        </Navbar.Collapse>
        {/* 네비게이션 바 메뉴 영역 끝 */}
      </Navbar>
      {/* 네비게이션 바 컴포넌트 끝 */}
    </>
  );
}

export default CustomNavbar; // 컴포넌트를 다른 곳에서 사용할 수 있도록 내보내기
