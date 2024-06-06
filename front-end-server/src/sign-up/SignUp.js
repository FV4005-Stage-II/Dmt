import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, DatePicker, notification } from "antd";
import moment from 'moment';
import "./Signup.css";
import { register } from "../api/AuthenticationApi";

import { useHistory } from "react-router-dom";
import Header from "../componets/header/Header";

const SignUp = (props) => {
  const [loading, setLoading] = useState(false);
  const history = useHistory();

  useEffect(() => {
    if (localStorage.getItem("accessToken") !== null) {
      props.history.push("/profile");
    }
  }, []);

  const onFinish = (values) => {
    const dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD');
    const dataToSend = { ...values, dateOfBirth };
    setLoading(true);
    register(dataToSend)
      .then((response) => {
        notification.success({
          message: "Success",
          description:
            "Thank you! You're successfully registered. Please Login to continue!",
        });
        history.push("/sign-in");
        setLoading(false);
      })
      .catch((error) => {
        notification.error({
          message: "Error",
          description:
            "Sorry! Something went wrong. Please try again!",
        });
        setLoading(false);
      });
  };

  return (
    <div>
      <Header/>
        <div className="login-container">
        <Form
          name="normal_login"
          className="login-form"
          initialValues={{ remember: true }}
          onFinish={onFinish}
        >
          <Form.Item
            name="username"
            rules={[{ required: true, message: "Пожалуйста, напишите своё никнейм!" }]}
          >
            <Input size="large" placeholder="Имя пользователя" />
          </Form.Item>
          <Form.Item
            name="firstName"
            rules={[{ required: true, message: "Пожалуйста, напишите свою фамилию!" }]}
          >
            <Input size="large" placeholder="Имя" />
          </Form.Item>
          <Form.Item
            name="lastName"
            rules={[{ required: true, message: "Пожалуйста, напишите своё отчество!" }]}
          >
            <Input size="large" placeholder="Фамилия" />
          </Form.Item>
          <Form.Item
            name="email"
            rules={[{ required: true, message: "Пожалуйста, напишите свой email!" }]}
          >
            <Input size="large" placeholder="Email" />
          </Form.Item>
          <Form.Item
            name="password"
            rules={[{ required: true, message: "Пожалуйста, напишите свой пароль!" }]}
          >
            <Input size="large" type="password" placeholder="Password" />
          </Form.Item>
          <Form.Item
            name="gender"
            rules={[{ required: true, message: "Пожалуйста, укажите свой пол!" }]}
          >
            <Radio.Group>
              <Radio value="Мужской">Мужской</Radio>
              <Radio value="Женский">Женский</Radio>
            </Radio.Group>
          </Form.Item>
          <Form.Item
            name="dateOfBirth"
            label="Дата рождения"
            rules={[{ required: true, message: "Пожалуйста, укажите свою дату рождения!" }]}
          >
            <DatePicker
              size="large"
              style={{ width: "100%" }}
              placeholder="Выберите дату"
              format="YYYY-MM-DD"
              defaultValue={moment()}
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
              Регистрация
            </Button>
          </Form.Item>
          Уже зарегистрированы? <a href="/sign-in">Авторизация</a>
        </Form>
      </div>
    </div>
    
  );
};

export default SignUp;