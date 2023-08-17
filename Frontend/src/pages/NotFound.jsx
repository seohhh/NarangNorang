import React from "react";
import styled from "styled-components";
import notfound from "../assets/notfound.gif"

const Container = styled.div`
  height: 79vh;
  font-family: 'GmarketSansMedium';
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  margin-top: 0;
`

const NotFound = () => {
  return (
    <Container>
      <h1>404 not found</h1>
      <div style={{fontSize: "1.3rem"}}>잘못된 접근입니다</div>
      <img src={notfound} alt="notfound" />
    </Container>
  )
}

export default NotFound;