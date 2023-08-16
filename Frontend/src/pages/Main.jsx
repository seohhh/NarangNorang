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
import "./Main.css";

const Container = styled.div`
  display: flex;
  margin-left: 100px;
  padding-top: 300px;
  padding-right: 600px;
  justify-content: center;
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
        <div className="align-self-center" style={{ paddingBottom: "15%"}}>
          {" "}
          {/* 왼쪽 영역 */}
          <Fade cascade damping={0.2}>
            <div style={{ fontSize: "40px"}}>
              <span style={color}>나랑노랑</span>에서
              <div style={{ marginBottom: "40px"}}>아이와 함께 즐거운 추억을 쌓아보세요</div>
            </div>
            {isLoggedin ? (
              <Link to="/room">
                <button id="button">방만들기 →</button>
              </Link>
            ) : (
              <Link to="/login">
                <button id="button">방만들기 →</button>
              </Link>
            )}
          </Fade>
        </div>
      </Container>
      <div id="mainContent">
        <img id="mainImage" src={PlayImg} alt="PlayImg" />
      </div>
      <div style={{marginBottom: "150px"}}>
        <IntroComponent />
      </div>
      <div style={{marginBottom: "150px"}}>
        <ContentsComponent />
        <Link to="/contents" style={{display:"flex", justifyContent:"center", flexDirection:"column", alignContent:"center", 
        textDecorationLine:"none"}}>
          {/* <Button style={{width:"10%"}} variant="outline-warning" size="lg">더 알아보기</Button> */}
        </Link>
      </div>
      <Ask />
      <Footer />
    </div>
  );
}

export default Main;
