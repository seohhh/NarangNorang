import { Route, Routes, useLocation } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';
import './App.css'
import styled from 'styled-components';
// import PrivateRoute from './components/PrivateRoute';

// page
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Album from './pages/Album';
import Contents from './pages/Contents';
import Room from './pages/Room';

const Wrapper = styled.div`
  font-family: Happiness-Sans-Bold;
`;

function App() {
  const location = useLocation();
  const isNavVisible = !(location.pathname === '/login' || location.pathname === '/signup');

  return (
    <Wrapper>
        {isNavVisible && <Nav />}
        <div>
          <Routes>
            <Route path="/" element={<Main />} />
            <Route path="/contents" element={<Contents />} />
            {/* <PrivateRoute path="/album" element={<Album />} /> */}
            <Route path="/album" element={<Album />} />
            <Route is path="/login" element={<Login />} />
            <Route path="/signup" element={<Signup />} />
            <Route path="/room" element={<Room />} />
            {/* <Route path="/test" element={<VideoRoom />} /> */}
          </Routes>
        </div>
    </Wrapper>
  );
}

export default App;