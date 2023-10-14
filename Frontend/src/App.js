import { Route, Routes, useLocation, Navigate } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';
import './App.css'
import styled from 'styled-components';
import bgImg from "./assets/bg_gradation.jpg";
import bgMain from "./assets/bg_main.jpg";

// page
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Album from './pages/Album';
import Mypage from './pages/Mypage';
import Contents from './pages/Contents';
import Waiting from './pages/Waiting';
import CustomRoom from "./pages/CustomRoom";
import Exit from "./pages/ExitRoom"
import NotFound from "./pages/NotFound";


const Wrapper = styled.div`
  background-image: ${({ isMain }) => (isMain ? `url(${bgMain})` : `url(${bgImg})`)};
  background-repeat: no-repeat;
  background-size: ${({ isMain }) => (isMain ? "contain" : "cover")};
  font-family: Happiness-Sans-Bold;
  font-weight: bold;
  `;

function App() {
  const location = useLocation();
  const isNavVisible = !(location.pathname === '/login' || location.pathname === '/signup' ||
                          location.pathname.startsWith('/waiting/') || location.pathname.startsWith('/room') ||
                          location.pathname.startsWith('/exit'));
  const isMainPage = location.pathname === '/';
  const isLoggedIn = sessionStorage.getItem('isLoggedin')
  const noBackground = (location.pathname.startsWith('/waiting/') || location.pathname.startsWith('/room') ||
                        location.pathname.startsWith('/exit'));
  const shouldShowBackground = isMainPage && !noBackground;


  return (
    <Wrapper isMain={isMainPage}
      style={{ backgroundImage: shouldShowBackground ? `url(${bgMain})` : (noBackground ? 'none' : `url(${bgImg})`) }}>
      {isNavVisible && <Nav />}
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/album/:userSeq" element={isLoggedIn ? <Album /> : <Navigate to="/login" />}/>
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room" element={<CustomRoom />} />
          <Route path="/mypage/:userId" element={<Mypage />} />
          <Route path="/waiting/:sessionId" element={<Waiting />} />
          <Route path="/exit" element={<Exit />} />
          <Route path="*" element={<Navigate to="/notfound" />} />
          <Route path="/notfound" element={<NotFound />} />
        </Routes>
      </div>
    </Wrapper>
  );
}

export default App;