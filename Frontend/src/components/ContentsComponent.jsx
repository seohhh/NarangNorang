import styled from "styled-components";
import { Card, Button } from "react-bootstrap";
import roroImage from "../assets/contents/roro.png";
import powerImage from "../assets/contents/power.png";
import stopImage from "../assets/contents/stop.png";
import tryImage from "../assets/contents/try.png";

const MyDiv = styled.div`
  margin: 3rem;
  display: flex;
  flex-direction: column;
  align-items: center;
`;

const MyCard = styled.div`
  width: 50%;
  display: flex;
  flex-wrap: wrap;
  flex-direction: row;
  justify-content: space-around;

`

function Contents() {
  return (
    <MyDiv>
      <h1>컨텐츠 소개</h1>
      <MyCard>
        <Card style={{ width: "24rem", margin: "3rem"}}>
          <Card.Img variant="top" src={powerImage} />
          <Card.Body>
            <Card.Title style={{margin: "1rem"}}>어린이 체조</Card.Title>
            <Card.Text style={{margin: "1rem"}}>
              태권도 동작을 음악 및 기타 악기에 맞추어 다양하게 구성한 체조형 동작 성장 발달에 도움이 됩니다.
            </Card.Text>
          </Card.Body>
        </Card> 
        <Card style={{ width: "24rem", margin: "3rem"}}>
          <Card.Img variant="top" src={roroImage} />
          <Card.Body>
            <Card.Title style={{margin: "1rem"}}>어린이 율동</Card.Title>
            <Card.Text style={{margin: "1rem"}}>
              아이에게 정신적인 발달과 심리적인 안정을 주는 율동, 아이들이 음악에 맞춰 즐겁게 율동을 즐길 수 있습니다.
            </Card.Text>
          </Card.Body>
        </Card> 
        <Card style={{ width: "24rem", margin: "3rem"}}>
          <Card.Img variant="top" src={stopImage} />
          <Card.Body>
            <Card.Title style={{margin: "1rem"}}>그대로 멈춰라</Card.Title>
            <Card.Text style={{margin: "1rem"}}>
              노래에 맞춰 멈춰라!! 노래가 다시 시작되기 전까지 움직이지 않는다면 좋은 결과를 받을 수 있을 거에요.
            </Card.Text>
          </Card.Body>
        </Card> 
        <Card style={{ width: "24rem", margin: "3rem"}}>
          <Card.Img variant="top" src={tryImage} />
          <Card.Body>
            <Card.Title style={{margin: "1rem"}}>날 따라해봐요</Card.Title>
            <Card.Text style={{margin: "1rem"}}>
              술래의 자세를 따라해보세요. 잘 따라 한다면 좋은 결과를 받을 수 있을 거에요.
            </Card.Text>
          </Card.Body>
        </Card> 
      </MyCard>
      <Button variant="outline-warning" size="lg">더 알아보기</Button>
    </MyDiv>
  );
}

export default Contents;
