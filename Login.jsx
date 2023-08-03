import React, { useState, useEffect } from "react";
import styled from "styled-components";
import loginImage from "../assets/loginImage.png";
import { Form, Button, InputGroup } from "react-bootstrap";
import { useSelector, useDispatch } from "react-redux";
import { login } from "../slice/authSlice";
import { useNavigate } from "react-router-dom";

const GradientBackground = styled.div`
  background: linear-gradient(to bottom, #fff9be, #ffffff);
  min-height: 100vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  text-align: center;
`;

const MainContent = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  max-width: 800px;
  width: 100%;
  gap: 20px;
`;

const MainImage = styled.img`
  flex: 1;
  max-width: 50%;
  height: 400px;
`;

const TextContent = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
`;

const LoginForm = styled(Form)`
  max-width: 400px;
  width: 100%;
  padding: 50px 20px 20px 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 400px;
`;

const StyledFormLabelContainer = styled.div`
  text-align: left;
  padding: 0px 0px 0px 10px;
`;

// eslint-disable-next-line no-unused-vars
const TogglePasswordButton = styled(Button)`
  cursor: pointer;
  display: none; /* showPassword 버튼 숨기기 */
`;

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const isLoggedin = useSelector((state) => state.login.isLoggedin);

  useEffect(() => {
    // isLoggedin 값이 변경되었을 때 실행
    if (isLoggedin === true) {
      navigate("/");
    }
  }, [isLoggedin, navigate]);

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  // eslint-disable-next-line no-unused-vars
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onClickLogin = (e) => {
    e.preventDefault();
    dispatch(login(inputId, inputPw));
  };

  return (
    <GradientBackground>
      <MainContent>
        <MainImage src={loginImage} alt="Login Image" />
        <TextContent>
          <LoginForm>
            <div>
              <p>나랑노랑 에 오신것을 환영합니다.</p>
            </div>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <StyledFormLabelContainer>
                <Form.Label>아이디</Form.Label>
              </StyledFormLabelContainer>
              <Form.Control
                type="id"
                placeholder="아이디를 입력하세요."
                value={inputId}
                onChange={handleInputId}
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
                  value={inputPw}
                  onChange={handleInputPw}
                />
                {/* showPassword 버튼 숨겨서 기능 삭제 */}
              </InputGroup>
            </Form.Group>
            <Button type="submit" onClick={onClickLogin} style={{ backgroundColor: "#fff9be", color: "#000", borderColor: "#fff9be" }}>
              로그인
            </Button>
          </LoginForm>
        </TextContent>
      </MainContent>
    </GradientBackground>
  );
}

export default Login;
