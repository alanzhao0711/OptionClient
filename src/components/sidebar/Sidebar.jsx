import "./Sidebar.scss";
import DashboardIcon from "@mui/icons-material/Dashboard";
import StoreIcon from "@mui/icons-material/Store";
import RequestPageIcon from "@mui/icons-material/RequestPage";
import AccountBalanceIcon from "@mui/icons-material/AccountBalance";
import { Link } from "react-router-dom";
import { useState } from "react";

const Sidebar = () => {
  const [isCollapsed, setIsCollapsed] = useState(false);

  const handleToggle = () => {
    setIsCollapsed(!isCollapsed);
  };

  return (
    <div className="sidebar">
      <div className="top">
        <Link to="/" style={{ textDecoration: "none" }}>
          <img src="images/logo.png" alt="" />
        </Link>
        <button
          className="btn btn-primary d-block d-md-none"
          type="button"
          onClick={handleToggle}
          style={{
            backgroundColor: "#a2d5f2",
            border: "none",
            marginLeft: "2rem",
          }}
        >
          <i className="bi bi-list"></i>
        </button>
      </div>
      <hr />
      <div className={`center ${isCollapsed ? "collapse" : ""}`}>
        <ul>
          <p className="title">MAIN</p>
          <Link to="/" style={{ textDecoration: "none" }}>
            <li>
              <DashboardIcon className="icon" />
              <span>Dashboard</span>
            </li>
          </Link>
          <Link to="/accounts" style={{ textDecoration: "none" }}>
            <li>
              <AccountBalanceIcon className="icon" />
              <span>Account</span>
            </li>
          </Link>
          <Link to="/contracts" style={{ textDecoration: "none" }}>
            <li>
              <RequestPageIcon className="icon" />
              <span>Contracts</span>
            </li>
          </Link>
          <Link to="/transactions" style={{ textDecoration: "none" }}>
            <li>
              <StoreIcon className="icon" />
              <span>Transactions</span>
            </li>
          </Link>
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
