import React from 'react';
import Footer from "../components/Footer";
import ContentsComponent from "../components/ContentsComponent";
import styled from "styled-components";
import Ask from "../components/Ask";

const Wrapper = styled.div`
  min-height: 100vh;
`

function Contents() {
  return (
    <>
      <Wrapper>
        <ContentsComponent />
      </Wrapper>
      <Footer />
      <Ask />
    </>
  )
}

export default Contents
