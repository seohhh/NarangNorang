import { BrowserRouter, Route, Routes } from "react-router-dom";
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
import Room from './pages/Room';
import Contents from './components/ContentsComponent';

const Wrapper = styled.div`
  font-family: Happiness-Sans-Bold;
  font-weight: bold;
  `;

function App() {
  return (
    <Wrapper>
      <BrowserRouter>
        <Nav></Nav>
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
      </BrowserRouter>
    </Wrapper>
  );
}

export default App;