import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css'; 

function AdminOrders() {
  const navigate = useNavigate();
  const [allOrders, setAllOrders] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfileData'));

    if (!userData || userData.role !== 'Admin') {
      alert("Access Denied! You are not an Admin.");
      navigate('/login'); 
      return;
    }

    fetch('http://localhost/stationery-api/get_all_orders_admin.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setAllOrders(data.data);
        }
        setLoading(false);
      })
      .catch(err => {
        console.error("Fetch Error:", err);
        setLoading(false);
      });
  }, [navigate]);

  const handleUpdateStatus = (orderId, newStatus) => {
    if (!window.confirm(`Are you sure you want to mark Order #${orderId} as ${newStatus}?`)) return;

    fetch('http://localhost/stationery-api/update_order_status.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ order_id: orderId, new_status: newStatus })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert("✅ " + data.message);
        setAllOrders(prevOrders => 
          prevOrders.map(order => 
            order.order_id === orderId ? { ...order, order_status: newStatus } : order
          )
        );
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(err => console.error("Update error:", err));
  };

  return (
    <div className="admin-orders-container">
      <h2 className="admin-title">Admin Dashboard: Manage Orders</h2>
      
      {loading ? (
        <h3 style={{ textAlign: 'center' }}>Loading all orders...</h3>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>Order ID</th>
                <th>Customer Name</th>
                <th>City</th>
                <th>Total Amount</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {allOrders.length > 0 ? (
                allOrders.map(order => (
                  <tr key={order.order_id}>
                    <td>#{order.order_id}</td>
                    <td>{order.customer_name}</td>
                    <td>{order.city}</td>
                    <td>₹{order.total_amount}</td>
                    
                    <td className={`status-${order.order_status.toLowerCase()}`}>
                      {order.order_status}
                    </td>
                    
                    <td>
                      <button 
                        className="action-btn btn-approve"
                        onClick={() => handleUpdateStatus(order.order_id, 'Approved')}
                        disabled={order.order_status !== 'Pending'}
                      >
                        Approve
                      </button>
                      
                      <button 
                        className="action-btn btn-cancel"
                        onClick={() => handleUpdateStatus(order.order_id, 'Cancelled')}
                        disabled={order.order_status !== 'Pending'}
                      >
                        Cancel
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '20px' }}>No orders found in database.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default AdminOrders;