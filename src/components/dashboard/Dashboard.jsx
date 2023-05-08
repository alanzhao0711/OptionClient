import React from "react";
import "./Dashboard.scss";
import Widget from "./Widget";
import StockCard from "./StockCard";
import { v4 as uuidv4 } from "uuid";
import { useEffect, useState } from "react";
import GetDate from "./GetDate";
import { socket } from "../../Auth";
import PLCalendar from "./PLCalendar";

const Dashboard = () => {
  const [balanceCalendar, setBalanceCalendar] = useState([]);
  const [currentBalance, setCurrentBalance] = useState(8500);
  const [numTransactions, setNumTransactions] = useState(0);
  const [numActive, setNumActive] = useState(0);
  const [recentActive, setRecentActive] = useState([]);
  useEffect(() => {
    socket.emit("dash");
    socket.on("dashboard-nums", (data) => {
      setNumTransactions(data.num_transactions);
      setNumActive(data.active);
    });

    socket.on("active-dash", (data) => {
      setRecentActive(data);
    });

    socket.on("current-balance", (data) => {
      setCurrentBalance(data);
    });
    socket.on("calendar", (data) => {
      setBalanceCalendar(data);
    });
    const interval = setInterval(() => {
      socket.emit("dash");
    }, 300000);
    return () => {
      clearInterval(interval);
    };
  }, []);
  console.log(balanceCalendar);
  return (
    <div className="dashboard">
      <div className="container col-md-12">
        <div className="top">
          <h3>Welcome to OptionX</h3>
          {GetDate()}
        </div>
        <Widget
          currentBalance={currentBalance}
          numTransactions={numTransactions}
          numActive={numActive}
        />
        <div className="middle-content container" style={{ padding: "0" }}>
          <div className="row">
            <div className="col-md-8">
              {/* <ChartComponent
                name="Daily Overview"
                display="dashboard"
                data={balanceForChart}
              /> */}
              <PLCalendar data={balanceCalendar} />
            </div>
            <div className="col-md-4">
              {recentActive.map((item) => (
                <StockCard
                  key={uuidv4()}
                  symbol={item.Symbol}
                  profit={(item["Max Profit"] - item.CurrentPrice) * 100}
                  optionPrice={item.CurrentPrice}
                  optionPercentage={(
                    (item["Max Profit"] - item.CurrentPrice) /
                    item.CurrentPrice
                  ).toFixed(2)}
                />
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
