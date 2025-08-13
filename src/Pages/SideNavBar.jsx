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

// import React from "react";
// import { Menu, Button } from "antd";
// import {
//   AppstoreOutlined,
//   PieChartOutlined,
//   OrderedListOutlined,
//   BarChartOutlined,
//   UnorderedListOutlined,
//   LogoutOutlined,
// } from "@ant-design/icons";
// import "../App.css";
// import HaitianLogo from "../Images/HaitianLogo.png";
// import { useNavigate, useLocation } from "react-router-dom";

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
//     background-color: #3B5BD9 !important;
//       box-shadow: 2px 2px 6px rgba(0, 0, 0, 0.25);
//       border-left: 4px solid #ffffff;
//       transform: translateX(3px);
//       font-weight: bold;
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
//         className="h-100 position-fixed shadow"
//         style={{
//           width: 280,
//           backgroundColor: "#0D3884",
//           display: "flex",
//           flexDirection: "column",
//           justifyContent: "space-between",
//         }}
//       >
//         {/* Top: Logo + Title + Menu */}
//         <div>
//           <div style={{ width: "95%" }} className="m-auto">
//             <img
//               src={HaitianLogo}
//               alt="Haitian Logo"
//               className="img-fluid mt-1"
//             />
//           </div>

//           <div className="haitian-title mt-3 text">
//             Haitian Inventory
//             <br />
//             Management System
//           </div>
//           <div className="sidebar-divider"></div>

//           <Menu
//             mode="inline"
//             theme="dark"
//             selectedKeys={[location.pathname]}
//             onClick={(item) => navigate(item.key)}
//             className="mt-2"
//           >
//             <Menu.Item
//               key="/"
//               icon={<PieChartOutlined style={{ fontSize: "18px" }} />}
//             >
//               Dashboard
//             </Menu.Item>
//             <Menu.Item
//               key="/inventory"
//               icon={<AppstoreOutlined style={{ fontSize: "18px" }} />}
//             >
//               Inventory
//             </Menu.Item>
//             <Menu.Item
//               key="/productCategories"
//               icon={<UnorderedListOutlined style={{ fontSize: "18px" }} />}
//             >
//               Product Categories
//             </Menu.Item>
//             <Menu.Item
//               key="/orders"
//               icon={<OrderedListOutlined style={{ fontSize: "18px" }} />}
//             >
//               Orders
//             </Menu.Item>
//             <Menu.Item
//               key="/reports"
//               icon={<BarChartOutlined style={{ fontSize: "18px" }} />}
//             >
//               Reports
//             </Menu.Item>
//           </Menu>
//         </div>

//         {/* Bottom: Logout */}
//         <div className="p-3">
//           <Button className = "logoutButton p-2" size="large" onClick={onLogout}>
//             <LogoutOutlined className="me-2" />
//             Logout
//           </Button>
//         </div>
//       </div>
//     </>
//   );
// }

import React from "react";
import { Menu, Button, Avatar } from "antd";
import { UserOutlined, UserAddOutlined, FileDoneOutlined } from "@ant-design/icons";

import {
  AppstoreOutlined,
  PieChartOutlined,
  OrderedListOutlined,
  BarChartOutlined,
  UnorderedListOutlined,
  LogoutOutlined,
  IdcardOutlined
} from "@ant-design/icons";
import "../App.css";
import HaitianLogo from "../Images/HaitianLogo.png";
import { useNavigate, useLocation } from "react-router-dom";

export default function SideNavBar({ onLogout, username }) {
  const navigate = useNavigate();
  const location = useLocation();

  const customStyles = `
    .ant-menu {
      background: #0D3884 !important;
      border-inline-end: none !important;
  width: 95%;    
   }

    .ant-menu-item {
  font-size: 15px;
  padding: 12px 16px !important;
  margin: 6px 10px !important;
  border-radius: 8px !important;
  transition: all 0.4s ease-in-out;
  color: #e5e7eb !important;
  overflow: hidden;
  position: relative;
  box-sizing: border-box; 
  font-weight: 400;
  transform: scale(1); /* base scale */
}

.ant-menu-item:hover {
  background-color: rgb(2 92 248 / 60%) !important;
  color: #ffffff !important;
  transform: scale(1.03); /* slight enlarge */

}

.ant-menu-item-selected {
  background-color: rgb(2 92 248 / 60%) !important;
  color: #ffffff !important;
  font-weight: 600;
  box-sizing: border-box;
  transform: none;
  margin: 6px 10px !important;
  border-left:5px solid white
}


    .ant-menu-item-selected::before {
      content: '';
      position: absolute;
      inset: 0;
      background-color: rgba(255, 255, 255, 0.07);
      border-radius: 8px;
      animation: pulseFade 1.8s infinite ease-in-out;
      z-index: 0;
    }

    @keyframes pulseFade {
      0%, 100% { opacity: 0.2; }
      50% { opacity: 0.4; }
    }

    .haitian-logo {
      display: block;
      width: 75%;
    }

    .haitian-title {
      color: #f3f4f6;
      font-size: 16px;
      text-align: center;
      font-weight: 300;
    }

    .sidebar-divider {
      border-top: 2px solid  #6e6e6e;
      width:90%;
      margin: 0 auto;
  
    }

    .logout-container {
      padding: 10px;
      border-top: 2px solid #6e6e6e;
    }

    .logout-button {
      color: #fff;
      font-size: 16px !important;
      padding: 10px 16px;
      border-radius: 8px;
      display: flex;
      align-items: center;
      gap: 10px;
      transition: background-color 0.3s;
    }

    .logout-button:hover {
      background-color: #e11d48;
      color: #fff;
    }
  `;

  return (
    <>
      <style>{customStyles}</style>
      <div
        className="shadow"
        style={{
          width: 270,
          height: "100vh",
          backgroundColor: "#0D3884",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          position: "fixed",
          left: 0,
          top: 0,
        }}
      >
        {/* Top: Logo + Title + Menu */}
        <div>
          <div style={{ width: "100%" }} className="m-auto text-center ">
            <div className="d-flex flex-column align-items-center">
              <img
                src={HaitianLogo}
                alt="Haitian Logo"
                className="haitian-logo mt-2 text-center "
              />
            </div>
          </div>
          <div className="haitian-title mt-2  ">
            Inventory Management System
          </div>

          <div className="m-auto text-center mt-3 ">
            {/* <Avatar
              size={50}
              style={{ backgroundColor: "white", color: "#0d3884" }}
            /> */}
            <div className="profile-box">
              <Avatar size={55} className="profile-avatar">
                {username?.slice(0, 2).toUpperCase() || "N/A"}
              </Avatar>
              <div className="profile-username">{username || "N/A"}</div>
            </div>
          </div>
          <div className="sidebar-divider mt-3" />

          <Menu
            mode="inline"
            theme="dark"
            selectedKeys={[location.pathname]}
            onClick={(item) => {
              if (item.key === "logout") onLogout();
              else navigate(item.key);
            }}
            className="mt-2"
          >
            <Menu.Item key="/dashboard" icon={<PieChartOutlined />}>
              Dashboard
            </Menu.Item>

            <Menu.Item key="/inventory" icon={<AppstoreOutlined />}>
              Inventory
            </Menu.Item>
            <Menu.Item
              key="/productCategories"
              icon={<UnorderedListOutlined />}
            >
              Product Categories
            </Menu.Item>
            <Menu.Item key="/customerDetails" icon={<IdcardOutlined style={{ fontSize: '17px' }} />}>
              Customer Details
            </Menu.Item>
               <Menu.Item key="/deliveryNote" icon={<FileDoneOutlined style={{ fontSize: '17px' }} />}>
              Delivery Note
            </Menu.Item>
            <Menu.Item key="/reports" icon={<BarChartOutlined />}>
              Reports
            </Menu.Item>
            { username === "Admin" ? 
            (<Menu.Item key="/addUser" icon={<UserAddOutlined />}>
              Add New User
            </Menu.Item>):""}
          </Menu>
        </div>

        {/* Bottom: Logout */}
        <div className="logout-container sidebar-divider">
          <Button
            className="logoutButton mb-1"
            onClick={onLogout}
            style={{ cursor: "pointer" }}
            title="Logout"
            size="large"
          >
            <LogoutOutlined />
            Logout
          </Button>
        </div>
      </div>
    </>
  );
}
