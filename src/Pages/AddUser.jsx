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
  Checkbox,
  Radio,
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

const modules = [
  "Dashboard",
  "Inventory",
  "Product Categories",
  "Customer Details",
  "Delivery Note",
  "Reports",
  "Add User",
];
const accessLevels = ["No Access", "Read", "Write/Update", "Full Control"];

export default function AddUser({ username }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);

  const dataSource = modules.map((module, index) => ({
    key: index,
    module,
  }));

  // Define columns (first column for module name, rest for access levels)
 const moduleColumns = [
  {
    title: <span style={{ fontWeight: "bold", color: "#0D3884" }}>Module</span>,
    dataIndex: "module",
    key: "module",
     width: "50%",
    render: (text) => (
      <span style={{ fontWeight: "normal", color: "#0D3884" }}>{text}</span>
    ),
  },
  {
    title: <span style={{ fontWeight: "bold", color: "#0D3884" }}>Access Level</span>,
    key: "access",
     width: "50%",
    render: (_, record) => (
      <Form.Item
        name={["access", record.module]}
        rules={[{ required: true, message: "Please select access level" }]}
        style={{ marginBottom: 0 }}
        validateTrigger="onSubmit"
      >
        <Radio.Group>
          {accessLevels.map((level) => (
            <Radio
              key={level}
              value={level}
              className="me-4"
              style={{ fontWeight: "normal",   }}
            >
              {level}
            </Radio>
          ))}
        </Radio.Group>
      </Form.Item>
    ),
  },
];



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
    display: inline-flex;
    color: #0D3884;
    font-size: 14px;

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
    .ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal !important;
}    
    [class^="ant-table"] [class^="ant-table"], [class*=" ant-table"] [class^="ant-table"], [class^="ant-table"] [class*=" ant-table"], [class*=" ant-table"] [class*=" ant-table"] {
    box-sizing: border-box;
    color: #0D3884 !important;
}
    .ant-tooltip .ant-tooltip-inner {
    min-width: 28px;
    min-height: 32px;
    padding: 6px 8px;
    color: white;
    text-align: start;
    text-decoration: none;
    word-wrap: break-word;
    background-color: #0D3883;
    border-radius: 6px;
      border: 2px solid rgba(137, 137, 137, 0.87);
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08), 0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    box-sizing: border-box;
}
    .ant-table-wrapper .ant-table-thead >tr>th, .ant-table-wrapper .ant-table-thead >tr>td {
    position: relative;
    color: #0d3884 !important;
    text-align: start;
    background-color: #E8F0FE;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
  
}
  
  `;

  // const handleSubmit = async (values) => {
  //   if (!navigator.onLine) {
  //     notification.error({
  //       message: "No Internet Connection",
  //       description: "Please check your internet and try again.",
  //     });
  //     return;
  //   }
  //   setLoading(true);
  //   try {
  //     const response = await fetch(
  //       "https://script.google.com/macros/s/AKfycbwHZ3G5sqmuTZgKskzbeKiPcM6bnlShQ-vvdiGzCr6VbwfqN-kjRmQQIoLc1LeBpVSStg/exec",
  //       {
  //         method: "POST",
  //         body: new URLSearchParams({
  //           action: "registerUser",
  //           userEmail: values.userEmail,
  //           password: values.password,
  //         }),
  //       }
  //     );

  //     const result = await response.json();
  //     if (result.success) {
  //       // message.success(result.message);
  //       notification.success({
  //         message: "Success",
  //         description: result.message,
  //       });
  //       form.resetFields();
  //     } else {
  //       // message.error(result.message || "Failed to register user");
  //       notification.error({
  //         message: "Error",
  //         description: result.message || "Failed to register user",
  //       });
  //     }
  //   } catch (error) {
  //     // message.error("Something went wrong");

  //     notification.error({
  //       message: "Error",
  //       description: "Something went wrong",
  //     });
  //   } finally {
  //     setLoading(false);
  //   }
  // };

  const handleSubmit = async (values) => {
  // Ensure at least one module has access selected
  const access = values.access || {};
  const hasAccess = Object.values(access).some((arr) => arr && arr.length > 0);

  if (!hasAccess) {
    notification.error({
      message: "Error",
      description: "Please provide at least one module access!",
    });
    return;
  }

  if (!navigator.onLine) {
    notification.error({
      message: "No Internet Connection",
      description: "Please check your internet and try again.",
    });
    return;
  }

  setLoading(true);
  try {
    const response = await fetch(
      "https://script.google.com/macros/s/AKfycbwUC722-QJcAaAieHcIZH7AgC8_Wdkzb0FJXsF_4Hibmh_HiOKr9bU1M9J-BGPB1rKd2A/exec",
      {
        method: "POST",
        body: new URLSearchParams({
          action: "registerUser",
          userEmail: values.userEmail,
          password: values.password,
          access: JSON.stringify(values.access), // send as JSON
        }),
      }
    );

    const result = await response.json();
    if (result.success) {
      notification.success({
        message: "Success",
        description: result.message,
      });
      form.resetFields();
    } else {
      notification.error({
        message: "Error",
        description: result.message || "Failed to register user",
      });
    }
  } catch (error) {
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
                    {/* <Form.Item
                      label="User Name"
                      name="username"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please input your username!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter user name" />
                    </Form.Item> */}

                    <Form.Item
                      label="User Email"
                      name="userEmail"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please input your email!",
                        },
                        {
                          type: "email",
                          message: "Please enter a valid email address!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter User Email" />
                    </Form.Item>

              

                    <Table
                      dataSource={dataSource}
                      columns={moduleColumns}
                      pagination={false}
                    />

                    <Form.Item
                      label="Password"
                      name="password"
                      className="fw-bold mt-4"
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

                    <div className="col-7 text-center mt-4 mb-3 d-flex m-auto">
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
                        Clear Input
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
