import React, { useState } from 'react';
import './login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle login logic here
    console.log('Login attempt:', formData);
  };

  return (
    <div className="login-page">
      <div className="bubbles-container">
        {/* Generate multiple bubble elements */}
        {[...Array(15)].map((_, index) => (
          <div key={index} className="bubble"></div>
        ))}
      </div>
      
      <div className="login-box">
        <h1>Welcome Back</h1>
        
        <form onSubmit={handleSubmit}>
          <div className="input-group">
            <label htmlFor="username">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="Enter your username"
              required
            />
          </div>
          
          <div className="input-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="Enter your password"
              required
            />
          </div>
          
          <div className="options-row">
            <div className="remember-me">
              <input type="checkbox" id="remember" />
              <label htmlFor="remember">Remember me</label>
            </div>
            <a href="#forgot" className="forgot-link">Forgot Password?</a>
          </div>
          
          <button type="submit" className="login-button">Log In</button>
        </form>
        
        <div className="signup-prompt">
          Don't have an account? <a href="signup.jsx">Sign up</a>
        </div>
      </div>
    </div>
  );
};

export default Login;