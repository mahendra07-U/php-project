import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './UserProfile.css';

function UserProfile() {
  const navigate = useNavigate();
  
  const [user, setUser] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [editData, setEditData] = useState({});
  const [selectedImage, setSelectedImage] = useState(null); 
  const [message, setMessage] = useState('');
  const [showPasswordModal, setShowPasswordModal] = useState(false);

  const [passData, setPassData] = useState({ oldPass: '', newPass: '', confirmPass: '' });

  const handlePassChange = (e) => {
    setPassData({ ...passData, [e.target.name]: e.target.value });
  };

  const submitPasswordChange = (e) => {
    e.preventDefault();
    
    if (passData.newPass !== passData.confirmPass) {
      alert("New Password and Confirm Password do not match!");
      return;
    }

    const userData = JSON.parse(localStorage.getItem('userProfileData'));

    fetch('http://localhost/stationery-api/change_password.php', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        user_id: userData.user_id,
        old_password: passData.oldPass,
        new_password: passData.newPass
      })
    })
    .then(res => res.json())
    .then(data => {
      if (data.status === 'success') {
        alert( data.message);
        setShowPasswordModal(false); 
        setPassData({ oldPass: '', newPass: '', confirmPass: '' });
      } else {
        alert("Error: " + data.message); 
      }
    })
    .catch(err => console.error("Error:", err));
  };
  useEffect(() => {
    const storedUserData = localStorage.getItem('userProfileData');
    if (storedUserData) {
      const parsedData = JSON.parse(storedUserData);
      setUser(parsedData);
      setEditData(parsedData);
    } else {
      navigate('/login');
    }
  }, [navigate]);

  const handleInputChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    if (e.target.files && e.target.files[0]) {
      setSelectedImage(e.target.files[0]);
    }
  };
  const handleUpdate = async () => {
    setMessage('Saving...');
    
    try {
      if (selectedImage) {
        const formData = new FormData();
        formData.append('image', selectedImage);
        formData.append('user_id', user.user_id);
        const imageResponse = await fetch('http://localhost/stationery-api/upload_image.php', {
          method: 'POST',
          body: formData 
        });

        const imageData = await imageResponse.json();
        
        if (imageData.status !== 'success') {
          setMessage(imageData.message); 
          return; 
        }
      }

      const response = await fetch('http://localhost/stationery-api/update_profile.php', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          user_id: user.user_id,
          full_name: editData.full_name,
          roll_no_emp_id: editData.roll_no_emp_id,
          phone_number: editData.phone_number
        })
      });

      const data = await response.json();
      
      if (data.status === 'success') {
        setMessage('Profile updated successfully!');
        setUser(data.user); 
        localStorage.setItem('userProfileData', JSON.stringify(data.user)); 
        setIsEditing(false); 
        setSelectedImage(null); 
      } else {
        setMessage(data.message);
      }
    } catch (error) {
      console.log("error: ", error);
      setMessage('Error updating profile!');
    }
    
    setTimeout(() => setMessage(''), 3000);
  };

  if (!user) return <div style={{ textAlign: 'center', marginTop: '50px' }}>Loading Profile...</div>;

  return (
    <div className="profile-page-container">
      <div className="page-header">
        <h2> My Profile</h2>
      </div>

      {message && <div className={`message-alert ${message.includes('success') ? 'success' : 'error'}`}>{message}</div>}

      <div className="profile-card">
        <div className="profile-sidebar">
          <div className="profile-pic-box" style={{ overflow: 'hidden' }}>
            {user.profile_img ? (
              <img 
                src={`http://localhost/stationery-api/${user.profile_img}`} 
                alt="Profile" 
                style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
              />
            ) : (
              <span className="pic-placeholder">👨</span>
            )}
          </div>
        
          {isEditing && (
            <div style={{ marginBottom: '15px', width: '100%', textAlign: 'center' }}>
              <input 
                type="file" 
                accept="image/*" 
                onChange={handleImageChange} 
                style={{ fontSize: '12px', color: 'white', maxWidth: '180px' }} 
              />
            </div>
          )}

          <h3>{user.full_name}</h3> 
          <span className={`role-badge ${user.role.toLowerCase()}`}>{user.role}</span>
          
          {!isEditing ? (
            <button className="edit-btn action-btn" onClick={() => setIsEditing(true)}> Edit Profile</button>
          ) : (
            <div className="edit-actions" style={{ width: '100%' }}>
              <button className="save-btn action-btn" onClick={handleUpdate}> Save</button>
              <button 
                className="cancel-btn action-btn" 
                onClick={() => {
                  setIsEditing(false);
                  setSelectedImage(null); 
                  setEditData(user); 
                }}
              >
                 Cancel
              </button>
            </div>
          )}

          <button 
            className="logout-btn action-btn" style={{marginTop: '10px'}}
            onClick={() => { localStorage.removeItem('userProfileData'); navigate('/login'); }}
          >
             Logout
          </button>
        </div>
        <div className="profile-details">
          <h3 className="details-title">Personal Information</h3>
          
          <div className="info-grid">
            <div className="info-box">
              <label>Full Name</label>
              {isEditing ? (
                <input type="text" name="full_name" value={editData.full_name} onChange={handleInputChange} className="edit-input"/>
              ) : (
                <p className="info-text">{user.full_name}</p>
              )}
            </div>
            
            <div className="info-box">
              <label>Roll No / Emp ID</label>
              {isEditing ? (
                <input type="text" name="roll_no_emp_id" value={editData.roll_no_emp_id || ''} onChange={handleInputChange} className="edit-input"/>
              ) : (
                <p className="info-text">{user.roll_no_emp_id || 'N/A'}</p> 
              )}
            </div>
            
            <div className="info-box">
              <label>Email Address <span className="no-edit">(Cannot be changed)</span></label>
              <p className="info-text text-muted">{user.email}</p>
            </div>
            
            <div className="info-box">
              <label>Phone Number</label>
              {isEditing ? (
                <input type="text" name="phone_number" value={editData.phone_number || ''} onChange={handleInputChange} className="edit-input"/>
              ) : (
                <p className="info-text">{user.phone_number || 'N/A'}</p>
              )}
            </div>
            
            <div className="info-box">
              <label>Account Status</label>
              <p className={`info-text ${user.account_status === 'Active' ? 'status-active' : ''}`}>{user.account_status}</p>
            </div>
            
            <div className="info-box">
              <label>Joined Date</label>
              <p className="info-text">{user.joined_date}</p>
            </div>
          </div>
          
          <div className="profile-actions">
            <button className="change-pass-btn action-btn" onClick={() => setShowPasswordModal(true)}> Change Password</button>
          </div>
        </div>
      {showPasswordModal && (
        <div className="password-modal-overlay">
          <div className="password-modal">
            <h3>Change Password</h3>
            <form onSubmit={submitPasswordChange}>
              
              <div className="form-group">
                <label>Old Password</label>
                <input type="password" name="oldPass" required value={passData.oldPass} onChange={handlePassChange} placeholder="Enter old password" />
              </div>
              
              <div className="form-group">
                <label>New Password</label>
                <input type="password" name="newPass" required value={passData.newPass} onChange={handlePassChange} placeholder="Enter new password" />
              </div>
              
              <div className="form-group">
                <label>Confirm New Password</label>
                <input type="password" name="confirmPass" required value={passData.confirmPass} onChange={handlePassChange} placeholder="Confirm new password" />
              </div>
              
              <div className="modal-actions">
                <button type="button" className="cancel-btn" onClick={() => setShowPasswordModal(false)}>Cancel</button>
                <button type="submit" className="save-btn">Update</button>
              </div>

            </form>
          </div>
        </div>
      )}
      </div>
    </div>
  );
}

export default UserProfile;