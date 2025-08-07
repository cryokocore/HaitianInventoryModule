import React, { useEffect, useState } from "react";
import 'antd/dist/reset.css'; 
import { Button, Form, Input, Radio, Select } from "antd";
import {notification, message } from "antd";
// import HaitianLogo from "../Images/HaitianLogo.jpeg";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faChartSimple,
  faDollar,
  faListCheck,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function Inventory() {
  const [form] = Form.useForm();
  const [locations, setLocations] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchLocations = async () => {  
      const defaultLocations = ["Sharjah", "Umm Al Quwain"];

      try {
        const response = await fetch(
          "https://script.google.com/macros/s/AKfycbztCO6j70WhFVSyXdhf2WDyAsg7Yr9Agu11CgDjSTozqSylMDJk4jkeP0oDGyXRAaR6Mw/exec",
          {
            method: "POST",
            headers: {
              "Content-Type": "application/x-www-form-urlencoded",
            },
            body: new URLSearchParams({ action: "getLocations" }),
          }
        );

        const result = await response.json();

        if (result.success && Array.isArray(result.locations)) {
          const merged = [...defaultLocations];

          result.locations.forEach((loc) => {
            if (!merged.includes(loc)) merged.push(loc);
          });

          console.log("📦 Merged Locations:", merged); // ✅ Log merged list
          setLocations(merged);
        } else {
          console.log("⚠️ Backend returned no locations. Using defaults.");
          setLocations(defaultLocations);
        }
      } catch (err) {
        console.error("❌ Error fetching locations:", err);
        setLocations(defaultLocations);
      }
    };

    fetchLocations();
  }, []);

  const handleSubmit = async (values) => {
    console.log("Form values submitted:", values);
    setLoading(true);

    try {
      const response = await fetch(
        "https://script.google.com/macros/s/AKfycbztCO6j70WhFVSyXdhf2WDyAsg7Yr9Agu11CgDjSTozqSylMDJk4jkeP0oDGyXRAaR6Mw/exec", 
        {
          method: "POST",
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
          body: new URLSearchParams({
            action: "addInventory", // ✅ Updated action
            ...values,  
          }),
        }
      );

      const result = await response.json();
      if (result.success) {
        notification.success({
          message: "Success",
          description: "Inventory data submitted successfully!",
          duration: 3,
          placement:"bottomRight"
        })
        form.resetFields();
      } else {
        console.error("Submission error:", result.error);
        notification.error({
          message: "Error",
          description: "Submission failed: " + result.error,
          duration: 3,
         placement:"bottomRight"

        })
      }
    } catch (err) {
      console.error("Fetch error:", err);
      alert("An error occurred while submitting data.");
           notification.error({
          message: "Error",
          description: "An error occurred while submitting data.",
          duration: 3,
          placement:"bottomRight"

        })
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
    font-size: 14px;
}
.ant-form-item .ant-form-item-explain-error {
    color: #ff4d4f;
    font-weight: normal !important;
}    
 .ant-select-multiple .ant-select-selection-placeholder {
    position: absolute;
    top: 50%;
    inset-inline-start: 8px;
    inset-inline-end: 11px;
    transform: translateY(-50%);
    transition: all 0.3s;
    font-weight: normal;
}
     .ant-select-single .ant-select-selector .ant-select-selection-placeholder {
    transition: none;
    pointer-events: none;
    font-weight: normal;
}
`;
  return (
    <div className="container-fluid">
      <style>{styl}</style>
      <div className="container ">
        {/* <div className="col-12 d-flex justify-content-center">
          <img
            src={HaitianLogo}
            alt="HaitianLogo"
            className="img-fluid haitianLogo"
          />
        </div> */}
        {/* 
        <div>
          <h1
            className="text-center m-0 p-0 haitianColor mt-1 haitianInventoryText"
            style={{ fontSize: "30px" }}
          >
            Inventory Management System
          </h1>
          <p
            style={{
              // fontSize: "16px",
              textAlign: "center",
              color: "#0D3884",
            }}
            className="m-0 p-0 haitianInventoryDescriptionText"
          >
            (Add and manage your inventory items with ease)
          </p>
        </div> */}

        <div>
          <h1
            className="text-center m-0 p-0 haitianColor mt-1 "
            style={{ fontSize: "36px"  }}
          >
            Inventory
          </h1>
          <p
            style={{
              // fontSize: "16px",
              textAlign: "center",
              color: "#0D3884",
            }}
            className="m-0 p-0 haitianInventoryDescriptionText"
          >
            (Add and manage your inventory items with ease)
          </p>
        </div>
        <div className="row d-flex flex-row mt-4">
          <Form
            form={form}
            variant="filled"
            layout="vertical"
            className="mt-3 mt-lg-3 "
            onFinish={handleSubmit}
          >
            <div className="d-flex flex-column flex-lg-row justify-content-lg-evenly">
              {/* Basic Information */}

              <div className="col-12 col-lg-6 p-3 p-lg-4 inventoryCards rounded-4">
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
                      icon={faListCheck}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    />
                  </div>

                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Basic Information
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Core details about your inventory item
                    </div>
                  </div>
                </div>
                <div className="border border-1"></div>
                <div className="row mt-3 ">
                  <div className="col-12 col-md-6">
                    {/* <Form.Item
                      label="REORDER(auto-fill)"
                      name="reorder"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input reorder(auto-fill)",
                        },
                      ]}
                    >
                      <Input />
                    </Form.Item> */}
                         <Form.Item
                                            label="MACHINES"
                                            name="machines"
                                            className="fw-bold"
                                            rules={[
                                              {
                                                required: true,
                                                message: "Please select machine",
                                              },
                                            ]}
                                          >
                                            <Select placeholder="Select a machine">
                                              <Select.Option value="IMM">IMM</Select.Option>
                                              <Select.Option value="BMM">BMM</Select.Option>
                                              <Select.Option value="EBM">EBM</Select.Option>
                                              <Select.Option value="SBM">SBM</Select.Option>
                                            </Select>
                                          </Form.Item>
                    <Form.Item
                      label="PRODUCT NAME"
                      name="productName"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input product name",
                        },
                      ]}
                    >
                      <Input placeholder="Enter product name"/>
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Item
                      label="ITEM NUMBER"
                      name="itemNo"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input item number",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter item number"/>
                    </Form.Item>
                    <Form.Item
                      label="MANUFACTURER"
                      name="manufacturer"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input manufacturer",
                        },
                      ]}
                    >
                      <Input placeholder="Enter manufacturer"/>
                    </Form.Item>
                  </div>
                  <Form.Item
                    label="DESCRIPTION"
                    name="description"
                    className="fw-bold"
                    rules={[
                      {
                        required: "true",
                        message: "Please input description",
                      },
                    ]}
                  >
                    <Input placeholder="Enter description"/>
                  </Form.Item>
                </div>
              </div>

              {/* Financial */}
              <div className="col-12 col-lg-5 mt-4 mt-lg-0 p-3 p-lg-4 inventoryCards rounded-4 ">
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
                      icon={faDollar}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    />
                  </div>

                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Financial
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Pricing and cost information
                    </div>
                  </div>
                </div>
                <div className="border border-1"></div>

                <div className="row mt-3 ">
                  <div className="col-12">
                    <Form.Item
                      label="PRICE"
                      name="price"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input price",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter price" />
                    </Form.Item>
                    <Form.Item
                      label="COST PER ITEM"
                      name="costPerItem"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input cost per item",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter cost per item" />
                    </Form.Item>
                    <Form.Item
                      label="INVENTORY COST"
                      name="inventoryCost"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input inventory cost",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter inventory cost"/>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-lg-evenly mt-4 mt-lg-3">
              {/* Stock Management */}
              <div className="col-12 col-lg-10 p-3 p-lg-4 inventoryCards rounded-4 mt-lg-3">
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
                      icon={faBoxesStacked}
                      size="lg"
                      style={{ color: "#0D3884" }}
                    />
                  </div>

                  <div>
                    <div
                      className="fw-bold m-0 p-0 "
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Stock Management
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Inventory levels and reorder details
                    </div>
                  </div>
                </div>
                <div className="border border-1"></div>

                <div className="row mt-3 ">
                  <p
                    style={{
                      fontSize: "18px",
                      color: "#0D3884",
                      fontWeight: "bold",
                    }}
                  >
                    Stock Available: 100
                  </p>
                  <div className="col-12 col-md-6">
                    <Form.Item
                      label="STOCK QUANTITY"
                      name="stockQuantity"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input stock quantity",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter input stock quantity"/>
                    </Form.Item>
                    <Form.Item
                      label="RACK NUMBER"
                      name="rackNumber"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input rack number",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter rack number"/>
                    </Form.Item>

                    <Form.Item
                      label="REORDER LEVEL"
                      name="reorderLevel"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input reorder level",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter input reorder level"/>
                    </Form.Item>
                    <Form.Item
                      label="ITEM REORDER QUANTITY"
                      name="itemReorderQuantity"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input item reorder quantity",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter item reorder quantity" />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6">
                    <Form.Item
                      label="LOCATION"
                      name="location"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please select location",
                        },
                      ]}
                    >
                      <Select
                        mode="tags"
                        placeholder="Select or enter a location"
                        style={{ width: "100%" }}
                        onChange={(value) => {
                          if (Array.isArray(value)) {
                            const latest = value[value.length - 1];
                            form.setFieldsValue({ location: latest });
                          }
                        }}
                        value={
                          form.getFieldValue("location")
                            ? [form.getFieldValue("location")]
                            : []
                        }
                      >
                        {locations.map((loc) => (
                          <Select.Option key={loc} value={loc}>
                            {loc}
                          </Select.Option>
                        ))}
                      </Select>
                    </Form.Item>

                   
                    <Form.Item
                      label="BIN NUMBER"
                      name="binNumber"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input bin number",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter bin number" />
                    </Form.Item>

                     <Form.Item
                      label="DAYS PER REORDER"
                      name="daysPerReorder"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input days per reorder",
                        },
                      ]}
                    >
                      <Input type="number" placeholder="Enter days per reorder" />
                    </Form.Item>

                    <Form.Item
                      label="ITEM DISCONTINUED"
                      name="itemDiscontinued"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input item discontinued",
                        },
                      ]}
                    >
                      <Input placeholder="Enter item discontinued"/>
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 pb-5">
              <Button
                htmlType="submit"
                size="large"
                className="submitButton mt-2"
                disabled={loading}
                loading = {loading}
              >
                {loading ? "Submitting Data..." : "Submit Data"}
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
