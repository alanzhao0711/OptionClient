import React, { useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { styled } from "@mui/material/styles";
import { v4 as uuidv4 } from "uuid";

const StyledDataGrid = styled(DataGrid)(({ theme }) => ({
  "& .green-row": {
    backgroundColor: "#F38701",
    color: "white",
  },
  "& .red-row": {
    backgroundColor: "#white",
    color: "black",
  },
}));

const TabPanel = (props) => {
  const getRowClassName = (params) => {
    const { row } = params;
    return row["Purchased"] ? "green-row" : "red-row";
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
    // { field: "CurrentPrice", headerName: "Current Price", width: 100 },
    // { field: "P&L", headerName: "P&L", width: 100, type: "number" },
    { field: "Quantity", headerName: "Quantity", width: 100 },

    { field: "ExpectedValue", headerName: "ExpectedValue", width: 100 },
    { field: "KellyCriterion", headerName: "KellyCriterion", width: 100 },
    { field: "Exp Date", headerName: "Exp Date", width: 100 },
    // { field: "Max Profit%", headerName: "Max Profit%", width: 100 },
    { field: "Max Loss", headerName: "Max Loss", width: 100 },
    { field: "BE+", headerName: "BE+", width: 100 },
    { field: "BE-", headerName: "BE-", width: 100 },
    { field: "Purchased", headerName: "Purchased", width: 100 },
    { field: "Probability", headerName: "Probability", width: 100 },
    { field: "Leg 1", headerName: "Leg 1", width: 100 },
    { field: "Leg 2", headerName: "Leg 2", width: 100 },
    { field: "Leg 3", headerName: "Leg 3", width: 100 },
    { field: "Leg 4", headerName: "Leg 4", width: 100 },
  ];

  const formattedRows = props.data.map((row) => {
    const formattedRow = {
      id: uuidv4(),
      Symbol: row.Symbol,
      Price: row.Price,
      Purchased: row.Purchased,
      ExpectedValue: row.ExpectedValue,
      Quantity: row.Quantity,
      KellyCriterion: (row.KellyCriterion * 100).toFixed(2),
      // "P&L": (
      //   (row["Max Profit"] - row["CurrentPrice"]) *
      //   row["Quantity"] *
      //   100
      // ).toFixed(2),
      "Max Profit": row["Max Profit"],
      // CurrentPrice: row["CurrentPrice"],
      "Exp Date": row["Exp Date"],
      // "Max Profit%": row["Max Profit%"],
      "Max Loss": row["Max Loss"],
      Probability: row.Probability,
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
  );
};

export default TabPanel;
