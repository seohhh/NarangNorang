import React from 'react';
import { useParams } from 'react-router-dom';

function Mypage() {
  const { userId } = useParams();
  
  return (
    <>
      <h1>{userId}의 마이페이지</h1>
    </>       
  )
}

export default Mypage;