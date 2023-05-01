import React from "react";
import "./StockCard.scss";

const StockCard = ({ symbol, profit, optionPrice, optionPercentage }) => {
  return (
    <div className="card stock-card">
      <div className="card-body d-flex justify-content-between">
        <div className="d-flex flex-column justify-content-center">
          <h5 className="card-title" style={{}}>
            {symbol}
          </h5>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-center">
          <h6
            className={`card-subtitle text-center ${
              profit >= 0 ? "text-success" : "text-danger"
            }`}
          >{`$${profit.toLocaleString()}`}</h6>
        </div>
        <div className="d-flex flex-column justify-content-center align-items-end">
          <div>{`$${optionPrice}`}</div>
          <div
            className={`card-text ${
              optionPercentage >= 0 ? "text-success" : "text-danger"
            }`}
          >{`${optionPercentage}%`}</div>
        </div>

        <i
          className="bi bi-arrow-left-right"
          style={{ marginTop: "0.5rem", fontSize: "1.3rem" }}
        ></i>
      </div>
    </div>
  );
};

export default StockCard;
