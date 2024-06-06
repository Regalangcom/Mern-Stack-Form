import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import "@eli/style/Signup.css"

const SignUp = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [repassword, setRePassword] = useState("");
    const [message, setMessage] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        try {
            const response = await axios.post(`${import.meta.env.VITE_PORT_LOCAL}/registrasi`, { name, email, password, repassword });
            setMessage(response.data.Message);
            navigate("/login");
        } catch (error) {
            setMessage(error.response.data.Message);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="register-container">
      {message && <p className="message">{message}</p>}
      <h2>REGISTER</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="form-group">
          <label htmlFor="name"><strong>Name</strong></label>
          <input
            type="text"
            placeholder=""
            name="name"
            value={name}
            autoComplete="off"
            onChange={(e) => setName(e.target.value)}
            required
            maxLength="20"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="email"><strong>Email</strong></label>
          <input
            type="email"
            placeholder=""
            value={email}
            name="email"
            autoComplete="off"
            onChange={(e) => setEmail(e.target.value)}
            required
            maxLength="40"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="password"><strong>Password</strong></label>
          <input
            type="password"
            placeholder=""
            value={password}
            name="password"
            autoComplete="off"
            onChange={(e) => setPassword(e.target.value)}
            required
            maxLength="20"
            className="input-field"
          />
        </div>
        <div className="form-group">
          <label htmlFor="repassword"><strong>Confirm Password</strong></label>
          <input
            type="password"
            placeholder=""
            value={repassword}
            name="repassword"
            autoComplete="off"
            onChange={(e) => setRePassword(e.target.value)}
            required
            maxLength="20"
            className="input-field"
          />
        </div>
        <button type="submit" disabled={loading} className="submit-button">Register</button>
      </form>
      <p>Already have an account? <Link to="/login">Login</Link></p>
      {loading && <p>Loading...</p>}
    </div>
    );
};

export default SignUp;
