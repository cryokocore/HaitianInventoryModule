import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css'; 
import { Button, Form, Input, Radio, Select } from "antd";
import {notification, message } from "antd";
// import HaitianLogo from "../Images/HaitianLogo.jpeg";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export default function Inventory() {
  const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    return(
 <>
      <div className="container-fluid ">
        <div className="container">
          <div>
            <h1
              className="text-center m-0 p-0 haitianColor mt-1 "
              style={{ fontSize: "30px" }}
            >
              Inventory
            </h1>
            <p
              className="text-center m-0 p-0 haitianInventoryDescriptionText"
              style={{ color: "#0D3884" }}
            >
              (Consolidated data of overall inventory items)
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
                    {/* <FontAwesomeIcon
                      icon={faUserPlus}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    /> */}
                  </div>
                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Search Inventory Items
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Search item in the inventory by part number or description
                    </div>
                  </div>
                </div>

                <div className="border border-1"></div>

                <Form
                  form={form}
                  layout="vertical"
                  // onFinish={handleSubmit}
                  className="mt-3 mt-lg-3"
                  disabled={loading}
                >
                  <div className="row mt-3 d-flex">
                    <Form.Item
                      name="partNumber"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please input the part number",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Part Number" />
                    </Form.Item>

                    <Form.Item
                      label="Password"
                      name="password"
                      className="fw-bold"
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
                      <Input.Password placeholder="Enter Password" />
                    </Form.Item>

                    <Form.Item
                      label="Confirm Password"
                      name="confirmpassword"
                      className="fw-bold"
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
                      <Input.Password placeholder="Enter Conform Password" />
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
                      <Button
                        htmlType="button"
                        size="large"
                        className="clearButton mt-2 ms-3"
                        onClick={() => {
                          const values = form.getFieldsValue();
                          const isEmpty = Object.values(values).every(
                            (value) =>
                              value === undefined ||
                              value === null ||
                              value === "" ||
                              (Array.isArray(value) && value.length === 0)
                          );

                          if (isEmpty) {
                            notification.info({
                              message: "Nothing to clear",
                              description: "All fields are already empty.",
                            });
                          } else {
                            form.resetFields();
                            notification.success({
                              message: "Success",
                              description: "Form cleared successfully!",
                            });
                          }
                        }}
                      >
                        Clear
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