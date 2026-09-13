import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

function Login() {
  const [isLoginMode, setIsLoginMode] = useState(true);

  const [fullName, setFullName] = useState('');
  const [identifier, setIdentifier] = useState(''); 
  const [email, setEmail] = useState('');      
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('Processing...');

    if (isLoginMode) {
     
      try {
        const response = await fetch('http://localhost/stationery-api/login.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ identifier, password }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setMessage(data.message);
          localStorage.setItem('userProfileData', JSON.stringify(data.user));
          setTimeout(() => {
            if (data.user.role === 'Admin') {
              navigate('/admin-orders'); 
            } else {
              navigate('/user'); 
            }
          }, 1000);

        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('can not connect to server right now');
      }

    } else {
    
      try {
        const response = await fetch('http://localhost/stationery-api/register.php', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ 
            full_name: fullName, 
            email: email, 
            username: username, 
            password: password 
          }),
        });

        const data = await response.json();

        if (data.status === 'success') {
          setMessage(data.message);
          setTimeout(() => {
            setIsLoginMode(true);
            setMessage('');
          
            setFullName('');
            setEmail('');
            setUsername('');
            setPassword('');
          }, 2000);
        } else {
          setMessage(data.message);
        }
      } catch (error) {
        setMessage('error in server connecting');
      }
    }
  };

  return (
    <div className="login-container">
      <div className='login-card'>
        <h2>{isLoginMode ? 'Welcome Back!' : 'Create an Account'}</h2>

        {message && (
          <p style={{ textAlign: 'center', color: message.toLowerCase().includes('success') ? 'blue' : 'green', fontWeight: 'bold' }}>
            {message}
          </p>
        )}

        <form onSubmit={handleSubmit}>
          
          {!isLoginMode && (
            <>
              <div className="form-group">
                <label>Full Name</label>
                <input 
                  type="text" placeholder="Enter your full name" 
                  value={fullName} onChange={(e) => setFullName(e.target.value)} required 
                />
              </div>
              <div className="form-group">
                <label>Email Address</label>
                <input 
                  type="email" placeholder="Enter your email" 
                  value={email} onChange={(e) => setEmail(e.target.value)} required 
                />
              </div>
              <div className="form-group">
                <label>Username</label>
                <input 
                  type="text" placeholder="Choose a username" 
                  value={username} onChange={(e) => setUsername(e.target.value)} required 
                />
              </div>
            </>
          )}
          {isLoginMode && (
            <div className="form-group">
              <label>Username or Email</label>
              <input 
                type="text" placeholder="Enter email or username" 
                value={identifier} onChange={(e) => setIdentifier(e.target.value)} required 
              />
            </div>
          )}
          <div className="form-group">
            <label>Password</label>
            <input 
              type="password" placeholder="Enter your password" 
              value={password} onChange={(e) => setPassword(e.target.value)} required 
            />
          </div>

          <button type="submit" className="submit-btn">
            {isLoginMode ? 'Login' : 'Sign Up'}
          </button>
        </form>

        <p className="toggle-text">
          {isLoginMode ? "Don't have an account? " : "Already have an account? "}
          <span 
            className="toggle-link" style={{ cursor: 'pointer', color: 'blue' }}
            onClick={() => {
              setIsLoginMode(!isLoginMode);
              setMessage('');
            }}
          >
            {isLoginMode ? 'Create New Account' : 'Login here'}
          </span>
        </p>
      </div>
    </div>
  );
}

export default Login;