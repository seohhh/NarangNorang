import React from "react";
import styled from "styled-components";
import mainImg from "../assets/mainImg.png";
import PlayImg from "../assets/mainPlayImg.PNG";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ContentsComponent from "../components/ContentsComponent";
import IntroComponent from "../components/IntroComponent";
// import { Button } from "react-bootstrap";

// styled-components를 사용하여 그라데이션 배경을 갖는 컨테이너 컴포넌트 생성
const GradientBackground = styled.div`
  background: linear-gradient(
    to bottom,
    #fff9be,
    #ffffff
  ); /* 그라데이션 스타일 설정 */
  min-height: 100vh; /* 최소 높이 설정 */
  // display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* 부모 컨테이너에 가로 영역 전체 사용 */
`;

const MainImage = styled.img`
  // flex: 1; /* 이미지 부분이 화면 가로 방향을 반반으로 차지 */
  max-width: 50%; /* 이미지는 반반으로 차지하도록 설정 */
  height: auto;
`;


// const TextContent = styled.div`
//   flex: 1; /* 텍스트 부분이 화면 가로 방향을 반반으로 차지 */
//   display: flex;
//   flex-direction: column;
//   justify-content: left;
//   align-items: center;
// `

const Container = styled.div`
  display: flex;
  margin-left: 100px;
  justify-content: center;
`;

const Button = styled.button`
  padding: 13px;
  border-radius: 20px;
  background-color: white;
  border: none;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 1);
`;

const color = {
  color: "#FFE600",
};

function Main() {
  return (
    <div>
      <GradientBackground>
        <Container>
          <div class="align-self-center">
            {" "}
            {/* 왼쪽 영역 */}
            <Fade cascade damping={0.2}>
              <h1>
                <span style={color}>나랑노랑</span>에서
              </h1>
              <h1>아이와 함께 즐거운 추억을 쌓아보세요</h1>
              <br />
              <br />
              <br />
              <Link to="/room">
                <Button>방만들기 →</Button>
              </Link>
            </Fade>
          </div>
          <MainImage src={mainImg} alt="mainImg" />
        </Container>
      </GradientBackground>
      <MainContent>
        <img src={PlayImg} alt="PlayImg" />
      </MainContent>
      <IntroComponent />
      <ContentsComponent />
    </div>
  );
}

export default Main;
