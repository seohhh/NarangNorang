import styled from "styled-components";
import { Image } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import IntroImage from '../assets/intro/introMain.jpg';
import HeartImage from '../assets/intro/heart.png';
import EmoImage from '../assets/intro/emotion.png';
import '../App.css'

const MyDiv = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  justify-content: center;
`;
const MySpan = styled.span`
  font-family: Pretendard-bold;
`
const MyBox = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: row;
  align-Items: center;
`

const Column = styled.div`
  margin: 1rem;
  display: flex;
  flex-direction: column;
`

const color = {
  color: "#FFE600",
};

function Intro() {
  return (
    <MyDiv>
      <Column>
        <Fade cascade damping={0.2}>
          <h1>아이 발달에 도움이 되는</h1>
          <h1 style={color}>나랑노랑</h1>
          <MySpan>거실도 놀이방이 될 수 있습니다</MySpan>
          <MySpan>아이와 함께 놀이를 할 수 있다면 ?!</MySpan>
          <MySpan>아이의 친구를 집으로 초대하지 않아도 같이 놀 수 있다 ?!</MySpan>
          <MyBox>
            <Image src={HeartImage} style={{width: "70px", height: "100%"}} rounded></Image>
            <Column>
              <h3>아이와의 교감</h3>
              <MySpan>나랑노랑을 통해 아이와 교감할 수 있습니다.</MySpan>
            </Column>
          </MyBox>
          <MyBox>
            <Image src={EmoImage} style={{width: "70px", height: "100%"}} rounded></Image>
            <Column>
            <h3>아이의 정서발달</h3>
            <MySpan>나랑노랑은 아이의 정서발달을 돕습니다.</MySpan>
            </Column>
          </MyBox>
        </Fade>
      </Column>
      <Image src={IntroImage} style={{width: "530px"}} rounded></Image> 
    </MyDiv>
  );
}

export default Intro;