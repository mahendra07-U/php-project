import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './AdminOrders.css'; 

function ManageUsers() {
  const navigate = useNavigate();
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem('userProfileData'));
    if (!userData || userData.role !== 'Admin') {
      alert("Access Denied!");
      navigate('/login');
      return;
    }

    fetch('http://localhost/stationery-api/get_all_users.php')
      .then(res => res.json())
      .then(data => {
        if (data.status === 'success') {
          setUsers(data.data);
        }
        setLoading(false);
      })
      .catch(err => console.error(err));
  }, [navigate]);

  const handleDeleteUser = (userId, userName) => {
    if (!window.confirm(`Are you sure you want to delete ${userName}? This action cannot be undone.`)) return;

    fetch('http://localhost/stationery-api/delete_user.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ user_id: userId })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert(data.message);
        setUsers(users.filter(u => u.user_id !== userId));
      } else {
        alert("Error: " + data.message);
      }
    })
    .catch(err => console.error(err));
  };

  return (
    <div className="admin-orders-container">
      <h2 className="admin-title"> Admin Dashboard: Manage Users</h2>
      
      {loading ? (
        <h3 style={{ textAlign: 'center' }}>Loading users...</h3>
      ) : (
        <div className="admin-table-wrapper">
          <table className="admin-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Full Name</th>
                <th>Username</th>
                <th>Email</th>
                <th>Role</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {users.length > 0 ? (
                users.map(user => (
                  <tr key={user.user_id}>
                    <td>#{user.user_id}</td>
                    <td>{user.full_name}</td>
                    <td>{user.username}</td>
                    <td>{user.email}</td>
                    <td style={{ color: '#2980b9', fontWeight: 'bold' }}>{user.role}</td>
                    <td>
                      <button 
                        className="action-btn btn-cancel" 
                        onClick={() => handleDeleteUser(user.user_id, user.full_name)}
                      >
                         Delete User
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="6" style={{ padding: '20px' }}>No regular users found.</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}

export default ManageUsers;