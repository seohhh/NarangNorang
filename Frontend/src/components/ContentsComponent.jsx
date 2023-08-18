import styled from "styled-components";
import { Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import ContentStretchingCard from "./ContentStretchingCard";
import "./GameTab.css"

// photo
import animalGame from "../assets/animalGame.png";
import mosquitoGame from "../assets/mosquitoGame.png";

const MyDiv = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`;

function Contents() {

  return (
    <>
      <MyDiv>  
        <Fade cascade damping={0.2} style={{width: "70%", justifyContent:"center"}}>
        <Tabs
          id="controlled-tab-example"
          className="mb-3"
          style={{fontSize: "25px"}}
        >
          <Tab eventKey="game" title="게임">
            <Fade cascade damping={0.2}>
              <div id="cardContainer">
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      margin: "3rem",
                      border: "0px"
                    }}
                  >
                    <Card.Img variant="top" src={animalGame} style={{width: "384px", height: "285px", objectFit: "fill"}}/>
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        동물 따라해봐요
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem 1rem 2rem 1rem" }}>
                        함께 춤추며 동물의 동작을 따라해보아요!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      margin: "3rem",
                      border: "0px"
                    }}
                  >
                    <Card.Img variant="top" src={mosquitoGame} />
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        대왕모기 잡자
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem 1rem 2rem 1rem" }}>
                        노래에 맞춰 모기를 잡아 보아요!
                      </Card.Text>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Fade>

          </Tab>
          <Tab eventKey="stretching" title="어린이 체조">
            <Fade cascade damping={0.2}>
              <div className="row" id="cardContainer" 
              style={{display:"flex", justifyContent: "center", alignContent:"center"}}>
                <div className="col-6">
                  <ContentStretchingCard videoId='etlOSulXA_8' />
                </div>
                <div className="col-6">
                  <ContentStretchingCard videoId='sYvmTUNGqPs' />
                </div>
                <div className="col-6">
                  <ContentStretchingCard videoId='y291Inw4U6Q' />
                </div>
                <div className="col-6">
                  <ContentStretchingCard videoId='o2spnAWEP4M' />
                </div>
              </div>
            </Fade>
          </Tab>
        </Tabs>
        </Fade>
      </MyDiv>
    </>
  );
}

export default Contents;
