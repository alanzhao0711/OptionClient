import React, { useEffect, useState } from "react";
import "./PastTransactions.scss";
import { socket } from "../../Auth";
import { styled } from "@mui/material/styles";
import { DataGrid } from "@mui/x-data-grid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .past-row": {
    backgroundColor: "#FFFEE9",
    color: "black",
  },
  "& .active-row": {
    backgroundColor: "#ffa3a6",
    color: "white",
  },
}));

const PastTransactions = () => {
  const [pastData, setPastData] = useState([]);

  useEffect(() => {
    socket.emit("transactions");
    socket.on("past", (data) => {
      setPastData(data);
    });
  }, []);

  const getRowClassName = (params) => {
    const { row } = params;
    const expDate = new Date(row["Exp Date"]); // convert "YYYY-MM-DD" string to date object
    const currentDate = new Date(); // get current date
    if (expDate > currentDate) {
      return "past-row";
    } else {
      return "active-row";
    }
  };

  const [sortModel, setSortModel] = useState([
    {
      field: "Exp Date",
      sort: "desc",
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

  const formattedRows = pastData.map((row) => {
    const formattedRow = {
      id: row._id,
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
          <h4 className="card-title mb-4">All Transactions</h4>
          <hr className="my-4" />
          <div className="data-grid">
            <StyledDataGrid
              rows={formattedRows}
              columns={columns}
              getRowClassName={getRowClassName}
              pageSize={5}
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

export default PastTransactions;
