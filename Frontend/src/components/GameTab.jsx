import React, { useState } from 'react';
import { Card, Modal } from "react-bootstrap";
import { Fade } from "react-awesome-reveal";
import DialogContent from "@mui/material/DialogContent";
import Tab from "react-bootstrap/Tab";
import Tabs from "react-bootstrap/Tabs";
import StretchingCard from "./StretchingCard";
import "./GameTab.css"

// photo
import animalGame from "../assets/animalGame.png";
import mosquitoGame from "../assets/mosquitoGame.png";


function GameTab (props) {
  const gameStatusStart = props.gameStatusStart
  const setStretchingStatus = props.setStretchingStatus

  const [show, setShow] = useState(false)
  const handleClose = () => setShow(false);
  const handleShow = () => {
    setShow(true);
    setTimeout(() => {
      handleClose();
    }, 500);
  }

  return (
    <DialogContent style={{height: "750px"}}>
      <div style={{diplay: "flex", justifyContent: "center", alignItems: "center"}}>

      </div>
      <Tabs
        id="controlled-tab-example"
        className="mb-3"
        style={{fontSize: "25px", backgroundColor: "white"}}
      >
        <Tab eventKey="game" title="게임" style={{margin: "0"}}>
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
                    <div
                      className="btn startBtn"
                      onClick={gameStatusStart}
                    >
                      시작하기
                    </div>
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
                    <div
                      className="btn startBtn"
                      onClick={handleShow}
                    >
                      시작하기
                    </div>
                  </Card.Body>
                </Card>
              </div>
            </div>
          </Fade>

        </Tab>
        <Tab eventKey="stretching" title="어린이 체조">
          <Fade cascade damping={0.2}>
            <div id="cardContainer">
              <div>
                <StretchingCard videoId='etlOSulXA_8' setStretchingStatus={setStretchingStatus}/>
              </div>
              <div>
                <StretchingCard videoId='sYvmTUNGqPs' setStretchingStatus={setStretchingStatus}/>
              </div>
              <div>
                <StretchingCard videoId='y291Inw4U6Q' setStretchingStatus={setStretchingStatus}/>
              </div>
              <div>
                <StretchingCard videoId='o2spnAWEP4M' setStretchingStatus={setStretchingStatus}/>
              </div>
            </div>
          </Fade>
        </Tab>
      </Tabs>


      <Modal show={show} onHide={handleClose} style={{zIndex: "9999", display: "flex", justifyContent: "center", alignItems: "center"}}>
        <Modal.Body className='modalbody'>
          <div>게임 완성까지 조금 남았어요! <br />조금만 기다려주세요!</div>
        </Modal.Body>
      </Modal>
    </DialogContent>
  )
}

export default GameTab;