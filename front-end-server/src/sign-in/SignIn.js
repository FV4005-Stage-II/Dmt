import React, { useEffect, useState } from "react";
import { Form, Input, Button, Divider, notification } from "antd";
import {
  UserOutlined,
  LockOutlined,
} from "@ant-design/icons";
// import { login } from "../util/ApiUtil";
// import {login} from "../../util/"
import "./Signin.css";
import { login } from "../api/AuthenticationApi";

const SignIn = (props) => {
    const [loading, setLoading] = useState(false);
    
    useEffect(() => {
      if (localStorage.getItem("accessToken") !== null) {
        props.history.push("/profile");
      }
      }, []);
    
    const onFinish = (values) => {
      console.log(values)
        setLoading(true);
        login(values)
          .then((response) => {
            localStorage.setItem("accessToken", response.accessToken);
            props.history.push("/profile");
            setLoading(false);
          })
          .catch((error) => {
            if (error.status === 401) {
              console.log("401")
              notification.error({
                message: "Error",
                description: "Username or Password is incorrect. Please try again!",
              });
            } else {
              notification.error({
                message: "Error",
                description:
                  error.message || "Sorry! Something went wrong. Please try again!",
              });
            }
            setLoading(false);
          });
      };


    return (
      <div className="login-container">
      {/* <DingtalkOutlined style={{ fontSize: 50 }} /> */}
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Please input your Username!" }]}
          >
            <Input
              size="large"
              prefix={<UserOutlined className="site-form-item-icon" />}
              placeholder="Username"
            />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Please input your Password!" }]}
          >
            <Input
              size="large"
              prefix={<LockOutlined className="site-form-item-icon" />}
              type="password"
              placeholder="Password"
            />
          </Form.Item>
          <Form.Item>
            <Button
              shape="round"
              size="large"
              htmlType="submit"
              className="login-form-button"
              loading={loading}
            >
              Log in
            </Button>
          </Form.Item>
          Not a member yet? <a href="/sign-up">Sign up</a>
        </Form>
      </div>
    );
};

export default SignIn;