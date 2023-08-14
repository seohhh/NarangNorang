import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
// import Ask from "../components/Ask";
import { Form, Button, Row, Col, InputGroup } from "react-bootstrap";
import styled from "styled-components";
import axios from "axios";
import { useSelector, useDispatch } from "react-redux";

const Wrapper = styled.div`
  display: flex;
  flex-flow: column;
  align-items: center;
`;

axios.defaults.baseURL = "https://i9c208.p.ssafy.io/api/v1";

function Mypage() {
  const { userId } = useParams();
  const [validated, setValidated] = useState(false);
  const token = useSelector((state) => state.login.token);
  const [userName, setUserName] = useState(undefined);
  const [userEmail, setUserEmail] = useState(undefined);
  const [userNickname, setUserNickname] = useState(undefined);

  useEffect(() => {
    axios({
      method: "GET",
      url: "/member/me",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        // console.log(res.data);
        setUserName(res.data.memberName);
        setUserEmail(res.data.memberEmail);
        setUserNickname(res.data.memberNickname);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  console.log(userName, userEmail, userNickname);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Wrapper>
      {/* <h1>{userId}의 마이페이지</h1>
      <Form style={{width: "100%"}}noValidate validated={validated} onSubmit={handleSubmit}>
        <Form.Group as={Row} lg="12" controlId="validationCustom01">
          <Form.Label column lg="4">
            아이디
          </Form.Label>
          <Col lg="8">
            <Form.Control disabled readOnly type="text" defaultValue={userId} />
          </Col>
        </Form.Group>

        <Form.Group as={Row} lg="12" controlId="validationCustom02">
          <Form.Label column md="2">
            이름
          </Form.Label>
          <Col>
            <Form.Control required type="text" defaultValue={userName} />
          </Col>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        {/* <Form.Group as={Row} lg="12" controlId="validationCustomUsername">
              <Form.Label column md="2">비밀번호</Form.Label>
              <InputGroup hasValidation>
                <InputGroup.Password id="inputGroupPrepend"></InputGroup.Password>
                <Form.Control
                  type="text"
                  placeholder="password"
                  aria-describedby="inputGroupPrepend"
                  required
                />
                <Form.Control.Feedback type="invalid">
                  Please choose a username.
                </Form.Control.Feedback>
              </InputGroup>
            </Form.Group> */}

        <Form.Group as={Row} lg="12" controlId="validationCustom02">
          <Form.Label column lg="2">
            이메일
          </Form.Label>
          <Col>
            <Form.Control required type="text" defaultValue={userEmail} />
          </Col>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group as={Row} lg="12" controlId="validationCustom02">
          <Form.Label column lg="2">
            닉네임
          </Form.Label>
          <Col>
            <Form.Control required type="text" defaultValue={userNickname} />
          </Col>
          <Form.Control.Feedback>Looks good!</Form.Control.Feedback>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Check
            required
            label="Agree to terms and conditions"
            feedback="You must agree before submitting."
            feedbackType="invalid"
          />
        </Form.Group>
        <Button type="submit">Submit form</Button>
      </Form> */}
    </Wrapper>
  );
}

export default Mypage;
