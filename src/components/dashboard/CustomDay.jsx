import * as React from "react";
import { Box, Typography } from "@mui/material";

const CustomDay = (props) => {
  const { day, selected, inCurrentMonth, ...other } = props;
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      height={48}
      width={48}
      bgcolor={selected ? "primary.main" : "background.paper"}
      color={
        selected
          ? "background.paper"
          : inCurrentMonth
          ? "text.primary"
          : "text.secondary"
      }
      borderRadius="50%"
      {...other}
    >
      <Typography variant="body1">{day.date()}</Typography>
    </Box>
  );
};

export default CustomDay;
