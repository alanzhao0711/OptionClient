import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import "./Home.scss";
import Dashboard from "../components/dashboard/Dashboard";

const Home = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <Dashboard />
      </div>
    </div>
  );
};

export default Home;
