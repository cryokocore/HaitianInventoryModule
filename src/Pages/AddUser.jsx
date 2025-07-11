import React, { useState, useEffect } from "react";
import {
  Button,
  Form,
  Input,
  Select,
  Cascader,
  message,
  Table,
  notification,
  Tooltip,
} from "antd";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import {
  faCircleUser,
  faLock,
  faUserPlus,
} from "@fortawesome/free-solid-svg-icons";
import "../App.css";

notification.config({
  maxCount: 2,
  placement: "bottomRight",
  duration: 3,
});

export default function AddUser() {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const styl = `.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal;
  }
  .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    transition: none;
    pointer-events: none;
    font-weight: normal;
  }
  
 .ant-cascader-dropdown.ant-select-dropdown {
    padding: 0;
    width: 60% !important;
    height: auto !important;
}
    .ant-form-item .ant-form-item-label >label {
    position: relative;
    display: inline-flex
;
    align-items: center;
    max-width: 100%;
    height: 32px;
    color: #0D3884;
    font-size: 14px;
}
.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal !important;
}    
 
    
    
  `;

  const handleSubmit = async (values) => {
    setLoading(true);
    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbwLnE0vuJ_x6VvKHvYvSTyF4v0S5njE8eQgMLUhxMEipmnrF7y6ybrJ5qF0rIUc_gC2cA/exec",
        {
          method: "POST",
          body: new URLSearchParams({
            action: "registerUser",
            username: values.username,
            password: values.password,
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        // message.success(result.message);
        notification.success({
          message: "Success",
          description: result.message,
        });
        form.resetFields();
      } else {
        // message.error(result.message || "Failed to register user");
        notification.error({
          message: "Error",
          description: result.message || "Failed to register user",
        });
      }
    } catch (error) {
      // message.error("Something went wrong");

      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <style>{styl}</style>
      <div className="container-fluid ">
        <div className="container">
          <div>
            <h1
              className="text-center m-0 p-0 haitianColor mt-1 "
              style={{ fontSize: "30px" }}
            >
              Add New User
            </h1>
            <p
              className="text-center m-0 p-0 haitianInventoryDescriptionText"
              style={{ color: "#0D3884" }}
            >
              (Register a new user to provide access)
            </p>
          </div>

          <div className="row d-flex flex-row mt-4 ">
            <div className="d-flex flex-column flex-lg-row justify-content-lg-evenly rounded-4">
              <div className="col-12 p-3 p-lg-4  ">
                <div className="d-flex align-items-center gap-2 mb-1">
                  <div
                    className="d-flex align-items-center justify-content-center"
                    style={{
                      backgroundColor: "#e8f0fe",
                      borderRadius: "12px",
                      width: "40px",
                      height: "40px",
                    }}
                  >
                    <FontAwesomeIcon
                      icon={faUserPlus}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    />
                  </div>
                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Create Account
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Fill in the details to create a new user account
                    </div>
                  </div>
                </div>

                <div className="border border-1"></div>

                <Form
                  form={form}
                  layout="vertical"
                  onFinish={handleSubmit}
                  className="mt-3 mt-lg-3"
                  disabled={loading}
                >
                  <div className="row mt-3">
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
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please input your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            const regex =
                              /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,15}$/;
                            if (!value) {
                              return Promise.resolve();
                            }
                            if (!regex.test(value)) {
                              return Promise.reject(
                                new Error(
                                  "Password must be 8–15 characters and include uppercase, lowercase, number, and special character."
                                )
                              );
                            }
                            return Promise.resolve();
                          },
                        }),
                      ]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>

                    <Form.Item
                      label={
                        <>
                          <FontAwesomeIcon
                            icon={faLock}
                            className="me-1"
                            size="lg"
                          />
                          Confirm Password
                        </>
                      }
                      name="confirmpassword"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: "Please confirm your password!",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("password") === value) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Passwords do not match!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input.Password size="large" />
                    </Form.Item>

                    <div className="col-12 text-center mt-4 mb-3">
                      <Button
                        htmlType="submit"
                        size="large"
                        className="submitButton mt-2"
                        loading={loading}
                      >
                        {loading ? "Registring User" : "Register User"}
                      </Button>
                    </div>
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
