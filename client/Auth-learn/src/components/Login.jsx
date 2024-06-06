import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import "@eli/style/Login.css"

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [otp, setOtp] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [emailInvalid, setEmailInvalid] = useState(false);
  const [showOtpForm, setShowOtpForm] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!emailRegex.test(email)) {
      setEmailInvalid(true);
      setMessage('Invalid email format');
      return;
    } else {
      setEmailInvalid(false);
    }

    setLoading(true);

    try {
      const response = await axios.post(`${import.meta.env.VITE_PORT_LOCAL}/login`, {
        email,
        password,
      }, { withCredentials: true });

      if (response.data.Login) {
        setMessage(response.data.Message);
        setShowOtpForm(true);
      } else {
        setMessage(response.data.Message);
      }
    } catch (error) {
      setMessage(error.response.data.Message);
    }

    setLoading(false);
  };

  const handleOtpVerify = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(`${import.meta.env.VITE_PORT_LOCAL}/verify-otp`, {
        otp,
      }, { withCredentials: true }); 

      if (response.data.Login) {
        navigate("/dashboard");
      } else {
        alert('Invalid OTP');
      }
    } catch (error) {
      console.error('Error during OTP verification:', error.message);
      alert('An error occurred during OTP verification');
    }
  };

  return (
    <div className="login-container">
    <h2>LOGIN</h2>
    {!showOtpForm ? (
      <form onSubmit={handleLogin} className="login-form">
        <div className="form-group">
          <label htmlFor="email">
            <strong>Email</strong>
          </label>
          <input
            type="email"
            placeholder="Email"
            name="email"
            maxLength="40"
            onChange={(e) => setEmail(e.target.value)}
            className="input-field"
          />
        </div>

        <div className="form-group">
          <label htmlFor="password">
            <strong>Password</strong>
          </label>
          <input
            type="password"
            placeholder="Password"
            name="password"
            maxLength="25"
            onChange={(e) => setPassword(e.target.value)}
            className="input-field"
          />
        </div>
        <button type="submit" className="submit-button">Login</button>
      </form>
    ) : (
      <form onSubmit={handleOtpVerify} className="login-form">
        <input
          type="text"
          placeholder="OTP"
          onChange={(e) => setOtp(e.target.value)}
          className="input-field"
        />
        <button className="submit-button" type="submit">Verify OTP</button>
      </form>
    )}
    {loading && <p>Loading...</p>}
    {message && <p style={{ color: 'red' }}>{message}</p>}
    {emailInvalid && <p style={{ color: 'blue' }}>Invalid email format</p>}
    <p>
      Don't have an account? <Link to="/">Register</Link>
    </p>
    <p>
      Forgot your password? <Link to="/resetPassword">Reset Password</Link>
    </p>
  </div>
  );
};

export default Login;
