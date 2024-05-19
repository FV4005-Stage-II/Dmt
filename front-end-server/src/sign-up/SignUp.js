import React, { useEffect, useState } from "react";
import { Form, Input, Button, Radio, DatePicker, notification } from "antd";
import moment from 'moment';
// import { signup } from "../api/Authentication";
import "./Signup.css";
import { register } from "../api/Authentication";


const SignUp = (props) => {
    const [loading, setLoading] = useState(false);

    useEffect(() => {
      // if (localStorage.getItem("accessToken") !== null) {
      //   props.history.push("/");
      // }
    }, []);
  
    const onFinish = (values) => {
      const dateOfBirth = values.dateOfBirth.format('YYYY-MM-DD');
      const dataToSend = { ...values, dateOfBirth};
      console.log(dataToSend);
      setLoading(true);
      register(dataToSend)
        .then((response) => {
          notification.success({
            message: "Success",
            description:
              "Thank you! You're successfully registered. Please Login to continue!",
          });
          props.history.push("/login");
          setLoading(false);
        })
        .catch((error) => { 
          notification.error({
            message: "Error",
            description:
              error.message || "Sorry! Something went wrong. Please try again!",
          });
          setLoading(false);
        });
    };
  
    return (
      <div className="login-container">
      <Form
        name="normal_login"
        className="login-form"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          name="username"
          rules={[{ required: true, message: "Пожалуйста, напишите своё имя!" }]}
        >
          <Input size="large" placeholder="Имя" />
        </Form.Item>
        <Form.Item
          name="lastName"
          rules={[{ required: true, message: "Пожалуйста, напишите свою фамилию!" }]}
        >
          <Input size="large" placeholder="Фамилия" />
        </Form.Item>
        <Form.Item
          name="patronymic"
          rules={[{ required: true, message: "Пожалуйста, напишите своё отчетсво!" }]}
        >
          <Input size="large" placeholder="Отчетсво" />
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
          name="phoneNumber"
          rules={[{ required: true, message: "Пожалуйста, напишите свой номер телефоне!" }]}
        >
          <Input size="large" placeholder="Номер телефона" />
        </Form.Item>
        <Form.Item
      name="sex"
      rules={[{ required: true, message: "Пожалуйста, укажите свой пол!" }]}
    >
      <Radio.Group>
        <Radio value={0}>Мужской</Radio>
        <Radio value={1}>Женский</Radio>
        <Radio value={2}>Не выбрано</Radio>
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
        format="YYYY-MM-DD" // Устанавливаем желаемый формат
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
        Уже зарегистрированы? <a href="/login">Авторизация</a>
      </Form>
    </div>
    );
  };

export default SignUp;