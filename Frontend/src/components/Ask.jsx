import React from 'react'
import styled from "styled-components";
import ask from "../assets/ask.svg";

const Askbutton = styled.div`
  background-color: white;
  border-radius: 99px;
  position: fixed;
  right: 40px;
  bottom: 40px;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
  padding: 10px 15px;
`

const AskImg = styled.img`
  width: 30px;
  height: 30px;
  margin-bottom: 2px;
`

function Ask() {
  return (
    <Askbutton>
      <span style={{ paddingRight: "5px" }}>문의하기</span>
      <AskImg src={ask} alt="askImg" />
    </Askbutton>
  )
}

export default Ask;