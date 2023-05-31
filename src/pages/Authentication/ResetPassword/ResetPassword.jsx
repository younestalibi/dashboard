import React, { useState } from 'react';
import './ResetPassword.css';

const ResetPassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Perform reset password logic here
  };

  return (
    <div className="reset-container">
      <div className="reset-content">
        <h2 className="reset-title">Reset Password</h2>
        <form className="reset-form" onSubmit={handleSubmit}>
          <div className="reset-group">
            <label htmlFor="oldPassword">Old Password</label>
            <input
              type="password"
              id="oldPassword"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
            />
          </div>
          <div className="reset-group">
            <label htmlFor="newPassword">New Password</label>
            <input
              type="password"
              id="newPassword"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-reset">Reset Password</button>
        </form>
      </div>
    </div>
  );
};

export default ResetPassword;
