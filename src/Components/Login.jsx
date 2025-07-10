import React, { useState, useEffect } from "react";
import HaitianLogo from "../Images/Haitian.png";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleUser, faLock } from "@fortawesome/free-solid-svg-icons";
import HaitianBackgroundImage from "../Images/HaitianBanner.png";
import { Button, Form, Input, notification } from "antd";

notification.config({
  maxCount: 2,
  placement: "bottomRight",
  duration: 3,
});

export default function Login({ onLoginSuccess }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbzppCIp8qpKBAVLBf-UssRzM95v-loEzfLSweiOiOigT9GzbYxl5iV53_YSbRTVnieY/exec",
        {
          method: "POST",
          body: new URLSearchParams({
            action: "loginUser",
            username: values.username,
            password: values.password,
          }),
        }
      );

      const data = await response.json();
      if (data.success) {
        notification.success({
          message: "Success",
          description: `Login successful !`,
        });

        // Optionally redirect to dashboard or set user context
        onLoginSuccess();
      } else {
        notification.error({
          message: "Error",
          description: "Login failed: " + data.message,
        });
      }
    } catch (error) {
      notification.error({
        message: "Error",
        description: "Error: " + error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const styl = `.ant-form-item .ant-form-item-label >label {
    position: relative;
    display: inline-flex
;
    align-items: center;
    max-width: 100%;
    height: 32px;
    color: #0D3884;
    font-size: 16px;
}
.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal !important;
}    

     .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    transition: none;
    pointer-events: none;
    font-weight: normal;
}
`;

  return (
    <>
      <style>{styl}</style>

      <div
        className="container-fluid  d-flex justify-content-center align-items-center vh-100 m-0 p-0"
        style={{
          backgroundImage: `url(${HaitianBackgroundImage})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        <div
          className="container-fluid m-auto  d-flex justify-content-center align-items-center vh-100"
          style={{
            backgroundColor: "rgba(0, 49, 91, 0.1)",
          }}
        >
          <div className="w-50 m-auto ">
          <div className="container rounded-5 p-5 loginContainer bg-white ">
            <div className="row">
              <div className="col-12">
                <div className="m-auto d-flex justify-content-center m-0 p-0 ">
                  <img
                    src={HaitianLogo}
                    className="w-50 m-0 p-0"
                    alt="Haitian Logo"
                  />
                </div>
                <div>
                  <h3
                    className="text-center haitianColor m-0 p-0"
                    style={{ fontWeight: "500" }}
                  >
                    Inventory Management System
                  </h3>
                  <p className="text-center text-muted">
                    Please log in to your account
                  </p>
                  <Form
                    form={form}
                    layout="vertical"
                    className="mt-4"
                    onFinish={handleSubmit}
                  >
                    <Form.Item
                      label={
                        <>
                          <FontAwesomeIcon
                            icon={faCircleUser}
                            className="me-1"
                            size="lg"
                          />
                          Username
                        </>
                      }
                      name="username"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input size="large" />
                    </Form.Item>

                    <Form.Item
                      label={
                        <>
                          <FontAwesomeIcon
                            icon={faLock}
                            className="me-1"
                            size="lg"
                          />
                          Password
                        </>
                      }
                      name="password"
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                      ]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>
                    <Button
                      className="loginButton mt-3 mb-4"
                      size="large"
                      htmlType="submit"
                      loading={loading}
                    >
                      {loading ? "Logging In" : "Login"}
                    </Button>
                  </Form>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      </div>
    </>
  );
}
