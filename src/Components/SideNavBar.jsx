// import React from "react";
// import { Menu } from "antd";
// import {
//   AppstoreOutlined,
//   PieChartOutlined,
//   DollarOutlined,
//   OrderedListOutlined,
//   BarChartOutlined,
//   UnorderedListOutlined,
// } from "@ant-design/icons";
// import "../App.css";
// import HaitianLogo from "../Images/HaitianLogo.png";
// import { useNavigate, useLocation } from "react-router-dom";
// import { LogoutOutlined } from "@ant-design/icons";

// export default function SideNavBar({ onLogout }) {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const customStyles = `
//     .ant-menu-dark, .ant-menu-dark > .ant-menu {
//       background: #0D3884;
//       color: #ffffff;
//       font-family: 'Segoe UI', sans-serif;
//     }

//     .ant-menu-item {
//       font-size: 17px;
//       padding: 18px 28px;
//       transition: background 0.3s ease, transform 0.3s ease;
//     }

//     .ant-menu-item:hover {
//       background-color: #2459b6 !important;
//       transform: translateX(3px);
//     }

//     .ant-menu-dark .ant-menu-item-selected {
//       background-color:rgba(19, 69, 156, 0.96) !important;
//       box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
//       border-left: 4px solid #ffffff;
//       transform: translateX(3px);
//       font-weight: bold;
//       box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.71)
//     }

//     .haitian-logo {
//       display: block;
//       margin: 30px auto 15px;
//       width: 180px;
//       max-width: 85%;
//       border-radius: 8px;
//     }

//     .haitian-title {
//       color: #fff;
//       font-size: 22px;
//       text-align: center;
//       padding: 0 15px 15px;
//       font-weight: 600;
//       line-height: 1.3;
//     }

//     .sidebar-divider {
//       height: 1px;
//       background-color: rgb(255, 255, 255);
//       margin: 10px 10px;
//     }
//   `;

//   return (
//     <>
//       <style>{customStyles}</style>
//       <div
//         className="vh-100 position-fixed shadow"
//         style={{ width: 280, backgroundColor: "#0D3884" }}
//       >
//         <div style={{ width: "95%" }} className="m-auto">
//           <img
//             src={HaitianLogo}
//             alt="Haitian Logo"
//             className="img-fluid  mt-1"
//           />
//         </div>

//         <div className="haitian-title mt-3 text">
//           Haitian Inventory
//           <br />
//           Management System
//         </div>
//         <div className="sidebar-divider"></div>
//         <Menu
//           mode="inline"
//           theme="dark"
//           //   defaultSelectedKeys={["1"]}
//           //   style={{ borderRight: 0 }}
//           selectedKeys={[location.pathname]}
//           onClick={(item) => navigate(item.key)}
//           className="mt-2"
//         >
//           <Menu.Item
//             key="/"
//             icon={<PieChartOutlined style={{ fontSize: "18px" }} />}
//           >
//             Dashboard
//           </Menu.Item>
//           <Menu.Item
//             key="/inventory"
//             icon={<AppstoreOutlined style={{ fontSize: "18px" }} />}
//           >
//             Inventory
//           </Menu.Item>
//           <Menu.Item
//             key="/productCategories"
//             icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
//           >
//             Product Categories
//           </Menu.Item>
//           <Menu.Item
//             key="/orders"
//             icon={<OrderedListOutlined style={{ fontSize: "18px" }} />}
//           >
//             Orders
//           </Menu.Item>
//           <Menu.Item
//             key="/reports"
//             icon={<BarChartOutlined style={{ fontSize: "18px" }} />}
//           >
//             Reports
//           </Menu.Item>
//         </Menu>
//         <div className="p-3">
//           <button className="btn btn-outline-light w-100" onClick={onLogout}>
//             <LogoutOutlined className="me-2" />
//             Logout
//           </button>
//         </div>
//       </div>
//     </>
//   );
// }


import React from "react";
import { Menu, Button } from "antd";
import {
  AppstoreOutlined,
  PieChartOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
} from "@ant-design/icons";
import "../App.css";
import HaitianLogo from "../Images/HaitianLogo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideNavBar({ onLogout }) {
  const navigate = useNavigate();
  const location = useLocation();

  const customStyles = `
    .ant-menu-dark, .ant-menu-dark > .ant-menu {
      background: #0D3884;
      color: #ffffff;
      font-family: 'Segoe UI', sans-serif;
    }

    .ant-menu-item {
      font-size: 17px;
      padding: 18px 28px;
      transition: background 0.3s ease, transform 0.3s ease;
    }

    .ant-menu-item:hover {
      background-color: #2459b6 !important;
      transform: translateX(3px);
    }

    .ant-menu-dark .ant-menu-item-selected {
      background-color: rgba(19, 69, 156, 0.96) !important;
      box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
      border-left: 4px solid #ffffff;
      transform: translateX(3px);
      font-weight: bold;
      box-shadow: 2px 2px 0px 0px rgba(255, 255, 255, 0.71);
    }

    .haitian-logo {
      display: block;
      margin: 30px auto 15px;
      width: 180px;
      max-width: 85%;
      border-radius: 8px;
    }

    .haitian-title {
      color: #fff;
      font-size: 22px;
      text-align: center;
      padding: 0 15px 15px;
      font-weight: 600;
      line-height: 1.3;
    }

    .sidebar-divider {
      height: 1px;
      background-color: rgb(255, 255, 255);
      margin: 10px 10px;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div
        className="h-100 position-fixed shadow"
        style={{
          width: 280,
          backgroundColor: "#0D3884",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        {/* Top: Logo + Title + Menu */}
        <div>
          <div style={{ width: "95%" }} className="m-auto">
            <img
              src={HaitianLogo}
              alt="Haitian Logo"
              className="img-fluid mt-1"
            />
          </div>

          <div className="haitian-title mt-3 text">
            Haitian Inventory
            <br />
            Management System
          </div>
          <div className="sidebar-divider"></div>

          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            onClick={(item) => navigate(item.key)}
            className="mt-2"
          >
            <Menu.Item
              key="/"
              icon={<PieChartOutlined style={{ fontSize: "18px" }} />}
            >
              Dashboard
            </Menu.Item>
            <Menu.Item
              key="/inventory"
              icon={<AppstoreOutlined style={{ fontSize: "18px" }} />}
            >
              Inventory
            </Menu.Item>
            <Menu.Item
              key="/productCategories"
              icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
            >
              Product Categories
            </Menu.Item>
            <Menu.Item
              key="/orders"
              icon={<OrderedListOutlined style={{ fontSize: "18px" }} />}
            >
              Orders
            </Menu.Item>
            <Menu.Item
              key="/reports"
              icon={<BarChartOutlined style={{ fontSize: "18px" }} />}
            >
              Reports
            </Menu.Item>
          </Menu>
        </div>

        {/* Bottom: Logout */}
        <div className="p-3">
          <Button color="danger" variant="filled" className="w-100" size="large" onClick={onLogout}>
            <LogoutOutlined className="me-2" />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
