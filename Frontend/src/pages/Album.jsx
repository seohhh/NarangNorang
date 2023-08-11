import React from "react";
// import { useLocation } from 'react-router-dom';
import PhotoComponent from "../components/PhotoComponent";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useParams } from 'react-router-dom';
import axios from 'axios'

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
`;

const imgFilenames = ["dog1.jpg", "dog2.jpg", "dog3.jpg", "dog4.jpg", "dog5.jpg"];
const ImgLst = imgFilenames.map((filename) => require(`../assets/album/${filename}`));

axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

function Album() {
  const { userSeq } = useParams();
  console.log(userSeq);

  axios({
    method: 'GET',
    url: `/album/${userSeq}`,
  })
  .then((res) => {
    console.log(res)
  })
  .catch((err) => {
    console.log(err)
  })
  
  return (
    <>
      <Wrapper>
        <h1>ALBUM</h1>
        <Container>
          {ImgLst.map((imgSrc, index) => (
            <PhotoComponent key={index} imgSrc={imgSrc} />
          ))}
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Album;
