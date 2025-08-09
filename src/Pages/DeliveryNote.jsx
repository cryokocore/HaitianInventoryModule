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
  DatePicker,
} from "antd";
import "../App.css";

export default function DeliveryNote({ username }) {
  const [form] = Form.useForm();
  const [loading, setLoading] = useState(false);
  const [dataSource, setDataSource] = useState([]);
  const [deliveryDate, setDeliveryDate] = useState("");
  const [loadingDeliveryNumber, setLoadingDeliveryNumber] = useState(true);
  const [loadingCustomerName, setLoadingCustomerName] = useState(true);
  const [loadingDescription, setLoadingDescription] = useState(true);
  const [loadingPartNumber, setLoadingPartNumber] = useState(true);
  const [fetchingData, setFetchingData] = useState(false);
  const [descriptionList, setDescriptionList] = useState([]);
  const [stockLoading, setStockLoading] = useState(false);
  const [inputRow, setInputRow] = useState({
    serialNumber: "",
    partNumber: "",
    itemDescription: "",
    quantity: "",
    stockInHand: "",
    unit: "",
      stockUnit: "",
  });
  const displayData = [{ key: "input", isInput: true }, ...dataSource];
  const [customerList, setCustomerList] = useState([]);
  const GAS_URL = "https://script.google.com/macros/s/AKfycbyELES1dYaCII-ILiHab9ejO2_dp-jmVQkGjfHkCTwpWfE9Oa_w40rBNncbBCyy2yy7jA/exec"

  // useEffect(() => {
  //   const fetchDeliveryNumber = async () => {
  //     try {
  //       setLoadingDeliveryNumber(true);
  //       const response = await fetch(
  //         "https://script.google.com/macros/s/AKfycbyX0zO1CBzWD8nzyZBt7och2YiwRIpyQ1CANs8xf4YvzYyXPnO4VDhW9bl2sG2XnXw/exec",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //           body: new URLSearchParams({ action: "getNextDeliveryNumber" }),
  //         }
  //       );
  //       const result = await response.json();
  //       if (result.success) {
  //         form.setFieldsValue({ deliveryNumber: result.deliveryNumber });
  //       }
  //     } catch (err) {
  //       console.error("Error fetching delivery number:", err);
  //     } finally {
  //       setLoadingDeliveryNumber(false); // Done loading
  //     }
  //   };

  //   fetchDeliveryNumber();
  // }, []);

  // useEffect(() => {
  //   const fetchCustomers = async () => {
  //     try {
  //       setLoadingCustomerName(true);

  //       const res = await fetch(
  //         "https://script.google.com/macros/s/AKfycbxf-gDxhJvbpiC_qPYwonX3CpjIVQlZwsxG05JT_WLHppKdHImlyGLBfGEe9j7GMPky_Q/exec",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //           body: new URLSearchParams({ action: "getCustomerDetails" }),
  //         }
  //       );

  //       const result = await res.json();
  //       if (result.success) {
  //         setCustomerList(result.customers);
  //         console.log("Fetched Customers:");
  //         result.customers.forEach((cust, index) => {
  //           console.log(
  //             `${index + 1}. Name: ${cust.customername}, Address: ${
  //               cust.address
  //             }`
  //           );
  //         });
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch customer details:", err);
  //     } finally {
  //       setLoadingCustomerName(false);
  //     }
  //   };

  //   fetchCustomers();
  // }, []);

  // useEffect(() => {
  //   const fetchDescriptions = async () => {
  //     try {
  //       setLoadingDescription(true);
  //       const res = await fetch(
  //         "https://script.google.com/macros/s/AKfycbxf-gDxhJvbpiC_qPYwonX3CpjIVQlZwsxG05JT_WLHppKdHImlyGLBfGEe9j7GMPky_Q/exec",
  //         {
  //           method: "POST",
  //           headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //           body: new URLSearchParams({
  //             action: "getAllDescriptionsWithPartNumbers",
  //           }),
  //         }
  //       );

  //       const result = await res.json();
  //       console.log(result);
  //       if (result.success) {
  //         setDescriptionList(result.items);
  //       }
  //     } catch (err) {
  //       console.error("Failed to fetch descriptions:", err);
  //     } finally {
  //       setLoadingDescription(false);
  //     }
  //   };

  //   fetchDescriptions();
  // }, []);

  // useEffect(() => {
  //   const controller = new AbortController(); // to abort outdated requests
  //   const debounceTimer = setTimeout(() => {
  //     const fetchStockInHand = async () => {
  //       const partNumber = inputRow.partNumber.trim();
  //       if (!partNumber) return;

  //       setFetchingData(true);
  //       try {
  //         const res = await fetch(
  //           "https://script.google.com/macros/s/AKfycbxf-gDxhJvbpiC_qPYwonX3CpjIVQlZwsxG05JT_WLHppKdHImlyGLBfGEe9j7GMPky_Q/exec",
  //           {
  //             method: "POST",
  //             headers: { "Content-Type": "application/x-www-form-urlencoded" },
  //             body: new URLSearchParams({
  //               action: "getStockForPartNumber",
  //               partNumber,
  //               category: "", // or null if required
  //             }),
  //             signal: controller.signal, // Attach abort signal
  //           }
  //         );

  //         const result = await res.json();

  //         if (result.success) {
  //           console.log("Fetched stock/unit:", result.stockInHand, result.unit);

  //           setInputRow((prev) => ({
  //             ...prev,
  //             stockInHand: result.stockInHand.toString(),
  //             stockUnit: result.unit || "",
  //           }));
  //         } else {
  //           setInputRow((prev) => ({
  //             ...prev,
  //             stockInHand: "0",
  //             stockUnit: "",
  //           }));
  //         }
  //       } catch (err) {
  //         if (err.name !== "AbortError") {
  //           console.error("Fetch stock error:", err);
  //         }
  //       } finally {
  //         setFetchingData(false);
  //       }
  //     };

  //     fetchStockInHand();
  //   }, 400); // Wait 400ms after last change

  //   return () => {
  //     clearTimeout(debounceTimer); // Clear timer on partNumber change
  //     controller.abort(); // Cancel previous fetch
  //   };
  // }, [inputRow.partNumber]);


  // Replace the three separate useEffects for delivery number, customers, descriptions with:
useEffect(() => {
  const fetchInitialData = async () => {
    try {
      setLoadingDeliveryNumber(true);
      setLoadingCustomerName(true);
      setLoadingDescription(true);

      const [deliveryRes, customerRes, descRes] = await Promise.all([
        fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ action: "getNextDeliveryNumber" }),
        }),
        fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ action: "getCustomerDetails" }),
        }),
        fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({ action: "getAllDescriptionsWithPartNumbers" }),
        }),
      ]);

      const [deliveryNum, customers, descriptions] = await Promise.all([
        deliveryRes.json(),
        customerRes.json(),
        descRes.json(),
      ]);

      if (deliveryNum.success) {
        form.setFieldsValue({ deliveryNumber: deliveryNum.deliveryNumber });
      }
      if (customers.success) {
        setCustomerList(customers.customers);
      }
      if (descriptions.success) {
        setDescriptionList(descriptions.items);
      }
    } catch (err) {
      console.error("Error fetching initial data:", err);
    } finally {
      setLoadingDeliveryNumber(false);
      setLoadingCustomerName(false);
      setLoadingDescription(false);
    }
  };

  fetchInitialData();
}, []);

// Re-fetch descriptions when partNumber search changes
useEffect(() => {
  if (!inputRow.partNumber && !inputRow.itemDescription) return;

  const controller = new AbortController();
            setFetchingData(true);

  const timer = setTimeout(async () => {
    try {
      const res = await fetch(GAS_URL, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: new URLSearchParams({
          action: "getAllDescriptionsWithPartNumbers",
          query: inputRow.partNumber || inputRow.itemDescription || "",
        }),
        signal: controller.signal,
      });
      const result = await res.json();
      if (result.success) {
        setDescriptionList(result.items);
        
      }
    } catch (err) {
      if (err.name !== "AbortError") console.error(err);
    }
    finally{
                setFetchingData(false);

    }
  }, 300);

  return () => {
    clearTimeout(timer);
    controller.abort();
  };
}, [inputRow.partNumber, inputRow.itemDescription]);

useEffect(() => {
  if (!inputRow.partNumber) return; 

  const controller = new AbortController();
  const debounceTimer = setTimeout(() => {
    const fetchStockInHand = async () => {
setStockLoading(true);
      try {
        const res = await fetch(GAS_URL, {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            action: "getStockForPartNumber",
            partNumber: inputRow.partNumber,
            category: "" // update if needed
          }),
          signal: controller.signal
        });

        const result = await res.json();
        if (result.success) {
          setInputRow((prev) => ({
            ...prev,
            stockInHand: result.stockInHand?.toString() || "0",
            stockUnit: result.unit || ""
          }));
        } else {
          setInputRow((prev) => ({
            ...prev,
            stockInHand: "0",
            stockUnit: ""
          }));
        }
      } catch (err) {
        if (err.name !== "AbortError") {
          console.error("Fetch stock error:", err);
        }
      } finally {
        setStockLoading(false);
       }
    };

    fetchStockInHand();
  }, 400);

  return () => {
    clearTimeout(debounceTimer);
    controller.abort();
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
            <Select
              showSearch
              placeholder="Enter part number"
              value={inputRow.partNumber}
              loading={loadingDescription} // shows spinner
              notFoundContent={
                loadingDescription ? "Fetching..." : "No results found"
              }
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                const selected = descriptionList.find(
                  (item) => item.partNumber === value
                );
                setInputRow((prev) => ({
                  ...prev,
                  partNumber: value,
                  itemDescription:
                    selected?.description || prev.itemDescription,
                    unit: selected?.unit || "", 

                }));
              }}
              onSearch={(value) => {
                setInputRow((prev) => ({
                  ...prev,
                  partNumber: value,
                }));
              }}
              style={{ width: "100%" }}
            >
              {[...new Set(descriptionList.map((item) => item.partNumber))]
                .filter((p) => p) // remove empty
                .map((part, idx) => (
                  <Select.Option key={`pn-${idx}`} value={part}>
                    {part}
                  </Select.Option>
                ))}
            </Select>
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
            <Select
              showSearch
              value={inputRow.itemDescription}
              loading={loadingDescription}
              notFoundContent={
                loadingDescription ? "Fetching..." : "No results found"
              }
              placeholder="Select or type description"
              filterOption={(input, option) =>
                option.children.toLowerCase().includes(input.toLowerCase())
              }
              onChange={(value) => {
                const selected = descriptionList.find(
                  (item) => item.description === value
                );
                setInputRow((prev) => ({
                  ...prev,
                  itemDescription: value,
                  partNumber: selected?.partNumber || prev.partNumber,
                }));
              }}
              style={{ width: "100%" }}
            >
              {[...new Set(descriptionList.map((item) => item.description))]
                .filter((d) => d)
                .map((desc, idx) => (
                  <Select.Option key={`desc-${idx}`} value={desc}>
                    {desc}
                  </Select.Option>
                ))}
            </Select>
          </Tooltip>
        ) : (
          <Tooltip title={record.itemDescription}>
            <span className="truncate-text">
              {record.itemDescription?.length > 150
                ? `${record.itemDescription.slice(0, 150)}...`
                : record.itemDescription}
            </span>
          </Tooltip>
        ),
    },
    // {
    //   title: "Quantity",
    //   dataIndex: "quantity",
    //   ellipsis: true,
    //   width: 200,
    //   render: (_, record) =>
    //     record.isInput ? (
    //       <Tooltip>
    //         <Input
    //           placeholder="Enter Quantity"
    //           type="number"
    //           min={1}
    //           value={inputRow.quantity}
    //           onChange={(e) => {
    //             const value = parseInt(e.target.value);
    //             if (value >= 1 || e.target.value === "") {
    //               setInputRow({ ...inputRow, quantity: e.target.value });
    //             }
    //           }}
    //         />
    //       </Tooltip>
    //     ) : (
    //       <Tooltip title={record.quantity}>
    //         <span>{record.quantity}</span>
    //       </Tooltip>
    //     ),
    // },
        {
          title: "Quantity",
          dataIndex: "quantity",
          ellipsis: true,
          width: 200,
          render: (_, record) =>
            record.isInput ? (
              <Tooltip>
                <Input
                  placeholder="Enter quantity"
                  type="number"
                  min={1}
                  value={inputRow.quantity}
                  onChange={(e) => {
                    const value = e.target.value.trim();
                    setInputRow((prev) => ({ ...prev, quantity: value }));
    
                    clearTimeout(window.quantityDebounce);
                    window.quantityDebounce = setTimeout(() => {
                      const num = parseFloat(value);
                      if (
                        value !== "" &&
                        (value === "0" ||
                          value === "0.0" ||
                          value === ".0" ||
                          isNaN(num) ||
                          num === 0) 
                      ) {
                        notification.error({
                          message: "Invalid Quantity",
                          description: "Quantity must be greater than 0.",
                        });
                        setInputRow((prev) => ({ ...prev, quantity: "" }));
                        return;
                      } 
                            // Unit check - get latest from record or inputRow
              const unit = ((record.unit || inputRow.unit) || "").toLowerCase();
              if ((unit === "set" || unit === "piece") && !Number.isInteger(num)) {
                notification.error({
                  message: "Invalid Quantity",
                  description: `Quantity for unit "${record.unit || inputRow.unit}" must be a whole number.`,
                });
                setInputRow((prev) => ({ ...prev, quantity: "" }));
                return;
              }

                    }, 300);
                  }}
                />
              </Tooltip>
            ) : (
              <Tooltip title={record.quantity}>
                <span>{record.quantity}</span>
              </Tooltip>
            ),
        },
    // {
    //   title: "Unit",
    //   dataIndex: "unit",
    //   ellipsis: true,
    //   width: 200,
    //   render: (_, record) =>
    //     record.isInput ? (
    //       <Tooltip>
    //         <Input value={inputRow.unit ? inputRow.unit : " "} readOnly />
    //       </Tooltip>
    //     ) : (
    //       <Tooltip title={inputRow.unit}>
    //         <span>{record.unit ? record.unit : "-"}</span>
    //       </Tooltip>
    //     ),
    // },

    {
  title: "Unit",
  dataIndex: "unit",
  ellipsis: true,
  width: 200,
  render: (_, record) =>
    record.isInput ? (
      <Tooltip>
        <Input
          value={
            stockLoading
              ? ""
              : inputRow.unit || ""
          }
          placeholder={
            stockLoading
              ? "Fetching unit..."
              : inputRow.unit || "-"
          }
          readOnly
        />
      </Tooltip>
    ) : (
      <Tooltip title={record.unit}>
        <span>{record.unit || "-"}</span>
      </Tooltip>
    ),
},


    // {
    //   title: "Stock In Hand",
    //   dataIndex: "stockInHand",
    //   width: 200,
    //   ellipsis: true,
    //   render: (_, record) =>
    //     record.isInput ? (
    //       <Tooltip>
    //         <Input
    //           value={
    //             inputRow.stockInHand
    //               ? `${inputRow.stockInHand} ${inputRow.stockUnit || ""}`
    //               : "0"
    //           }
    //           readOnly
    //         />
    //       </Tooltip>
    //     ) : (
    //       <Tooltip title={`${record.stockInHand} ${record.stockUnit || ""}`}>
    //         <span>
    //           {record.stockInHand
    //             ? `${record.stockInHand} ${record.stockUnit || ""}`
    //             : "-"}
    //         </span>
    //       </Tooltip>
    //     ),
    // },
    {
  title: "Stock In Hand",
  dataIndex: "stockInHand",
  width: 200,
  ellipsis: true,
  render: (_, record) =>
    record.isInput ? (
      <Tooltip>
        <Input
          value={
            stockLoading
              ? "" // leave value blank while loading
              : inputRow.stockInHand
              ? `${inputRow.stockInHand} ${inputRow.stockUnit || ""}`
              : "0"
          }
          placeholder={
            stockLoading
              ? "Fetching stock in hand..."
              : inputRow.stockInHand
              ? `${inputRow.stockInHand} ${inputRow.stockUnit || ""}`
              : "-"
          }
          readOnly
        />
      </Tooltip>
    ) : (
      <Tooltip title={`${record.stockInHand} ${record.stockUnit || ""}`}>
        <span>
          {record.stockInHand
            ? `${record.stockInHand} ${record.stockUnit || ""}`
            : "-"}
        </span>
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

  // useEffect(() => {
  //   const nowUTC = new Date();
  //   const dubaiOffset = 4 * 60;
  //   const dubaiTime = new Date(nowUTC.getTime() + dubaiOffset * 60000);

  //   const dubaiDayjs = dayjs(dubaiTime);
  //   const formatted = dubaiDayjs.format("DD-MM-YYYY");

  //   setDeliveryDate(formatted);

  //   if (username === "Admin") {
  //     // Only set for form field if admin (since it binds to form)
  //     form.setFieldsValue({ date: dubaiDayjs });
  //   } else {
  //     // form.setFieldsValue({ date: dayjs(dubaiTime).format("DD-MM-YYYY") });
  //        form.setFieldsValue({ date: formatted });
  //     console.log(form.date);
  //   }
  // }, []);

  // useEffect(() => {
  //   const nowUTC = new Date();
  //   const dubaiOffset = 4 * 60;
  //   const dubaiTime = new Date(nowUTC.getTime() + dubaiOffset * 60000);
  //   const dubaiDayjs = dayjs(dubaiTime);
  //     const formatted = dubaiDayjs.format("DD-MM-YYYY");

  //   setDeliveryDate(formatted);
  //       console.log("Non-admin deliveryDate:", formatted); // ✅ Add this line

  //   form.setFieldsValue({ date: dubaiDayjs });
  // }, []);

  useEffect(() => {
    const nowUTC = new Date();
    const dubaiOffset = 4 * 60;
    const dubaiTime = new Date(nowUTC.getTime() + dubaiOffset * 60000);

    const dubaiDayjs = dayjs(dubaiTime);
    const formatted = dubaiDayjs.format("DD-MM-YYYY");

    setDeliveryDate(formatted);

    if (username === "Admin") {
      // Admin gets dayjs object for DatePicker
      form.setFieldsValue({ date: dubaiDayjs });
    } else {
      // Non-admin gets formatted string for Input field
      form.setFieldsValue({ date: formatted });
    }

    console.log("Non-admin deliveryDate:", formatted);
  }, []);

  const handleAdd = () => {
    if (dataSource.length >= 50) {
      notification.warning({
        message: "Limit Reached",
        description: "You can only add a maximum of 50 items.",
      });
      return;
    }

    const { partNumber, itemDescription, quantity } = inputRow;

    if (!partNumber || !itemDescription || !quantity) {
      notification.error({
        message: "Error",
        description:
          "Please fill in Part Number, Item Description and Quantity",
      });
      return;
    }
    const stock = parseInt(inputRow.stockInHand) || 0;
    const qty = parseInt(quantity) || 0;

    // Calculate existing quantity of this part number already in the table
    const existingQtyForPart = dataSource
      .filter((item) => item.partNumber === partNumber)
      .reduce((sum, item) => sum + parseInt(item.quantity || 0), 0);

    // Total requested quantity (existing + new)
    const totalRequestedQty = existingQtyForPart + qty;

    if (totalRequestedQty > stock) {
      notification.error({
        message: "Quantity Exceeds Stock",
        description: `Total quantity (${totalRequestedQty}) exceeds stock in hand (${stock}).`,
      });
      return;
    }

    // ✅ Define newData here
    const newData = {
      key: Date.now(),
      serialNumber: dataSource.length + 1,
      partNumber,
      itemDescription,
      quantity,
      stockInHand: inputRow.stockInHand || "0",
      unit: inputRow.unit || "",
        stockUnit: inputRow.stockUnit || "",
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
      unit: "",
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
    if (!navigator.onLine) {
      notification.error({
        message: "No Internet Connection",
        description: "Please check your internet and try again.",
      });
      return;
    }
    if (dataSource.length === 0) {
      notification.error({
        message: "No Items",
        description: "Please add at least one item to submit.",
      });
      return;
    }

    try {
      setLoading(true);
      console.log(
        "Date sent to backend:",
        values.date,
        dayjs(values.date).format("DD-MM-YYYY")
      );

      const response = await fetch(
        GAS_URL,
        {
          method: "POST",
          headers: { "Content-Type": "application/x-www-form-urlencoded" },
          body: new URLSearchParams({
            action: "addDeliveryNote",
            deliveryNumber: values.deliveryNumber,
            // date: values.date,
            // date: values.date ? dayjs(values.date).format("DD-MM-YYYY") : "",
            date:
              username === "Admin"
                ? dayjs(values.date).format("DD-MM-YYYY")
                : deliveryDate,

            customername: values.customername,
            address: values.address,
            modeOfDelivery: values.modeOfDelivery,
            reference: values.reference,
            items: JSON.stringify(dataSource),
            userName: username || "-",
          }),
        }
      );
      const result = await response.json();
      if (result.success) {
        notification.success({
          message: "Success",
          description: result.message,
        });
        // form.resetFields();
        setDataSource([]);
        setInputRow({
          partNumber: "",
          itemDescription: "",
          quantity: "",
          unit:"",
          stockInHand: "",
        });
        // Fetch new delivery number
        const nextRes = await fetch(
          GAS_URL,
          {
            method: "POST",
            headers: { "Content-Type": "application/x-www-form-urlencoded" },
            body: new URLSearchParams({ action: "getNextDeliveryNumber" }),
          }
        );

        const nextResult = await nextRes.json();
        if (nextResult.success) {
          form.setFieldsValue({ deliveryNumber: nextResult.deliveryNumber });
        }
        const nowUTC = new Date();
        const dubaiOffset = 4 * 60;
        const dubaiTime = new Date(nowUTC.getTime() + dubaiOffset * 60000);

        const dubaiDayjs = dayjs(dubaiTime);
        const formatted = dubaiDayjs.format("DD-MM-YYYY");

        setDeliveryDate(formatted);

        if (username === "Admin") {
          // Admin gets dayjs object for DatePicker
          form.setFieldsValue({ date: dubaiDayjs });
        } else {
          // Non-admin gets formatted string for Input field
          form.setFieldsValue({ date: formatted });
        }
        form.setFields([
          { name: "customername", value: undefined },
          { name: "address", value: undefined },
          { name: "modeOfDelivery", value: undefined },
          { name: "reference", value: undefined },
        ]);

        console.log("deliveryDate for non-admin:", deliveryDate);
      } else {
        notification.error({
          message: "Error",
          description: result.message || "Failed to add delivery note",
        });
      }
    } catch (err) {
      console.error(err);
      notification.error({
        message: "Error",
        description: "Something went wrong",
      });
    } finally {
      setLoading(false);
    }
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
                    <div className="row m-0 p-0">
                      {/* <div className="col-6">
                        <Form.Item
                          label="Delivery Number"
                          name="deliveryNumber"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                          loading={loadingDeliveryNumber}
                        >
                          <Input
                            placeholder="Delivery Number"
                            readOnly
                            value={
                              loadingDeliveryNumber
                                ? "Fetching..."
                                : form.getFieldValue("deliveryNumber")
                            }
                          />
                        </Form.Item>
                      </div> */}
                      <div className="col-6">
                        <Form.Item
                          label="Delivery Number"
                          name="deliveryNumber"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "",
                            },
                          ]}
                        >
                          <div>
                            <Input
                              placeholder="Delivery Number"
                              readOnly
                              value={
                                loadingDeliveryNumber
                                  ? "Fetching..."
                                  : form.getFieldValue("deliveryNumber")
                              }
                            />
                          </div>
                        </Form.Item>
                      </div>

                      <div className="col-6">
                        <Form.Item
                          label="Date"
                          name="date"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please select the delivery date",
                            },
                          ]}
                        >
                          {username === "Admin" ? (
                            <DatePicker
                              format="DD-MM-YYYY"
                              value={form.getFieldValue("date")} // ✅ dayjs object
                              onChange={(date) => {
                                if (date && dayjs(date).isValid()) {
                                  setDeliveryDate(date.format("DD-MM-YYYY"));
                                  form.setFieldsValue({ date });
                                } else {
                                  setDeliveryDate("");
                                  form.setFieldsValue({ date: null });
                                }
                              }}
                              className="w-100"
                            />
                          ) : (
                            <Input
                              placeholder="Delivery Date"
                              value={deliveryDate}
                              readOnly
                            />
                          )}
                        </Form.Item>
                      </div>
                    </div>
                    <Form.Item
                      label="Customer Name"
                      name="customername"
                      className="fw-bold"
                      rules={[
                        {
                          required: true,
                          message: "Please input customer name!",
                        },
                      ]}
                    >
                      <Select
                        showSearch
                        placeholder="Search Customer Name"
                        loading={loadingCustomerName}
                        notFoundContent={
                          loadingCustomerName
                            ? "Fetching..."
                            : "No results found"
                        }
                        filterOption={(input, option) =>
                          option.children
                            .toLowerCase()
                            .includes(input.toLowerCase())
                        }
                        onChange={(value) => {
                          const customer = customerList.find(
                            (c) => c.customername === value
                          );
                          if (customer) {
                            form.setFieldsValue({ address: customer.address });
                          }
                        }}
                      >
                        {customerList.map((customer) => (
                          <Select.Option
                            key={customer.customername}
                            value={customer.customername}
                          >
                            {customer.customername}
                          </Select.Option>
                        ))}
                      </Select>
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
                      <Input.TextArea placeholder="Enter Address" rows={6} />
                    </Form.Item>
                    <div className="row m-0 p-0">
                      <div className="col-6">
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
                      <div className="col-6">
                        <Form.Item
                          label="Reference "
                          name="reference"
                          className="fw-bold"
                          rules={[
                            {
                              required: true,
                              message: "Please enter the reference!",
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
                        {loading
                          ? "Submitting Delivery Note"
                          : "Submit Delivery Note"}
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
                            const preservedFields = {
                              deliveryNumber: values.deliveryNumber,
                              date: values.date,
                            };
                            // form.resetFields();
                            setDataSource([]);
                            setInputRow({
                              partNumber: "",
                              itemDescription: "",
                              quantity: "",
                              unit:"",
                              stockInHand: "",
                            });
                            form.setFields([
                              { name: "customername", value: undefined },
                              { name: "address", value: undefined },
                              { name: "modeOfDelivery", value: undefined },
                              { name: "reference", value: undefined },
                            ]);
                            form.setFieldsValue(preservedFields);
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
