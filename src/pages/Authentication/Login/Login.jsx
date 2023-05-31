import React, { useEffect, useState } from 'react';
import './Login.css';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../../Provider/Features/Auth/authSlice';
import { useNavigate } from 'react-router-dom';
const Login = () => {
  const navigate=useNavigate()
  const { user, isError, isSuccess, isLoading, message} = useSelector((state) => state.auth);
  useEffect(() => {
    if (isSuccess && user) {
      navigate("/admin");
    } else {
      navigate("/");
    }
  }, [user, isError, isSuccess, isLoading]);

  const dispatch=useDispatch()
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('email', email);
    formData.append('password', password);
    dispatch(login(formData))
  };

  return (
    <div className="login-container">
      <div className="login-content">
        <h2 className="login-title">Login</h2>
        <form className="login-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">Email</label>
            <input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="btn-login">Login</button>
        </form>
        <div className="options">
          <a href="/" className="forgot-password">Forgot Password?</a>
          <span className="divider">|</span>
          <a href="/" className="register-link">Register</a>
        </div>
      </div>
    </div>
  );
};

export default Login;
