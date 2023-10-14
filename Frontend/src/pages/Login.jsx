import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginImg from "../assets/loginImg.png";
import { Form, Button, InputGroup, Modal } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import axios from "axios";


axios.defaults.baseURL = 'https://i9c208.p.ssafy.io/api/v1'

const Container = styled.div`
  display: flex;
  width: 100vw;
  height: 100vh;
  display: flex;
  justify-content: center;
`

const ImgContent = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #FFEC81;
  width: 45vw;
`

const TextContent = styled.div`
  background-color: white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 55vw;
`;

const LoginForm = styled(Form)`
  width: 80%;
  padding: 50px 20px 20px 20px;
`;

const StyledFormLabelContainer = styled.div`
  // text-align: left;
  // padding: 0px 0px 0px 10px;
`;

const NavLink = styled(Link)`
  text-decoration: none;
  color: grey;
  margin-bottom: 5px;
`

// eslint-disable-next-line no-unused-vars
const TogglePasswordButton = styled(Button)`
  cursor: pointer;
  display: none; /* showPassword 버튼 숨기기 */
`;


function Login() {
  const [memberId, setMemberId] = useState("");
  const [memberPassword, setMemberPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [show, setShow] = useState(false);
  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  const isLoggedin = useSelector((state) => state.login.isLoggedin);

  useEffect(() => {
    // isLoggedin 값이 변경되었을 때 실행
    if (isLoggedin === true) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const handleMemberId = (e) => {
    setMemberId(e.target.value);
  };

  const handleMemberPassword = (e) => {
    setMemberPassword(e.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onClickLogin = (e) => {
    e.preventDefault();

    axios({
      method: 'POST',
      url: '/auth/login',
      data: { memberId, memberPassword }
    })
    .then((res) => {
      const user = [res.data, memberId] 
      dispatch(login(user));
      navigate('/')
    })
    .catch((err) => {
      console.log(err, "로그인 실패")
      handleShow()
      setTimeout(() => {
        handleClose();
      }, 600);
      setMemberId('')
      setMemberPassword('')
    })

  };

  return (
    <Container>
      <ImgContent>
        <Link to="/"><img src={loginImg} alt="LoginImage" /></Link>
      </ImgContent>
      <TextContent>
        <div>
          <h1><span style={{color: "#FFE600"}}>나랑노랑</span>에 오신것을 환영합니다</h1>
        </div>
        <LoginForm>
          <Form.Group className="mb-3" controlId="formBasicEmail">
            <StyledFormLabelContainer>
              <Form.Label>아이디</Form.Label>
            </StyledFormLabelContainer>
            <Form.Control
              type="id"
              placeholder="아이디를 입력하세요."
              value={memberId}
              onChange={handleMemberId}
            />
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicPassword">
            <StyledFormLabelContainer>
              <Form.Label>비밀번호</Form.Label>
            </StyledFormLabelContainer>
            <InputGroup>
              <Form.Control
                type={showPassword ? "text" : "password"}
                placeholder="비밀번호를 입력하세요."
                value={memberPassword}
                onChange={handleMemberPassword}
              />
              {/* showPassword 버튼 숨겨서 기능 삭제 */}
            </InputGroup>
          </Form.Group>
          <Button type="submit" onClick={onClickLogin} style={{ width: "100%", backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>
            로그인
          </Button>
          <div style={{ display: "flex", flexDirection: "column", margin: "1rem 0" }}>
            <NavLink to="/"><span>메인으로 돌아가기</span></NavLink>
            <NavLink to="/signup"><span>회원이 아니신가요? <span style={{color: "#FFE600"}}>회원가입</span></span></NavLink>
          </div>
        </LoginForm>
      </TextContent>

      {/* 로그인 실패 모달 */}
      <Modal show={show} onHide={handleClose}>
        <Modal.Body className="modalbody">
          <div>아이디와 비밀번호를 확인하세요</div>
        </Modal.Body>
      </Modal>
    </Container>
  );
}

export default Login;
