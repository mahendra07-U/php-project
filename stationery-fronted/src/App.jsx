import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { useEffect } from 'react';
import Sidebar from './components/Sidebar.jsx';
import Shop from './pages/Shop.jsx';
import Cart from './pages/Cart.jsx';
import Users from './pages/UserProfile.jsx';
import Categories from './pages/Categories.jsx';
import Login from './pages/Login.jsx';
import Home from './pages/Home.jsx';
import Checkout from './pages/Checkout.jsx';
import './App.css';
import AdminOrders from './pages/AdminOrders.jsx';
import ManageUsers from './pages/manageUsers.jsx';
function App() {
  useEffect(() => {
    fetch('http://localhost/stationery-api/db.php')
    .then(Response =>Response.json())
    .then(data =>{
      console.log("PHP message from backend: ", data);
    })
    .catch(error => {
      console.error("Backend connection error: ", error);
    });
  },[]);
  return (
    <Router>
      <div className="app-container">
        <Sidebar />
        <div className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/user" element={<Users />} />
            <Route path="/categories" element={<Categories />} />
            <Route path="/shop" element={<Shop />} />
            <Route path="/cart" element={<Cart />} />
            <Route path="/login" element={<Login />} />
            <Route path="/checkout" element={<Checkout />} />
            <Route path="/admin-orders" element={<AdminOrders />} />
            <Route path="/manage-users" element={<ManageUsers />} />
          </Routes>
        </div>
      </div>
    </Router>
  );
}

export default App;