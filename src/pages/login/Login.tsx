import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { login } from "../../redux/actions/authActions";
import { Form, Input, Button } from "antd";
import { useNavigate, NavigateFunction } from "react-router-dom";
import { AppDispatch } from "../../redux/store";

const Login: React.FunctionComponent = () => {
  const dispatch: any = useDispatch();
  const navigate: NavigateFunction = useNavigate();

  // Selectors
  const { isAuthenticated } = useSelector((state: any) => state.authReducer);

  useEffect(() => {
    // Condition for auto redirect if isAuthenticated state = true
    if (isAuthenticated) {
      navigate("articles");
    }
  }, []);

  const onFinishHandler = (values: any) => {
    const { username, password } = values;
    dispatch(login(username, password, navigate));
  };

  return (
    <div className="login">
      <div className="login-form__window" style={{ backgroundColor: "white" }}>
        <div className="login-form__content">
          <h1>Log In</h1>
          <Form className="login-form" name="basic" aria-label="form" data-testid="form" initialValues={{ remember: true }} layout="vertical" onFinish={onFinishHandler} autoComplete="off">
            <Form.Item label="Username" name="username" rules={[{ required: true, message: "Please input your username!" }]}>
              <Input className="login-form__input" />
            </Form.Item>

            <Form.Item label="Password" name="password" rules={[{ required: true, message: "Please input your password!" }]}>
              <Input type="password" className="login-form__input" />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Log In
              </Button>
            </Form.Item>
          </Form>
        </div>
      </div>
    </div>
  );
};

export default Login;
