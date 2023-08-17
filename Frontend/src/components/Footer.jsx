import React from "react";
import styled from "styled-components";
import KakaoImg from "../assets/footer/kakao.png";
import InstaImg from "../assets/footer/instagram.png";
import BlogImg from "../assets/footer/blog.png";
import LogoImg from "../assets/footer/logo.png";

const Wrapper = styled.div`
  height: auto;
  display: flex;
  flex-direction: column;
  background-color: #fff389;
  align-items: center;
  position: relative;
  transform: translatY(0%);
  bottom: 0;
`;

const Top = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
  margin-bottom: 2rem;
  color: grey;
`;

const Bottom = styled.div`
  font-family: 'Pretendard-bold';
  width: 60%;
  margin-bottom: 2rem;
  margin-left: 20px;
  color: grey;
  display: flex;
  justify-content: flex-start;
`;

const Line = styled.div`
  width: 60%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin: 25px 0 7px; 
`

const ImgContainer = styled.img`
  margin-left: 2rem; 
  width: 40px;
`

function Footer() {
  return (
    <Wrapper>
      <Top>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={LogoImg} alt="LogoImg" style={{ width: "50px" }}/>
          <span style={{ marginLeft: "1rem", fontSize: "18pt" }}>나랑노랑</span>
        </div>
        <div>
          <ImgContainer src={InstaImg} alt="InstaImg" />
          <ImgContainer src={BlogImg} alt="BlogImg" />
          <ImgContainer src={KakaoImg} alt="KakaoImg" />
        </div>
      </Top>
      <Line />
      <Bottom>
        <div>나랑노랑 © 2023. All rights reserved by C208</div>
      </Bottom>
    </Wrapper>
  );
}

export default Footer;
