import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../AuthContext';

const Login = () => {
  const { setToken } = useAuth();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      if (!username || !password) {
        setError('Username and password are required.');
        return;
      }

      const response = await fetch('https://dummyjson.com/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          username,
          password,
        }),
      });
      console.log('Username:', username);
      console.log('Password:', password);
      const data = await response.json();
    console.log('Response Data:', data);

      if (response.ok) {
        const { token } = data;
      console.log('Received Token:', token);
      setToken(token);
      localStorage.setItem('token', token);
        const redirectPath = localStorage.getItem('redirectPath');
  
        localStorage.removeItem('redirectPath');
  
        navigate(redirectPath || '/');
  
        setError('');
      } else {
        console.error('Login failed. Response status:', response.status);
        setError('Invalid username or password.');
      }
    } catch (error) {
      console.error('Login failed:', error);
      setError('An error occurred during login. Please try again later.');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-4 col-sm-8">
          <div className="card " >
            <div className="card-body">
              <h2 className="text-center mb-4">Login</h2>
              {error && <div className="alert alert-danger">{error}</div>}
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  placeholder="Enter your username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="password"
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <button
              style={{width:"100%"}}
                type="button"
                className="btn btn-primary btn-block mt-3"
                onClick={handleLogin}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
