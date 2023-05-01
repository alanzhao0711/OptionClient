import React from "react";
import "./Contract.scss";
import Sidebar from "../components/sidebar/Sidebar";
import getDate from "../components/dashboard/GetDate";
import AllOptions from "../components/account/AllOptions";

const Contract = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <div className="contract">
          <div className="container">
            <div className="top">
              <p>Options Screener</p>
              {getDate()}
            </div>

            <div
              className="col-md-12"
              style={{
                marginTop: "2rem",
              }}
            >
              <AllOptions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Contract;
