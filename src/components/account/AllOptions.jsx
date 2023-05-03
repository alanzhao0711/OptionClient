import React, { useEffect } from "react";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import Box from "@mui/material/Box";
import { useState } from "react";
import TabPanel from "./TabPanel";
import axios from "axios";

const AllOptions = () => {
  const [screenerData, setScreenerData] = useState([]);
  const [value, setValue] = useState("BullPut");

  useEffect(() => {
    const getCurrentData = async (folder) => {
      const res = await axios.get(
        `https://optionx.herokuapp.com/data/${folder}`
      );
      setScreenerData(res.data);
    };

    getCurrentData("BullPut");
  }, []);

  useEffect(() => {
    const getCurrentData = async (folder) => {
      const res = await axios.get(
        `https://optionx.herokuapp.com/data/${folder}`
      );
      setScreenerData(res.data);
    };

    getCurrentData(value);
  }, [value]);

  const handleChange = (e, newVal) => {
    setValue(newVal);
  };
  return (
    <div>
      <div className="card">
        <div className="card-body">
          <h4>Top 10 Contract for Today</h4>
          <p style={{ fontSize: "1rem" }}>New data come in daily at 10AM EST</p>
          <hr className="my-4" />
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
            <TabPanel data={screenerData} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default AllOptions;
