import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Cart.css'; 

function Cart() {
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfileData'));
    
    if (!userData) {
      alert("Please login to view your cart!");
      navigate('/login');
      return;
    }

    fetch('http://localhost/stationery-api/get_cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userData.user_id })
    })
    .then(response => response.json())
    .then(data => {
      if (data.status === 'success') {
        setCartItems(data.data);
      }
      setLoading(false);
    })
    .catch(error => console.error("Error:", error));
  }, [navigate]);

  const handleUpdateQuantity = (cartId, currentQty, type) => {
    const qty = Number(currentQty); 
    let newQty = type === 'increase' ? qty + 1 : qty - 1;
    
    if (newQty < 1) {
      alert("Quantity 1 से कम नहीं हो सकती! हटाने के लिए Remove दबाएँ।");
      return; 
    }

    fetch('http://localhost/stationery-api/update_cart_quantity.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_id: cartId, quantity: newQty })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setCartItems(cartItems.map(item => 
          item.cart_id === cartId ? { ...item, quantity: newQty } : item
        ));
      } else {
        alert("Server Error: Quantity अपडेट नहीं हो पाई!");
      }
    })
    .catch(error => {
      console.error("Error:", error);
      alert("Network Error: कृपया चेक करें कि update_cart_quantity.php फाइल सही जगह पर है या नहीं!");
    });
  };

  const handleRemoveItem = (cartId) => {
    if(!window.confirm("Are you sure you want to remove this item?")) return;

    fetch('http://localhost/stationery-api/remove_from_cart.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ cart_id: cartId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        setCartItems(cartItems.filter(item => item.cart_id !== cartId));
      }
    });
  };
  const calculateTotal = () => {
    return cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  };

  if (loading) return <h3 style={{ textAlign: 'center', marginTop: '50px' }}>Loading Cart...</h3>;

  return (
    <div className="cart-wrapper">
      <h2 className="cart-title">Your Shopping Cart</h2>

      {cartItems.length > 0 ? (
        <div className="cart-content">
          <div className="cart-items-list">
            {cartItems.map(item => (
              <div key={item.cart_id} className="cart-item">
                <img src={`http://localhost/stationery-api/${item.product_image_url}`} alt={item.product_name} />
                
                <div className="item-details">
                  <h3>{item.product_name}</h3>
                  <p>Price: ₹{item.price}</p>
                </div>
                <div className="item-quantity">
                  <div className="qty-controls">
                    <button onClick={() => handleUpdateQuantity(item.cart_id, parseInt(item.quantity), 'decrease')}>-</button>
                    <span>{item.quantity}</span>
                    <button onClick={() => handleUpdateQuantity(item.cart_id, parseInt(item.quantity), 'increase')}>+</button>
                  </div>

                  <button onClick={() => handleRemoveItem(item.cart_id)} className="remove-btn">
                     Remove
                  </button>
                </div>
                
                <div className="item-total">
                  <h4>₹{item.price * item.quantity}</h4>
                </div>
                
              </div>
            ))}
          </div>

          <div className="cart-summary">
            <h3>Order Summary</h3>
            <div className="summary-row">
              <span>Total Items:</span>
              <span>{cartItems.length}</span>
            </div>
            <div className="summary-row total-row">
              <span>Total Amount:</span>
              <span>₹{calculateTotal()}</span>
            </div>
            <button className="checkout-btn" onClick={() => navigate('/checkout')}>Proceed to Checkout</button>
          </div>
        </div>
      ) : (
        <div className="empty-cart">
          <h3>Your cart is completely empty! </h3>
          <button onClick={() => navigate('/shop')} className="shop-now-btn">Start Shopping</button>
        </div>
      )}
    </div>
  );
}

export default Cart;