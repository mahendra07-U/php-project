import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Checkout.css';

function Checkout() {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState([]);
  const [totalAmount, setTotalAmount] = useState(0);
 
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    address: '',
    city: '',
    pincode: ''
  });
  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfileData'));
    if (!userData) {
      navigate('/login');
      return;
    }
    fetch('http://localhost/stationery-api/get_cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userData.user_id })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setCartItems(data.data);
        const total = data.data.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        setTotalAmount(total);
      } else {
        alert("Your cart is empty!");
        navigate('/shop');
      }
    })
    .catch(error => console.error("Error fetching cart:", error));
  }, [navigate]);
  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePlaceOrder = (e) => {
    e.preventDefault(); 
    
    const userData = JSON.parse(localStorage.getItem('userProfileData'));
    
    if (!userData) {
      alert("Session expired. Please login again.");
      navigate('/login');
      return;
    }

    if(!formData.name || !formData.phone || !formData.address || !formData.city || !formData.pincode) {
        alert("Please fill all the delivery details!");
        return;
    }

    const orderData = {
        user_id: userData.user_id,
        total_amount: totalAmount,
        name: formData.name,
        phone: formData.phone,
        address: formData.address,
        city: formData.city,
        pincode: formData.pincode
    };
    fetch('http://localhost/stationery-api/place_order.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(orderData)
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert(" Congratulations! Your order has been placed successfully.");
        navigate('/shop');
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Network Error: Could not place order.");
    });
  };

  return (
    <div className="checkout-wrapper">
      <h2 className="checkout-title">Checkout</h2>
      
      <div className="checkout-container">
        <div className="checkout-form-section">
          <h3>Delivery Details</h3>
          <form onSubmit={handlePlaceOrder} className="checkout-form">
            <div className="form-group">
              <label>Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} placeholder="Enter your full name" />
            </div>
            
            <div className="form-group">
              <label>Phone Number</label>
              <input type="tel" name="phone" required value={formData.phone} onChange={handleInputChange} placeholder="10-digit mobile number" />
            </div>

            <div className="form-group">
              <label>Full Address</label>
              <textarea name="address" required value={formData.address} onChange={handleInputChange} placeholder="House no, Street, Landmark" rows="3"></textarea>
            </div>

            <div className="form-row">
              <div className="form-group">
                <label>City</label>
                <input type="text" name="city" required value={formData.city} onChange={handleInputChange} placeholder="Your City" />
              </div>
              <div className="form-group">
                <label>Pincode</label>
                <input type="text" name="pincode" required value={formData.pincode} onChange={handleInputChange} placeholder="6-digit Pincode" />
              </div>
            </div>
          </form>
        </div>
        <div className="checkout-summary-section">
          <h3>Order Summary</h3>
          <div className="summary-items">
            {cartItems.map(item => (
              <div key={item.cart_id} className="summary-item">
                <span>{item.product_name} (x{item.quantity})</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          
          <div className="summary-total">
            <h4>Total to Pay:</h4>
            <h4>₹{totalAmount}</h4>
          </div>

          <div className="payment-method">
            <input type="radio" checked readOnly />
            <label>Cash on Delivery (COD)</label>
          </div>

          <button type="submit" className="place-order-btn" onClick={handlePlaceOrder}>
            Place Order
          </button>
        </div>
      </div>
    </div>
  );
}

export default Checkout;