// import './App.css';
// import 'bootstrap/dist/css/bootstrap.min.css';
// import InventoryModule from './Components/InventoryModule';
// import SideNavBar  from './Components/SideNavBar';



// function App() {
//   return (
//           <div style={{ display: "flex" }}>
//       <SideNavBar />
//       <div style={{ marginLeft: 260,  width: "100%" }}>
//         <InventoryModule />
//       </div>
//     </div>
//       );
// }

// export default App;


import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import SideNavBar from './Components/SideNavBar';
import Inventory from './Components/Inventory';
import ProductCategories from './Components/ProdcutCategories';


function App() {
  return (
    <Router>
      <div style={{ display: "flex" }}>
        <SideNavBar />
        <div style={{ marginLeft: 260, width: "100%", padding: '20px' }}>
          <Routes>
            <Route path="/" element={<Inventory />} />
            <Route path="/inventory" element={<Inventory />} />
            <Route path="/productCategories" element={<ProductCategories />} />

        
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;

