import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';
// page
import Main from './pages/Main';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Album from './pages/Album';
import Contents from './pages/Contents';

function App() {
  return (
    <BrowserRouter>
      <Nav></Nav>
      <div>
        <Routes>
          <Route path="/" element={<Main />} />
          <Route path="/contents" element={<Contents />} />
          <Route path="/album" element={<Album />} />
          <Route is path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
