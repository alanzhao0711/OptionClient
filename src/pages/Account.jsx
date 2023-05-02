import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/Sidebar";
import Revenue from "../components/dashboard/Revenue";
import ChartComponent from "../components/dashboard/ChartComponent";
import ActiveOptions from "../components/dashboard/ActiveOptions";
import { useState } from "react";
import getDate from "../components/dashboard/GetDate";
import { socket } from "../Auth";
import { getOptionPrice } from "../components/server-data/GetOptionPrice";

const Account = () => {
  const [amountEarnedToday, setAmountEarnedToday] = useState([]);
  const [accountChartData, setAccountChartData] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(10000);

  useEffect(() => {
    getOptionPrice();
    socket.emit("account");
    socket.on("account-chart", (data) => {
      setAccountChartData(data);
    });
    socket.on("earned-today", (data) => {
      setAmountEarnedToday(data);
      //[data = [int: earnedToday, int: percentChange]]
    });
    socket.emit("dash");
    socket.on("current-balance", (data) => {
      setCurrentBalance(data);
    });
    const interval = setInterval(() => {
      console.log("getOptionPrice Called");
      getOptionPrice();
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
                name="My balance"
                display="account"
                data={accountChartData}
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
