// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import SideNavBar from './Components/SideNavBar';
// import Inventory from './Components/Inventory';
// import ProductCategories from './Components/ProdcutCategories';
// import  Login from "./Components/Login";

// function App() {
//   return (
//     // <Router>
//     //   <div style={{ display: "flex" }}>
//     //     <SideNavBar />
//     //     <div style={{ marginLeft: 260, width: "100%", padding: '20px' }}>
//     //       <Routes>
//     //         <Route path="/" element={<Inventory />} />
//     //         <Route path="/inventory" element={<Inventory />} />
//     //         <Route path="/productCategories" element={<ProductCategories />} />

//     //       </Routes>
//     //     </div>
//     //   </div>
//     // </Router>
//     <>
//     <Login />
//     </>
//   );
// }

// export default App;

// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
// import { useState } from 'react';
// import SideNavBar from './Components/SideNavBar';
// import Inventory from './Components/Inventory';
// import ProductCategories from './Components/ProdcutCategories';
// import Login from "./Components/Login";

// function App() {
//   const [isLoggedIn, setIsLoggedIn] = useState(false);

//   const handleLoginSuccess = () => setIsLoggedIn(true);
//   const handleLogout = () => setIsLoggedIn(false);

//   return (
//     <Router >
//       {!isLoggedIn ? (
//         <Login onLoginSuccess={handleLoginSuccess} />
//       ) : (
//         <div style={{ display: "flex" }} >
//           <SideNavBar onLogout={handleLogout} />
//           <div style={{ marginLeft: 260, width: "100%", padding: '20px'}}>
//             <Routes>
//               <Route path="/" element={<Inventory />} />
//               <Route path="/inventory" element={<Inventory />} />
//               <Route path="/productCategories" element={<ProductCategories />} />
//             </Routes>
//           </div>
//         </div>
//       )}
//     </Router>
//   );
// }

// export default App;

import "./App.css";
import "bootstrap/dist/css/bootstrap.min.css";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";
import { useState } from "react";
import SideNavBar from "./Pages/SideNavBar";
import Inventory from "./Pages/Inventory";
import ProductCategories from "./Pages/ProdcutCategories";
import Login from "./Pages/Login";
import { notification } from "antd";
import AddUser from "./Pages/AddUser";
notification.config({
  maxCount: 2,
  placement: "bottomRight",
  duration: 3,
});
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);
  const [username, setUsername] = useState("");
  const handleLoginSuccess = (usernameFromLogin) => {
    setIsLoggedIn(true);
    setUsername(usernameFromLogin);
  };

  const handleLogout = () => {
    setIsFadingOut(true); 
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsFadingOut(false); 
      notification.success({
        message: "Succes",
        description: `${username} loged out successfully`,
      });
    }, 500); 
  };

  return (
    <Router>
      <div
        className={`fade-container ${isFadingOut ? "fade-out" : ""}`}
        style={{ display: "flex" }}
      >
        {/* {isLoggedIn && <SideNavBar onLogout={handleLogout} />} */}
        {isLoggedIn && (
          <SideNavBar onLogout={handleLogout} username={username} />
        )}

        <div
          style={{
            marginLeft: isLoggedIn ? 260 : 0,
            flex: 1,
            overflowX: "hidden",
          }}
        >
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? (
                  <Navigate to="/inventory" />
                ) : (
                  <Login onLoginSuccess={handleLoginSuccess} />
                )
              }
            />
            <Route
              path="/inventory"
              element={isLoggedIn ? <Inventory /> : <Navigate to="/" />}
            />
            <Route
              path="/productCategories"
              element={isLoggedIn ? <ProductCategories /> : <Navigate to="/" />}
            />
            <Route
              path="/orders"
              element={
                isLoggedIn ? <Navigate to="/orders" /> : <Navigate to="/" />
              }
            />
                <Route
              path="/addUser"
              element={
                isLoggedIn ? <AddUser /> : <Navigate to="/" />
              }
            />
            <Route
              path="*"
              element={<Navigate to={isLoggedIn ? "/inventory" : "/"} />}
            />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;
