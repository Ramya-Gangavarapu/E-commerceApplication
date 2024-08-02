import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/Home.css'; 


const Home = () => {
  return (
    <div className="home">
      <h1>Welcome to Our Store</h1>
      <Link to="/register">Register</Link>
      <Link to="/login">Login</Link>
    </div>
  );
};

export default Home;