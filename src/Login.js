import React from 'react';
import {Link} from 'react-router-dom';
import { withFirebase } from './Firebase';
import {createUseStyles} from 'react-jss'
import { message, Space, Typography, Form, Input, Button, Checkbox } from 'antd'
import { LockOutlined, MailOutlined } from '@ant-design/icons';
import sizes from "./styles/sizes";

const { Title } = Typography;

const useStyles = createUseStyles({
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("sm")]:{
      width: "100%",
    }
  }
});

const Login = (props) => {
  const classes = useStyles()

  const onFinish = values => {
    const {email, password} = values;
    console.log('Received values of form: ', values);
    props.firebase
    .doSignInWithEmailAndPassword(email, password)
    .then(authUser => {
      console.log("successfully logged in!", authUser)
      message.success('successfully logged in!');
      setTimeout(() => props.history.push("/"), 500);
      ;
    })
      .catch(error => {
        console.log("error during login:", error)
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
            type: 'email',
            message: 'The input is not valid E-mail!',
          },
          {
            required: true,
            message: 'Please input your E-mail!',
          },
        ]}
      >
        <Input
            type="email"
            placeholder="E-mail"
            prefix={<MailOutlined className="site-form-item-icon" />}
          />
      </Form.Item>
        {/* <Form.Item
          name="username"
          rules={[{ required: true, message: 'Please input your Username!' }]}
        >
          <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username" />
        </Form.Item> */}
        <Form.Item
          name="password"
          rules={[{ required: true, message: 'Please input your Password!' }]}
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
          <Button type="primary" htmlType="submit" className="login-form-button">
            Log in
          </Button>
          Or <Link to="/signin">register now!</Link>
        </Form.Item>
      </Form>
    </Space>
  );
}

export default withFirebase(Login);
