import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Revenue from "../components/dashboard/Revenue";
import ChartComponent from "../components/dashboard/ChartComponent";
import ActiveOptions from "../components/dashboard/ActiveOptions";
import { useState } from "react";
import getDate from "../components/dashboard/GetDate";
import { socket } from "../Auth";

const Account = () => {
  const [amountEarnedToday, setAmountEarnedToday] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(10000);
  const [balanceForChart, setBalanceForChart] = useState([]);

  useEffect(() => {
    socket.emit("account");
    socket.on("earned-today", (data) => {
      setAmountEarnedToday(data);
      //[data = [int: earnedToday, int: percentChange]]
    });
    socket.emit("dash");
    socket.on("current-balance", (data) => {
      setCurrentBalance(data);
    });
    socket.on("daily-info", (data) => {
      setBalanceForChart(data);
    });
    const interval = setInterval(() => {
      socket.emit("dash");
      socket.emit("account");
    }, 300000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="home">
      <Sidebar />
      <div className="home-container">
        <div className="dashboard">
          <div className="container">
            <div className="top">
              <p>My assets</p>
              {getDate()}
            </div>
            <Revenue
              balance={currentBalance}
              earnedToday={amountEarnedToday[0]}
              percent={amountEarnedToday[1]}
            />
            <div className="account-chat">
              <ChartComponent
                name="Daily Overview"
                display="dashboard"
                data={balanceForChart}
              />
            </div>
            <ActiveOptions />
          </div>
        </div>
      </div>
    </div>
  );
};

export default Account;
