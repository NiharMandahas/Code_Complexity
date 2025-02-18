


import React from 'react';
import './Home.css';
import { useNavigate } from "react-router-dom";

function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="home-page">
      <div className="main-body">
        <h1 className="fade-in-text">Code Complexity</h1>
      </div>
      <button className="redirect fade-in-button" onClick={() => navigate("/run")}>Explore</button>
    </div>
  );
}

export default HomePage;
