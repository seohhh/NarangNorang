import React, { useState, useEffect } from "react";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { signUp } from "../slice/authSlice";
import { Form, Button } from "react-bootstrap";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import axios from "axios";
import signupImage from "../assets/loginImage.png"; // 회원가입 이미지 import

axios.defaults.baseURL = "http://3.36.126.169:8080/api/v1";

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

const SignupFormContainer = styled.div`
  max-width: 500px;
  width: 100%;
  padding: 50px 20px 20px 20px;
  border-radius: 8px;
  background-color: white;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  height: 500px;
`;

const StyledFormLabelContainer = styled.div`
  text-align: left;
  padding: 0px 0px 0px 10px;
`;

function SignupForm() {
  const dispatch = useDispatch();
  const [idValidation, setIdValidation] = useState("");
  const [passwordConfirm, setPasswordConfirm] = useState("");
  const [passwordValidation, setPasswordValidation] = useState("");
  const [formData, setFormData] = useState({
    member_id: "",
    password: "",
    confirm_password: "",
    member_name: "",
    member_nickname: "",
    member_email: "",
    member_phone: "",
  });

  const passwordCheck = /^(?=.*[a-zA-Z])(?=.*[!@#$%^*+=-])(?=.*[0-9]).{8,25}$/;
  const handleSubmit = async (e) => {
    e.preventDefault();

    // 비밀번호 유효성 검사
    if (!passwordCheck.test(formData.password)) {
      setPasswordValidation(false);
    } else {
      setPasswordValidation(true);
    }

    // 비밀번호 입력 확인
    if (formData.password !== formData.confirm_password) {
      setPasswordConfirm(false);
    } else {
      setPasswordConfirm(true);
    }

    if (passwordConfirm && passwordValidation) {
      dispatch(
        signUp(
          formData.member_id,
          formData.password,
          formData.member_name,
          formData.member_nickname,
          formData.member_email,
          formData.member_phone
        )
      );
    }
  };

  // 아이디 중복 검사
  const idCheckHandler = (e) => {
    axios({
      method: "Get",
      url: `member/${formData.member_id}`,
    })
      .then((res) => {
        if (res.data === false) {
          setIdValidation(true);
        } else setIdValidation(false);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  // 데이터 입력시 변경된 데이터 저장
  useEffect(() => {
    setFormData({
      ...formData,
      member_id: formData.member_id,
      password: formData.password,
      confirm_password: formData.confirm_password,
      member_name: formData.member_name,
      member_nickname: formData.member_nickname,
      member_email: formData.member_email,
      member_phone: formData.member_phone,
    });
  }, [
    formData.member_id,
    formData.password,
    formData.confirm_password,
    formData.member_name,
    formData.member_nickname,
    formData.member_email,
    formData.member_phone,
  ]);

  return (
    <GradientBackground>
      <MainContent>
        <MainImage src={signupImage} alt="Signup Image" />
        <TextContent>
          <SignupFormContainer>
            <div>
              <p>회원가입을 환영합니다.</p>
            </div>
            <Form onSubmit={handleSubmit}>
              <Form.Group as={Row} className="mb-3" controlId="member_name">
                <Form.Label column sm="2">
                  이름
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="member_name"
                    value={formData.member_name}
                    placeholder="이름을 입력하세요"
                    onChange={(e) =>
                      setFormData({ ...formData, member_name: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="member_id">
                <Form.Label column sm="2">
                  아이디
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="member_id"
                    value={formData.member_id}
                    placeholder="아이디를 입력하세요"
                    onChange={(e) =>
                      setFormData({ ...formData, member_id: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>
              <Button variant="primary" type="button" onClick={idCheckHandler}>
                아이디 중복 확인
              </Button>
              {idValidation === true ? (
                <Form.Text className="text-muted">
                  사용 가능한 아이디입니다
                </Form.Text>
              ) : idValidation === false ? (
                <Form.Text className="text-muted">
                  사용 불가능한 아이디입니다
                </Form.Text>
              ) : null}

              <Form.Group as={Row} className="mb-3" controlId="member_email">
                <Form.Label column sm="2">
                  이메일
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="email"
                    name="member_email"
                    value={formData.member_email}
                    placeholder="이메일을 입력하세요"
                    onChange={(e) =>
                      setFormData({ ...formData, member_email: e.target.value })
                    }
                  />
                </Col>
              </Form.Group>

              <Form.Group as={Row} className="mb-3" controlId="member_nickname">
                <Form.Label column sm="2">
                  닉네임
                </Form.Label>
                <Col sm="10">
                  <Form.Control
                    type="text"
                    name="member_nickname"
                    value={formData.member_nickname}
                    placeholder="닉네임을 입력하세요"
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        member_nickname: e.target.value,
                      })
                    }
                  />
                </Col>
              </Form.Group>

              <Button type="submit">회원가입</Button>

            </Form>
          </SignupFormContainer>
        </TextContent>
      </MainContent>
    </GradientBackground>
  );
}

export default SignupForm;
