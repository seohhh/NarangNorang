import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Form, Button } from 'react-bootstrap';
import { useDispatch } from 'react-redux';
import { signUp } from "../slice/authSlice";


function Signup() {
  const [inputId, setInputId] = useState('');
  const [inputPw, setInputPw] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();


  // input data의 변화가 있을 때마다 value 값을 변경해서 useState 해준다
  const handleInputId = (e) => {
    setInputId(e.target.value);
  };

  const handleInputPw = (e) => {
    setInputPw(e.target.value);
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  // Signup 버튼 클릭 이벤트
  const onClickSignup = (e) => {
    e.preventDefault();

    dispatch(signUp(inputId, inputPw));
  };
 
    return(
        <div>
            <h2>Signup</h2>

            <Form>
              <Form.Group className="mb-3" controlId="formBasicEmail">
                <Form.Label>ID</Form.Label>
                <Form.Control type="email" placeholder="Enter ID" value={inputId} onChange={handleInputId} />
                <Form.Text className="text-muted">
                  We'll never share your email with anyone else.
                </Form.Text>
              </Form.Group>

              <Form.Group className="mb-3" controlId="formBasicPassword">
                <Form.Label>Password</Form.Label>
                <Form.Control type={showPassword ? 'text' : 'password'} placeholder="Password" value={inputPw} onChange={handleInputPw} />
                <Button variant="secondary" type="button" onClick={togglePasswordVisibility}>
                  {showPassword ? 'Hide Password' : 'Show Password'}
                </Button>
              </Form.Group>
              <Button variant="primary" type="submit" onClick={onClickSignup}>
                Submit
              </Button>
            </Form>
        </div>
    )
}
 
export default Signup;
