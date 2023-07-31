import { BrowserRouter, Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";
import Nav from './components/Nav';
// page
import Main from './pages/Main';
import Login from './pages/Login';
import Signin from './pages/Signin';
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
          <Route path="/login" element={<Login />} />
          <Route path="/signin" element={<Signin />} />
        </Routes>
      </div>
    </BrowserRouter>
  );
}

export default App;
