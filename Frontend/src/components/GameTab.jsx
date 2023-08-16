import React from 'react';
import { Card } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import stopImage from "../assets/contents/stop.png";
import tryImage from "../assets/contents/try.png";
import DialogContent from "@mui/material/DialogContent";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import "./GameTab.css"


function GameTab (props) {
  const gameStatusChanged = props.gameStatusChanged
  const setStretchingStatus = props.setStretchingStatus

  return (
    <DialogContent style={{height: "750px"}}>
      <Tabs
        id="controlled-tab-example"
        className="mb-3"
        style={{fontSize: "25px"}}
      >
        <Tab eventKey="game" title="게임">
          <div id="content">
            <Fade cascade damping={0.2}>
              <div id="cardContainer">
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      height: "30rem",
                      margin: "3rem",
                      paddingBottom: "3rem"
                    }}
                  >
                    <Card.Img variant="top" src={tryImage} />
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        동물 따라해봐요
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem" }}>
                        함께 춤추며 동물의 동작을 따라해보아요!
                      </Card.Text>
                      <div
                        className="btn btn-warning"
                        style={{ position: "absolute" }}
                        onClick={gameStatusChanged}
                      >
                        동물 따라해봐요 시작!
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      height: "30rem",
                      margin: "3rem",
                    }}
                  >
                    <Card.Img variant="top" src={stopImage} />
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        대왕모기 잡자
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem" }}>
                        노래에 맞춰 멈춰라!!
                      </Card.Text>
                      <div
                        className="btn btn-warning"
                        style={{ position: "absolute" }}
                        onClick={gameStatusChanged}
                      >
                        대왕모기 잡자 시작!
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Fade>
          </div>
        </Tab>
        <Tab eventKey="stretching" title="어린이 체조">
        <div id="content">
            <Fade cascade damping={0.2}>
              <div id="cardContainer">
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      height: "30rem",
                      margin: "3rem",
                    }}
                  >
                    <Card.Img variant="top" src="https://img.youtube.com/vi/etlOSulXA_8/maxresdefault.jpg" />
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        아이 뛰움 체조
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem" }}>
                        함께 춤추며 동물의 동작을 따라해보아요!
                      </Card.Text>
                      <div
                        className="btn btn-warning"
                        style={{ position: "absolute" }}
                        onClick={() => setStretchingStatus('etlOSulXA_8')}
                      >
                        아이 뛰움 체조 시작!
                      </div>
                    </Card.Body>
                  </Card>
                </div>
                <div>
                  <Card
                    style={{
                      width: "24rem",
                      height: "30rem",
                      margin: "3rem",
                    }}
                  >
                    <Card.Img variant="top" src="https://img.youtube.com/vi/sYvmTUNGqPs/maxresdefault.jpg" />
                    <Card.Body>
                      <Card.Title style={{ margin: "1rem" }}>
                        콩순이
                      </Card.Title>
                      <Card.Text style={{ margin: "1rem" }}>
                        노래에 맞춰 멈춰라!!
                      </Card.Text>
                      <div
                        className="btn btn-warning"
                        style={{ position: "absolute" }}
                        onClick={() => setStretchingStatus('sYvmTUNGqPs')}
                      >
                        콩순이 시작!
                      </div>
                    </Card.Body>
                  </Card>
                </div>
              </div>
            </Fade>
          </div>
        </Tab>
      </Tabs>
    </DialogContent>
  )
}

export default GameTab;