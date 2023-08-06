import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';
import './App.css'
import styled from 'styled-components';
import bgImg from "./assets/bg_gradation.jpg";
import bgMain from "./assets/bg_main.jpg";
// import PrivateRoute from './components/PrivateRoute';

// page
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Album from './pages/Album';
import Room from './pages/Room';
import Contents from './components/ContentsComponent';

const Wrapper = styled.div`
  background-image: url(${bgImg});
  background-image: ${({ isMain }) => isMain && `url(${bgMain})`};
  background-repeat: no-repeat;
  background-size: contain;
  font-family: Happiness-Sans-Bold;
  font-weight: bold;
  `;

function App() {
  const location = useLocation();
  const isNavVisible = !(location.pathname === '/login' || location.pathname === '/signup');
  const isMainPage = location.pathname === '/';

  return (
    <Wrapper isMain={isMainPage}>
      {isNavVisible && <Nav />}
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          {/* <PrivateRoute path="/album" element={<Album />} /> */}
          <Route path="/contents" element={<Contents />}></Route>
          <Route path="/album" element={<Album />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/room" element={<Room />} />
          {/* <Route path="/test" element={<VideoRoom />} /> */}
        </Routes>
      </div>
    </Wrapper>
  );
}

export default App;