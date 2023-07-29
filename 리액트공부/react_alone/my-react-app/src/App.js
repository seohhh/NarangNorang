import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import ButtonPage from './Pages/ButtonPage';

function App() {
  return (
    <Router>
      <div>
        {/* 네비게이션 바 */}
        <nav>
          <ul>
            <li>
              <Link to="/">홈</Link>
            </li>
            <li>
              <Link to="/button">버튼 페이지</Link>
            </li>
          </ul>
        </nav>

        <hr />

        {/* 라우팅 설정 */}
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/button" element={<ButtonPage />} />
        </Routes>
      </div>
    </Router>
  );
}

// 홈 페이지 컴포넌트
function Home() {
  return <h1>리액트 예시 페이지</h1>;
}

export default App;
