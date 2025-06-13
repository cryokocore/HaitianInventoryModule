// import React from "react";
// import { Button, Form, Input, Radio } from "antd";

// export default function InventoryModule() {
//   const [form] = Form.useForm();
//    const handleSubmit = ()=>{

//    }
//    const styl = `.ant-form-item .ant-form-item-label >label {
//     position: relative;
//     display: inline-flex
// ;
//     align-items: center;
//     max-width: 100%;
//     height: 32px;
//     color: #0D3884;
//     font-size: 14px;
// }`
//   return (
//     <div className="container-fluid">
//         <style>{styl}</style>
//       <div className="row">
//         <div className="col-12">
//           <Form form={form} variant="filled" layout="vertical" className="mt-5" onFinish={handleSubmit}>
//             <div className="row">
//               <div className="col-12 col-md-6">
//                 <Form.Item
//                   label="REORDER(auto-fill)"
//                   name="reorder"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input reorder(auto-fill)",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   label="ITEM NO."
//                   name="itemNo"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input item no.",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="NAME"
//                   name="name"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input name",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="MANUFACTURER"
//                   name="manufacturer"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input manufacturer",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="DESCRIPTION"
//                   name="description"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input description",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="PRICE"
//                   name="price"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input price",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="COST PER ITEM"
//                   name="costPerItem"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input cost per item",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//               </div>
//                   <div className="col-12 col-md-6">
//                 <Form.Item
//                   label="STOCK QUANTITY"
//                   name="stockQuantity"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input stock quantity",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                 <Form.Item
//                   label="INVENTORY COST"
//                   name="inventoryCost"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input inventory cost",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="REORDER LEVEL"
//                   name="reorderLevel"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input reorder level",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="DAYS PER REORDER"
//                   name="daysPerReorder"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input days per reorder",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="ITEM REORDER QUANTITY"
//                   name="itemReorderQuantity"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input item reorder quantity",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>
//                  <Form.Item
//                   label="ITEM DISCONTINUED"
//                   name="itemDiscontinued"
//                   rules={[
//                     {
//                       required: "true",
//                       message: "Please input item discontinued",
//                     },
//                   ]}
//                 >
//                   <Input />
//                 </Form.Item>

//               </div>
//               <div >
//               <Button htmlType="submit" className="m-0 m-auto">Submit</Button>
//               </div>
//             </div>
//           </Form>
//         </div>
//       </div>
//     </div>
//   );
// }

import React from "react";
import { Button, Form, Input, Radio } from "antd";
import HaitianLogo from "../Images/HaitianLogo.png";
import "../App.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBoxesStacked,
  faChartSimple,
  faDollar,
  faListCheck,
  faSquarePollVertical,
} from "@fortawesome/free-solid-svg-icons";

export default function InventoryModule() {
  const [form] = Form.useForm();
  const handleSubmit = () => {};
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
`;
  return (
    <div className="container-fluid">
      <style>{styl}</style>
      <div className="container ">
        <div className="col-12 d-flex justify-content-center">
          <img
            src={HaitianLogo}
            alt="HaitianLogo"
            className="img-fluid haitianLogo"
          />
        </div>

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
        </div>
        <div className="row d-flex flex-row mt-4">
          <Form
            form={form}
            variant="filled"
            layout="vertical"
            className="mt-3 mt-lg-5 "
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
                      style={{ fontSize: "20px", color: "#0D3884"}}
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
                    <Form.Item
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
                    </Form.Item>
                    <Form.Item
                      label="ITEM NAME"
                      name="itemName"
                      className="fw-bold"
                      rules={[
                        {
                          required: "true",
                          message: "Please input item name",
                        },
                      ]}
                    >
                      <Input />
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
                      <Input />
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
                      <Input />
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
                    <Input />
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
                      <Input />
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
                      <Input />
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
                      <Input />
                    </Form.Item>
                  </div>
                </div>
              </div>
            </div>

            <div className="d-flex flex-column flex-lg-row justify-content-lg-evenly mt-4 mt-lg-3">
              {/* Stock Management */}
              <div className="col-12 col-lg-6 p-3 p-lg-4 inventoryCards rounded-4 mt-lg-3">
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
                      <Input />
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
                      <Input />
                    </Form.Item>
                  </div>
                  <div className="col-12 col-md-6">
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
                      <Input />
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
                      <Input />
                    </Form.Item>
                  </div>
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
                    <Input />
                  </Form.Item>
                </div>
              </div>

              {/* Quick Stats */}
              <div className="col-12 col-lg-5 mt-4 mt-lg-0 p-3 p-lg-4 inventoryCards rounded-4 mt-lg-3">
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
                      icon={faChartSimple}
                      size="xl"
                      style={{ color: "#0D3884" }}
                    />
                  </div>

                  <div>
                    <div
                      className="fw-bold m-0 p-0"
                      style={{ fontSize: "20px", color: "#0D3884" }}
                    >
                      Quick Stats
                    </div>
                    <div
                      className="m-0 p-0"
                      style={{ fontSize: "14px", color: "#0D3884" }}
                    >
                      Overview metrics
                    </div>
                  </div>
                </div>
                <div className="border border-1"></div>
                <div className="row mt-3 ">
                  <div className="col-12">
                    <div
                      className="card border border-0 p-2 text-success"
                      style={{ backgroundColor: "rgba(67, 235, 129, 0.32)" }}
                    >
                      <p className="m-0 p-0 " style={{ fontSize: "20px" }}>
                        TOTAL ITEMS
                      </p>
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>
                        10000
                      </p>
                    </div>
                    <div
                      className="card mt-2 border border-0 p-2 text-warning"
                      style={{ backgroundColor: "rgba(252, 234, 153, 0.68)" }}
                    >
                      <p className=" m-0 p-0 " style={{ fontSize: "20px" }}>
                        Low Stock
                      </p>
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>23</p>
                    </div>
                    <div
                      className="card mt-2 border border-0 p-2 text-danger"
                      style={{ backgroundColor: "rgb(255, 197, 197)" }}
                    >
                      <p className="m-0 p-0" style={{ fontSize: "20px" }}>
                        Reorder Soon
                      </p>
                      <p style={{ fontSize: "20px", fontWeight: "bold" }}>10</p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            <div className="d-flex justify-content-center mt-4 pb-5">
              <Button
                htmlType="submit"
                size="large"
                className="submitButton mt-2"
              >
                Submit Data
              </Button>
            </div>
          </Form>
        </div>
      </div>
    </div>
  );
}
