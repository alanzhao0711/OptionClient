import React from "react";
import "./Widget.scss";
import { Link } from "react-router-dom";
// import socket from "../../Auth";

const Widget = (props) => {
  return (
    <div className="row widget">
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-piggy-bank fs-4 me-3"></i>
              <h5 className="card-title mb-0 fs-5">Balances</h5>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h1 className="card-text fs-1">
                ${props.currentBalance.toLocaleString()}
              </h1>
              <Link to="/accounts">View Balance</Link>
            </div>
            <div className="position-absolute top-0 end-0 m-3">
              <div
                className={`"${
                  props.currentBalance >= 8500 ? "text-success" : "text-danger"
                } fs-6"`}
              >
                <i
                  className={`"bi bi-caret-${
                    props.currentBalance >= 8500
                      ? "up-fill text-success"
                      : "down-fill text-danger"
                  } me-1"`}
                ></i>
                <span>
                  {(((props.currentBalance - 8500) / 8500) * 100).toFixed(2)}%
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-card-list fs-4 me-3"></i>
              <h5 className="card-title mb-0 fs-5">Transcations</h5>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h1 className="card-text fs-1">{props.numTransactions}</h1>
              <Link to="/transactions">View Transcations</Link>

              <div className="position-absolute top-0 end-0 m-3"></div>
            </div>
          </div>
        </div>
      </div>
      <div className="col-md-4 mb-4">
        <div className="card h-100">
          <div className="card-body">
            <div className="d-flex align-items-center mb-3">
              <i className="bi bi-clock-history fs-4 me-3"></i>

              <h5 className="card-title mb-0 fs-5">Open Contract</h5>
            </div>
            <div className="d-flex flex-column align-items-center">
              <h1 className="card-text fs-1">{props.numActive}</h1>
              <Link to="/accounts">View Open Contracts</Link>

              <div className="position-absolute top-0 end-0 m-3"></div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Widget;
