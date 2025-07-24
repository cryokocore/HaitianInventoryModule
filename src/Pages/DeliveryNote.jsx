import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faListCheck } from "@fortawesome/free-solid-svg-icons";
import dayjs from "dayjs";

import {
  faCircleUser,
  faLock,
  faUserPlus,
  faUsers,
} from "@fortawesome/free-solid-svg-icons";
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
import "../App.css";

export default function DeliveryNote({ username }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [fetchingData, setFetchingData] = useState(false); 
  const [inputRow, setInputRow] = useState({
    serialNumber: "",
    partNumber: "",
    itemDescription: "",
    quantity: "",
    stockInHand: "",
  });
  const displayData = [{ key: "input", isInput: true }, ...dataSource];

  useEffect(() => {
  const controller = new AbortController(); // to abort outdated requests
  const debounceTimer = setTimeout(() => {
    const fetchStockInHand = async () => {
      const partNumber = inputRow.partNumber.trim();
      if (!partNumber) return;

      setFetchingData(true);
      try {
        const res = await fetch(
          "https://script.google.com/macros/s/AKfycbxgU26ToozFQ4UI9Lvk07t7ewH7FChnZNEDuoT1l9ScMLaPd1EqIx1chVsO_kl-McNFOQ/exec",
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({
              action: "getStockForPartNumber",
              partNumber,
              category: "", // or null if required
            }),
            signal: controller.signal, // Attach abort signal
          }
        );

        const result = await res.json();

        if (result.success) {
          setInputRow((prev) => ({
            ...prev,
            stockInHand: result.stockInHand.toString(),
          }));
        } else {
          setInputRow((prev) => ({
            ...prev,
            stockInHand: "0",
          }));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch stock error:", err);
        }
      } finally {
        setFetchingData(false);
      }
    };

    fetchStockInHand();
  }, 400); // Wait 400ms after last change

  return () => {
    clearTimeout(debounceTimer); // Clear timer on partNumber change
    controller.abort(); // Cancel previous fetch
  };
}, [inputRow.partNumber]);


  const columns = [
    {
      title: "Serial Number",
      dataIndex: "serialNumber",
      width: 150,
      render: (_, record, index) =>
        record.isInput ? (
          <Tooltip>
            <Input placeholder="S.No." value={dataSource.length + 1} readOnly />
          </Tooltip>
        ) : (
          <Tooltip title={record.serialNumber}>
            <span>{record.serialNumber}</span>
          </Tooltip>
        ),
    },

    {
      title: "Part Number",
      dataIndex: "partNumber",
      width: 250,
      ellipsis: true,
      render: (_, record) =>
        record.isInput ? (
          <Tooltip>
            <Input
              placeholder="Enter part number"
              value={inputRow.partNumber}
              onChange={(e) =>
                setInputRow({ ...inputRow, partNumber: e.target.value })
              }
            />
          </Tooltip>
        ) : (
          <Tooltip title={record.partNumber}>
            <span>{record.partNumber}</span>
          </Tooltip>
        ),
    },
    {
      title: "Item Description",
      dataIndex: "itemDescription",
      ellipsis: true,
      width: 500,
      render: (_, record) =>
        record.isInput ? (
          <Tooltip>
            <Input.TextArea
              // autoSize={{ minRows: 1, maxRows: 1 }}
              rows={1}
              placeholder="Enter description"
              value={inputRow.itemDescription}
              onChange={(e) =>
                setInputRow({ ...inputRow, itemDescription: e.target.value })
              }
            />
          </Tooltip>
        ) : (
          // <Tooltip title={record.description}>
          //   <span>{record.description}</span>
          // </Tooltip>
          <Tooltip
            title={record.itemDescription}
            styles={{
              root: {
                maxWidth: 1000,
                wordWrap: "break-word",
                whiteSpace: "normal",
              },
            }}
          >
            <span className="truncate-text">
              {record.itemDescription?.length > 150
                ? `${record.itemDescription.slice(0, 150)}...`
                : record.itemDescription}
            </span>
          </Tooltip>
        ),
    },

    {
      title: "Quantity",
      dataIndex: "quantity",
      ellipsis: true,
      width: 200,
      render: (_, record) =>
        record.isInput ? (
          <Tooltip>
            <Input
              placeholder="Enter Quantity"
              type="number"
              min={1}
              value={inputRow.quantity}
              onChange={(e) => {
                setInputRow({ ...inputRow, quantity: e.target.value });
              }}
            />
          </Tooltip>
        ) : (
          <Tooltip title={record.quantity}>
            <span>{record.quantity}</span>
          </Tooltip>
        ),
    },

    {
      title: "Stock In Hand",
      dataIndex: "stockInHand",
      width: 200,
      ellipsis: true,
      render: (_, record) =>
        record.isInput ? (
          <Tooltip>
            <Input value={inputRow.stockInHand || "0"} readOnly />
          </Tooltip>
        ) : (
          <Tooltip title={record.stockInHand}>
            <span>{record.stockInHand || "-"}</span>
          </Tooltip>
        ),
    },

    {
      title: "Action",
      width: 120,
      fixed: "right",
      align: "center",
      render: (_, record) =>
        record.isInput ? (
          <Button
            className="addButton ps-4 pe-4"
            onClick={handleAdd}
            disabled={fetchingData}
            loading={fetchingData}
          >
  {fetchingData ? "Fetching" : "Add"}
          </Button>
        ) : (
          <Button
            className="deleteButton ps-3 pe-3"
            onClick={() => handleDelete(record.key)}
          >
            Delete
          </Button>
        ),
    },
  ];

  useEffect(() => {
  const nowUTC = new Date();
  const dubaiOffset = 4 * 60; // UTC+4 in minutes
  const dubaiTime = new Date(nowUTC.getTime() + dubaiOffset * 60000);

  const formatted = dayjs(dubaiTime).format("DD-MM-YYYY");
  setDeliveryDate(formatted);

  // Also set it in the form:
  form.setFieldsValue({ date: formatted });
}, []);


  const handleAdd = () => {
    const { partNumber, itemDescription, quantity } = inputRow;

    if (!partNumber || !itemDescription || !quantity) {
      notification.error({
        message: "Error",
        description:
          "Please fill in Part Number, Item Description and Quantity",
      });
      return;
    }

    const newData = {
      key: Date.now(),
      serialNumber: dataSource.length + 1,
      partNumber,
      itemDescription,
      quantity,
      stockInHand: inputRow.stockInHand || "0",
    };

    const updatedData = [...dataSource, newData].map((item, index) => ({
      ...item,
      serialNumber: index + 1,
    }));

    setDataSource(updatedData);

    setInputRow({
      partNumber: "",
      itemDescription: "",
      quantity: "",
      stockInHand: "",
    });
  };

  const handleDelete = (key) => {
    const updatedData = dataSource
      .filter((item) => item.key !== key)
      .map((item, index) => ({
        ...item,
        serialNumber: index + 1, // reindex after delete
      }));
    setDataSource(updatedData);
  };

  const handleSubmit = async (values) => {
    console.log(values);

    // try {
    //   setLoading(true);
    //   const response = await fetch("https://script.google.com/macros/s/AKfycbxgU26ToozFQ4UI9Lvk07t7ewH7FChnZNEDuoT1l9ScMLaPd1EqIx1chVsO_kl-McNFOQ/exec", {
    //     method: "POST",
    //     body: new URLSearchParams({
    //       action: "addCustomer",
    //       companyname: values.companyname || "-",
    //       salutation: values.salutation || "-",
    //       firstname: values.firstname || "-",
    //       lastname: values.lastname || "-",
    //       customerEmail: values.customerEmail || "-",
    //       workPhoneNumber: values.workPhoneNumber || "-",
    //       mobileNumber: values.mobileNumber || "-",
    //       address: values.address || "-",
    //       trn: values.trn || "-",
    //       currency: values.currency || "-",
    //       paymentTerms: values.paymentTerms || "-",
    //       deliveryTerms: values.deliveryTerms || "-",
    //       userName: username || "-",
    //     }),
    //   });
    //   const result = await response.json();
    //   if (result.success) {
    //     notification.success({
    //       message: "Success",
    //       description: result.message,
    //     });
    //     form.resetFields();
    //   } else {
    //     notification.error({
    //       message: "Error",
    //       description: result.message || "Failed to add customer",
    //     });
    //   }
    // } catch (error) {
    //   notification.error({
    //     message: "Error",
    //     description: "Something went wrong",
    //   });
    // } finally {
    //   setLoading(false);
    // }
  };

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
    font-weight: 600;
    text-align: start;
    background-color: #E8F0FE;
    border-bottom: 1px solid #f0f0f0;
    transition: background 0.2s ease;
  
}
  
  `;
  return (
    <>
      <style>{styl}</style>

      <div className="container-fluid">
        <div className="container">
          <div>
            <h1
              className="text-center m-0 p-0 haitianColor mt-1 "
              style={{ fontSize: "30px" }}
            >
              Delivery Note
            </h1>
            <p
              className="text-center m-0 p-0 haitianInventoryDescriptionText"
              style={{ color: "#0D3884" }}
            >
              (Record of goods delivered, including item list, delivery date,
              and reference details)
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
                      Delivery note information
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Provide the details about delivery note
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
                      label="Company Name"
                      name="companyname"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please input company name!",
                        },
                        {
                          pattern: /^[A-Za-z\s.]+$/,
                          message:
                            "Company name should not contain numbers or special characters!",
                        },
                      ]}
                    >
                      <Input placeholder="Enter Company Name" />
                    </Form.Item>

                    <Form.Item
                      label="Address"
                      name="address"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please enter the address!",
                        },
                      ]}
                    >
                      <Input.TextArea
                        placeholder="Enter Address"
                        autoSize={{ minRows: 4, maxRows: 4 }}
                      />
                    </Form.Item>
                    <div className="row m-0 p-0">
                      <div className="col-2">
                        {" "}
                        <Form.Item
                          label="Date"
                          name="date"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                          disabled
                        >
                          <Input value={deliveryDate} readOnly />
                        </Form.Item>
                      </div>
                      <div className="col-5">
                        <Form.Item
                          label="Mode of delivery"
                          name="modeOfDelivery"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the mode of delivery!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                      <div className="col-5">
                        <Form.Item
                          label="Reference Number"
                          name="referenceNumber"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the reference number!",
                            },
                          ]}
                        >
                          <Input />
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item>
                      <Table
                        columns={columns}
                        dataSource={displayData}
                        pagination={{
                          pageSize: 10,
                        }}
                        rowKey="key"
                        scroll={{ x: "max-content" }}
                        size="middle"
                        bordered
                      />
                    </Form.Item>

                    <div className="col-12 text-center mt-4 mb-3">
                      <Button
                        htmlType="submit"
                        size="large"
                        className="submitButton mt-2"
                        loading={loading}
                      >
                        {loading ? "Submitting Delivery Note" : "Submit Delivery Note"}
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
