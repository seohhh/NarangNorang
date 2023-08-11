import React from "react";
// import { useLocation } from 'react-router-dom';
import PhotoComponent from "../components/PhotoComponent";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";

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

axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function Album() {

  const { userSeq } = useParams();
  const [userImgLst, setUserImgLst] = useState([]);

  useEffect(() => {
    axios({
      method: "GET",
      url: `/album/${userSeq}`,
    })
      .then((res) => {
        setUserImgLst(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [userSeq, userImgLst]);

  return (
    <>
      <Wrapper>
        <h1>ALBUM</h1>
        <Container>
          {userImgLst.map((photo, index) => (
            <PhotoComponent key={index} photo={photo} />
          ))}
        </Container>
      </Wrapper>
      <Footer />
    </>
  );
}

export default Album;
