import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Dashboard = () => {
  const [name, setName] = useState('PEOPLE');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:4000/api/v1/users/dashboard", { withCredentials: true });
        setName(response.data.user);
      } catch (error) {
        console.log(error);
        navigate("/login");
      }
    };

    fetchData();
  }, [navigate]);

  const logout = async () => {
    try {
      await axios.delete("http://localhost:4000/api/v1/users/logout", { withCredentials: true });
      alert("Logout successful");
      navigate("/login");
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div>
      <div>
        <h2>Welcome to Dashboard, {name}!</h2>
        <button onClick={logout}>Logout</button>
      </div>
    </div>
  );
};

export default Dashboard;
