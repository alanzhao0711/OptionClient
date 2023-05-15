import React, { useEffect } from "react";
import "./ActiveOptions.scss";
import { DataGrid } from "@mui/x-data-grid";
import { useState } from "react";
import { styled } from "@mui/material/styles";
import { socket } from "../../Auth";
import { v4 as uuidv4 } from "uuid";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .green-row": {
    backgroundColor: "#1ABC9C",
    color: "white",
  },
  "& .red-row": {
    backgroundColor: "#FF5733",
    color: "black",
  },
  "& .white-row": {
    backgroundColor: "white",
    color: "black",
  },
}));

const ActiveOptions = () => {
  const [data, setData] = useState([]);
  const [currentPL, setCurrentPL] = useState(0);
  const [currentCost, setCurrentCost] = useState(0);
  const [value, setValue] = useState("BullPut");
  useEffect(() => {
    socket.emit("dash");
    socket.on("all-active-options", (data) => {
      setData(data);
    });
    socket.on("account-PL", (data) => {
      setCurrentPL(data);
    });
    socket.on("cost", (data) => {
      setCurrentCost(data);
    });
    // return () => {
    //   socket.disconnect();
    // };
  }, []);

  const getRowClassName = (params) => {
    const { row } = params;
    if (row["P&L"] > 0) {
      return "green-row";
    } else if (row["P&L"] === 0) {
      return "white-row";
    } else {
      return "red-row";
    }
  };

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };

  const [sortModel, setSortModel] = useState([
    {
      field: "P&L",
      sort: "desc",
      comparator: (v1, v2) => parseFloat(v1) - parseFloat(v2),
    },
  ]);

  const columns = [
    { field: "Symbol", headerName: "Symbol", width: 100 },
    { field: "Price", headerName: "Price", width: 100 },
    { field: "Max Profit", headerName: "Credited", width: 100 },
    { field: "CurrentPrice", headerName: "Current Price", width: 100 },
    { field: "P&L", headerName: "P&L", width: 100, type: "number" },
    { field: "Quantity", headerName: "Quantity", width: 100 },

    // { field: "Max Profit%", headerName: "Max Profit%", width: 100 },
    // { field: "Max Loss", headerName: "Max Loss", width: 100 },
    { field: "BE+", headerName: "BE+", width: 100 },
    { field: "BE-", headerName: "BE-", width: 100 },
    // { field: "Probability", headerName: "Probability", width: 100 },
    { field: "Exp Date", headerName: "Exp Date", width: 100 },
    { field: "Leg 1", headerName: "Leg 1", width: 100 },
    { field: "Leg 2", headerName: "Leg 2", width: 100 },
    { field: "Leg 3", headerName: "Leg 3", width: 100 },
    { field: "Leg 4", headerName: "Leg 4", width: 100 },
  ];

  const filterdData = data.filter((row) => {
    return row.Strategy === value;
  });
  const formattedRows = filterdData.map((row) => {
    const formattedRow = {
      id: uuidv4(),
      Symbol: row.Symbol,
      Price: row.Price,
      Quantity: row.Quantity,
      "P&L": (
        (row["Max Profit"] - row["CurrentPrice"]) *
        row["Quantity"] *
        100
      ).toFixed(2),
      "Max Profit": row["Max Profit"],
      CurrentPrice: row["CurrentPrice"],
      "Exp Date": row["Exp Date"],
      // "Max Profit%": row["Max Profit%"],
      // "Max Loss": row["Max Loss"],
      // Probability: row.Probability,
    };
    if (row["BE"]) {
      if (row["Strategy"] === "BearCall") {
        formattedRow["BE+"] = "";
        formattedRow["BE-"] = row.BE;
      } else if (row["Strategy"] === "BullPut") {
        formattedRow["BE-"] = "";
        formattedRow["BE+"] = row.BE;
      }
    } else {
      formattedRow["BE+"] = row["BE+"] || "";
      formattedRow["BE-"] = row["BE-"] || "";
    }
    if (row["Leg3 Bid"]) {
      formattedRow["Leg 1"] = row["Leg1 Strike"];
      formattedRow["Leg 2"] = row["Leg2 Strike"];
      formattedRow["Leg 3"] = row["Leg3 Strike"];
      formattedRow["Leg 4"] = row["Leg4 Strike"];
    } else {
      formattedRow["Leg 2"] = "";
      formattedRow["Leg 1"] = row["Leg1 Strike"];
      formattedRow["Leg 4"] = "";
      formattedRow["Leg 3"] = row["Leg2 Strike"];
    }
    return formattedRow;
  });

  return (
    <div style={{ height: "400px" }}>
      <div className="card" style={{ marginTop: "20px" }}>
        <div className="card-body">
          <h4 className="card-title mb-4">My contracts</h4>
          <div className="card-body">
            <h5>
              <i
                className="bi bi-dot"
                style={{ fontSize: "1.5rem", color: "gold" }}
              ></i>
              Contract Market Value: ${currentPL.toFixed(2).toLocaleString()}
            </h5>
            <h5>
              <i
                className="bi bi-dot"
                style={{ fontSize: "1.5rem", color: "blue" }}
              ></i>
              Total Cost/Max Loss: ${currentCost.toFixed(2).toLocaleString()}
            </h5>
          </div>
          <div className="tabs">
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs
                value={value}
                onChange={handleChange}
                aria-label="basic tabs example"
              >
                <Tab label="BullPut" value="BullPut" />
                <Tab label="BearCall" value="BearCall" />
                <Tab label="IronCon" value="IronCon" />
              </Tabs>
            </Box>
            {/* <TabPanel data={screenerData} /> */}
          </div>
          <div className="data-grid">
            <StyledDataGrid
              rows={formattedRows}
              columns={columns}
              getRowClassName={getRowClassName}
              pageSize={10}
              pagination
              checkboxSelection
              sortModel={sortModel}
              onSortModelChange={(model) => setSortModel(model)}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ActiveOptions;
