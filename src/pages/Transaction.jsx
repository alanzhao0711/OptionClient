import React from "react";
import Sidebar from "../components/sidebar/Sidebar";
import getDate from "../components/dashboard/GetDate";
import PastTransactions from "../components/trans/PastTransactions";
import "./Transaction.scss";

const Transaction = () => {
  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <div className="trans">
          <div className="container">
            <div className="top">
              <p>Past Transcations</p>
              {getDate()}
            </div>
            <div className="col-md-12" style={{ marginTop: "2rem" }}>
              <PastTransactions />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Transaction;
