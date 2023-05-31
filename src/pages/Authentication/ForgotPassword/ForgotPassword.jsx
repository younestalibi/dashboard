import React, { useState } from 'react';
import './ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform forgot password logic here
  };

  return (
    <div className="forgot-container">
      <div className="forgot-content">
        <h2 className="forgot-title">Forgot Password</h2>
        <form className="forgot-form" onSubmit={handleSubmit}>
          <div className="forgot-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-forgot">Reset Password</button>
        </form>
        <div className="forgot-options">
          <a href="/" className="login-link">Login</a>
          <span className="forgot-divider">|</span>
          <a href="/" className="register-link">Register</a>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
