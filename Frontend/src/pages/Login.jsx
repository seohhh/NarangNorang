import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { login } from "../slice/authSlice";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";

function Login() {
  const [inputId, setInputId] = useState("");
  const [inputPw, setInputPw] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();

  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const onClickLogin = (e) => {
    e.preventDefault();

    dispatch(login(inputId, inputPw));
  };

  return (
    <div>
      <h2>Login</h2>
      <Form>
        <Form.Group className="mb-3" controlId="formBasicEmail">
          <Form.Label>ID</Form.Label>
          <Form.Control
            type="email"
            placeholder="Enter email"
            value={inputId}
            onChange={handleInputId}
          />
          <Form.Text className="text-muted">
            We'll never share your email with anyone else.
          </Form.Text>
        </Form.Group>

        <Form.Group className="mb-3" controlId="formBasicPassword">
          <Form.Label>Password</Form.Label>
          <Form.Control
            type={showPassword ? "text" : "password"}
            placeholder="Password"
            value={inputPw}
            onChange={handleInputPw}
          />
          <Button
            variant="secondary"
            type="button"
            onClick={togglePasswordVisibility}
          >
            {showPassword ? "Hide Password" : "Show Password"}
          </Button>
        </Form.Group>
        <Button variant="primary" type="submit" onClick={onClickLogin}>
          Submit
        </Button>
      </Form>
    </div>
  );
}

export default Login;
