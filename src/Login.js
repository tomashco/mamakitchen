import React from "react";
import { Link } from "react-router-dom";
import { useFirebase } from "react-redux-firebase";
import { createUseStyles } from "react-jss";
import {
  message,
  Space,
  Typography,
  Form,
  Input,
  Button,
  Checkbox,
} from "antd";
import { LockOutlined, MailOutlined } from "@ant-design/icons";
import loginStyle from "./styles/loginStyle";

const { Title } = Typography;

const useStyles = createUseStyles(loginStyle);

const Login = (props) => {
  const classes = useStyles();
  const firebase = useFirebase();

  const onFinish = (values) => {
    const { email, password } = values;
    return firebase
      .login({
        email: email,
        password: password,
      })
      .then((authUser) => {
        message.success("successfully logged in!");
        setTimeout(() => props.history.push("/"), 500);
      })
      .catch((error) => {
        message.error(error.message);
      });
  };

  return (
    <Space direction="vertical" className={classes.space}>
      <Title level={1}>Log In</Title>
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="email"
          rules={[
            {
              type: "email",
              message: "The input is not valid E-mail!",
            },
            {
              required: true,
              message: "Please input your E-mail!",
            },
          ]}
        >
          <Input
            type="email"
            placeholder="E-mail"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
        </Form.Item>
        <Form.Item
          name="password"
          rules={[{ required: true, message: "Please input your Password!" }]}
        >
          <Input
            prefix={<LockOutlined className="site-form-item-icon" />}
            type="password"
            placeholder="Password"
          />
        </Form.Item>
        <Form.Item>
          <Form.Item name="remember" valuePropName="checked" noStyle>
            <Checkbox>Remember me</Checkbox>
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button
            type="primary"
            htmlType="submit"
            className="login-form-button"
          >
            Log in
          </Button>
          Or <Link to="/signin">register now!</Link>
        </Form.Item>
      </Form>
    </Space>
  );
};

export default Login;
