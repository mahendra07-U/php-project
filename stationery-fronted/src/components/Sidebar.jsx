import { NavLink, useLocation } from 'react-router-dom';
import './Sidebar.css';
import lg from './Logo.png';
function Sidebar() {
  const location = useLocation();
  const userData =JSON.parse(localStorage.getItem('userProfileData'));
  const isAdmin = userData && userData.role === 'Admin';
  return (
    <div className="sidebar">
      <div className='logo'><NavLink to="/"><img src={lg} /></NavLink></div>
      <ul className="nav-links">
        <li><NavLink to="/login">Login</NavLink></li>
        <li><NavLink to="/">Home</NavLink></li>
        <li><NavLink to="/categories">Categories</NavLink></li>
        <li><NavLink to="/Shop">Shop</NavLink></li>
        <li><NavLink to="/cart"> Cart</NavLink></li>
        {location.pathname === 'checkout' && (
          <li><NavLink to="/checkout"> Checkout</NavLink></li>
        )}
        <li><NavLink to="/user">User Profile</NavLink></li>
        {isAdmin && (
          <>
          <li><NavLink to="/manage-users" style={{ color: '#3498db', fontWeight: 'bold'}}>Manage Users </NavLink></li>
          <li><NavLink to="/admin-orders" style = {{color: 'gold', fontWeight: 'bold'}}>Admin Panel</NavLink></li>
          </>
        )}
      </ul>
    </div>
  );
}

export default Sidebar;