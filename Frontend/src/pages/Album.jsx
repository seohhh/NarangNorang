import React from "react";
// import { useLocation } from 'react-router-dom';
import PhotoComponent from "../components/PhotoComponent";
import styled from "styled-components";
import Footer from "../components/Footer";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import { useState, useEffect } from "react";
import Ask from "../components/Ask";
import { div } from "@tensorflow/tfjs-core";


const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  min-height: 80vh;
  position: relative;
  padding-bottom: 60px;
  position: relative;
  width: 80vw;
`;

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: center;
  flex: 1;
`;

const RoomBtn = styled.div`
  width: 100%;
  font-size: 1.1rem;
  padding: 13px;
  border-radius: 20px;
  background-color: white;
  border: none;
  box-shadow: 0 0 20px -10px rgba(0, 0, 0, 2);
  transition: transform 0.3s ease;

  &:hover{
    transform: scale(1.1);
  }
`
const NavLink = styled(Link)`
  text-decoration: none;
  color: black;
  margin: 16px;
  font-size: 1.1rem;
 `


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
      <div style={{display: "flex", justifyContent: "center"}}>
        <Wrapper>
          {userImgLst.length ? (
            <>
              <Container>
                {userImgLst.map((photo, index) => (
                  <PhotoComponent key={index} photo={photo} />
                ))}
              </Container>
            </>
            ) : (
              <>
                <div style={{fontSize: "2rem", margin: "10%", display: "flex", alignItems: "center", flexDirection: "column"}}>
                  <div>아직 저장된 사진이 없습니다</div>
                  <div style={{marginBottom: "5%"}}>아이와 함께 사진을 남겨보세요</div>
                  <NavLink to="/room">
                    <RoomBtn>방만들기 →</RoomBtn>
                  </NavLink>
                </div>
              </>
            )}
          <Ask />
        </Wrapper>
      </div>
      <Footer />
    </>
  );
}

export default Album;
