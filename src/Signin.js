import React, {useState} from 'react';
import {createUseStyles} from 'react-jss'
import { useFirebase } from 'react-redux-firebase'
import { Space, Typography, Form, Input, Tooltip, Button, AutoComplete, message } from 'antd';
import { QuestionCircleOutlined, UserOutlined, LockOutlined, MailOutlined, HomeOutlined } from '@ant-design/icons';

import sizes from "./styles/sizes";

const { Title } = Typography;

const useStyles = createUseStyles({
  space: {
    display: "flex",
    width: "50%",
    margin: "0 auto",
    [sizes.down("sm")]:{
      width: "100%",
    },

  }
});

const Signin = props => {
  const classes = useStyles()
  const [autoCompleteResult, setAutoCompleteResult] = useState([]);
  const firebase = useFirebase()

  const [form] = Form.useForm();

  const onFinish = values => {
    const {email, password, username} = values;

    firebase.createUser(
      { email, password },
      { username, email }
    )
    .then(() => {
      message.success('successfully signed in!');
      setTimeout(() => props.history.push("/"), 500);
    })
    .catch(error => {
      message.error(error.message);
      });
  };

  const onWebsiteChange = value => {
    if (!value) {
      setAutoCompleteResult([]);
    } else {
      setAutoCompleteResult(['.com', '.org', '.net'].map(domain => `${value}${domain}`));
    }
  };

  const websiteOptions = autoCompleteResult.map(website => ({
    label: website,
    value: website,
  }));

  return (
    <Space direction="vertical" className={classes.space}>
      <Title level={1}>Sign In</Title>
      <Form
      form={form}
      name="signin"
      onFinish={onFinish}
      scrollToFirstError
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

      <Form.Item
        name="password"
        rules={[
          {
            required: true,
            message: 'Please input your password!',
          },
        ]}
        hasFeedback
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Password"/>
      </Form.Item>
      <Form.Item
        name="confirm"
        dependencies={['password']}
        hasFeedback
        rules={[
          {
            required: true,
            message: 'Please confirm your password!',
          },
          ({ getFieldValue }) => ({
            validator(rule, value) {
              if (!value || getFieldValue('password') === value) {
                return Promise.resolve();
              }
              return Promise.reject('The two passwords that you entered do not match!');
            },
          }),
        ]}
      >
        <Input.Password prefix={<LockOutlined className="site-form-item-icon" />} placeholder="Confirm Password"/>
      </Form.Item>

      <Form.Item
        name="username"
        label={
            <Tooltip title="What do you want others to call you?">
              <QuestionCircleOutlined />
            </Tooltip>
        }
        rules={[{ required: true, message: 'Please input your username!', whitespace: true }]}
      >
        <Input prefix={<UserOutlined className="site-form-item-icon" />} placeholder="Username"/>
      </Form.Item>

      <Form.Item
        name="website"
        rules={[{ required: true, message: 'Please input website!' }]}
      >
        <AutoComplete options={websiteOptions} onChange={onWebsiteChange}>
          <Input prefix={<HomeOutlined className="site-form-item-icon" />} placeholder="Website"/>
        </AutoComplete>
      </Form.Item>

      <Form.Item
       >
        <Button type="primary" htmlType="submit">
          Register
        </Button>
      </Form.Item>
    </Form>
    </Space>
  );
}

export default Signin;
