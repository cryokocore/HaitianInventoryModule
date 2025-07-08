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

import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { useState } from 'react';
import SideNavBar from './Components/SideNavBar';
import Inventory from './Components/Inventory';
import ProductCategories from './Components/ProdcutCategories';
import Login from "./Components/Login";
import { notification} from "antd";
function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isFadingOut, setIsFadingOut] = useState(false);

  const handleLoginSuccess = () => setIsLoggedIn(true);

  const handleLogout = () => {
    setIsFadingOut(true); // trigger fade
    setTimeout(() => {
      setIsLoggedIn(false);
      setIsFadingOut(false); // reset fade
      notification.success({
        message: "Succes",
        description: "Loged out Successfully",
      });         
    }, 500); // match your CSS transition duration
  };

  return (
    <Router>
      <div className={`fade-container ${isFadingOut ? 'fade-out' : ''}`} style={{ display: "flex" }}>
        {isLoggedIn && <SideNavBar onLogout={handleLogout} />}
        <div style={{ marginLeft: isLoggedIn ? 260 : 0, width: "100%" }}>
          <Routes>
            <Route
              path="/"
              element={
                isLoggedIn ? <Navigate to="/inventory" /> : <Login onLoginSuccess={handleLoginSuccess} />
              }
            />
            <Route
              path="/inventory"
              element={
                isLoggedIn ? <Inventory /> : <Navigate to="/" />
              }
            />
            <Route
              path="/productCategories"
              element={
                isLoggedIn ? <ProductCategories /> : <Navigate to="/" />
              }
            />
             <Route
              path="/orders"
              element={
                isLoggedIn ? <Navigate to="/orders" /> : <Navigate to="/" />
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
