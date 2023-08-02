import React from "react";
import styled from "styled-components";
import mainImage from "../assets/mainImage.png";

// styled-components를 사용하여 그라데이션 배경을 갖는 컨테이너 컴포넌트 생성
const GradientBackground = styled.div`
  background: linear-gradient(to bottom, #FFF9BE, #FFFFFF); /* 그라데이션 스타일 설정 */
  min-height: 100vh; /* 최소 높이 설정 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center; /* h1 태그들 가운데 정렬을 위해 추가 */
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between; /* 가로 방향으로 양 옆으로 배치 */
  max-width: 800px; /* 원하는 가로 폭 설정 */
  width: 100%; /* 부모 컨테이너에 가로 영역 전체 사용 */
`;

const MainImage = styled.img`
  flex: 1; /* 이미지 부분이 화면 가로 방향을 반반으로 차지 */
  max-width: 50%; /* 이미지는 반반으로 차지하도록 설정 */
  height: auto;
`;

const TextContent = styled.div`
  flex: 1; /* 텍스트 부분이 화면 가로 방향을 반반으로 차지 */
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

function Main() {
  return (
    <GradientBackground>
      <MainContent>
        <TextContent> {/* 왼쪽 영역 */}
          <h1>나랑노랑에서</h1>
          <br />
          <h1>아이와 함께 즐거운 추억을 쌓아보세요</h1>
        </TextContent>
        <MainImage src={mainImage} alt="Main Image" /> {/* 오른쪽 영역 */}
      </MainContent>
    </GradientBackground>
  );
}

export default Main;