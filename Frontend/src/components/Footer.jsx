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
`;
const Top = styled.div`
  display: flex;
  width: 50%;
  flex-direction: row;
  justify-content: space-around;
  align-items: center;
  margin-top: 3rem;
  color: grey;

`;

const Bottom = styled.div`
  margin-bottom: 1rem;
  color: grey;
`;

const Line = styled.div`
  width: 60%;
  text-align: center;
  border-bottom: 1px solid #aaa;
  line-height: 0.1em;
  margin: 25px 0 20px; 
`

function Footer() {
  return (
    <Wrapper>
      <Top>
        <div style={{ display: "flex", alignItems: "center" }}>
          <img src={LogoImg} alt="" />
          <span style={{ marginLeft: "1rem", fontSize: "25pt" }}>나랑노랑</span>
        </div>
        <div>
          <img src={InstaImg} alt="" style={{ marginLeft: "2rem" }} />
          <img src={KakaoImg} alt="" style={{ marginLeft: "2rem" }} />
          <img src={BlogImg} alt="" style={{ marginLeft: "2rem" }} />
        </div>
      </Top>
      <Line />
      <Bottom>
        <span>나랑노랑</span>
        <span>나랑노랑 © 2023. All rights reserved by C208</span>
      </Bottom>
    </Wrapper>
  );
}

export default Footer;
