import React from "react";
import styled from "styled-components";
// import mainImg from "../assets/mainImg.jpg";
import PlayImg from "../assets/mainPlayImg.PNG";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { Fade } from "react-awesome-reveal";
import ContentsComponent from "../components/ContentsComponent";
import IntroComponent from "../components/IntroComponent";
import Ask from "../components/Ask";
import Footer from '../components/Footer';

const Container = styled.div`
  display: flex;
  margin-left: 100px;
  padding-top: 300px;
  padding-right: 600px;
  justify-content: center;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: center;
  width: 100%; /* 부모 컨테이너에 가로 영역 전체 사용 */
`;

const Button = styled.button`
  padding: 13px;
  border-radius: 20px;
  background-color: white;
  border: none;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
`;

const MainImage = styled.img`
 border-radius: 1%;
 box-shadow: 0 0 22px -9px rgba(0, 0, 0, 1);
 margin-bottom: 250px;
`;

// const TextContent = styled.div`
//   flex: 1; /* 텍스트 부분이 화면 가로 방향을 반반으로 차지 */
//   display: flex;
//   flex-direction: column;
//   justify-content: left;
//   align-items: center;
// `

const color = {
  color: "#FFE600",
};

function Main() {
  const isLoggedin = useSelector((state) => state.login.isLoggedin);

  return (
    <div>
      <Container>
        <div class="align-self-center" style={{ paddingBottom: "120px"}}>
          {" "}
          {/* 왼쪽 영역 */}
          <Fade cascade damping={0.2}>
            <div style={{ fontSize: "40px"}}>
              <span style={color}>나랑노랑</span>에서
              <div style={{ marginBottom: "40px"}}>아이와 함께 즐거운 추억을 쌓아보세요</div>
            </div>
            {isLoggedin ? (
              <Link to="/room">
                <Button>방만들기 →</Button>
              </Link>
            ) : (
              <Link to="/login">
                <Button>방만들기 →</Button>
              </Link>
            )}
          </Fade>
        </div>
      </Container>
      <MainContent>
        <MainImage src={PlayImg} alt="PlayImg" />
      </MainContent>
      <div style={{ marginBottom: "250px"}}>
        <IntroComponent />
      </div>
      <div style={{ marginBottom: "250px"}}>
        <ContentsComponent />
      </div>
      <Ask />
      <Footer />
    </div>
  );
}

export default Main;
