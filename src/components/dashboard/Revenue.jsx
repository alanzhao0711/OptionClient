import React from "react";
import "./Revenue.scss";

const Revenue = (props) => {
  const percent = ((props.balance - 8500) / 100).toFixed(2);
  return (
    <div className="revenue">
      <div className="container">
        <div className="row">
          <div className="col-md-8">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">My Balance</h5>
                <div className="d-flex justify-content-between">
                  <div>
                    <h1
                      className="card-text display-6"
                      style={{ fontWeight: "bold", fontSize: "2rem" }}
                    >
                      $
                      {typeof props.balance === "number"
                        ? props.balance.toLocaleString()
                        : props.balance}
                    </h1>
                    <p className="card-text">
                      Data will refresh every 5 minutes
                    </p>
                  </div>
                  <div>
                    <div className="d-flex justify-content-between">
                      <span>All time</span>
                      <span>
                        {props.balance >= 8500 ? (
                          <i className="bi bi-caret-up-fill me-1 text-success"></i>
                        ) : (
                          <i className="bi bi-caret-down-fill me-1 text-danger"></i>
                        )}
                        {props.balance - 8500} ({percent}%)
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="col-md-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">Amount earned today</h5>
                <div className="d-flex justify-content-between align-items-center">
                  <h1 className="card-text display-6">${props.earnedToday}</h1>
                  <div className="text-success">
                    {props.percent >= 0 ? (
                      <i className="bi bi-caret-up-fill me-1 text-success"></i>
                    ) : (
                      <i className="bi bi-caret-down-fill me-1 text-danger"></i>
                    )}
                    <span>{props.percent}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
