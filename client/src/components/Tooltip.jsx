import Tooltip, { tooltipClasses } from "@mui/material/Tooltip";
import { styled } from "@mui/material/styles";

import React from "react";

const CustomTooltip = ({ title, children }) => {
  const DarkTooltip = styled(({ className, ...props }) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(({ theme }) => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: theme.palette.common.black,
      color: "rgba(255, 255, 255, 0.87)",
      boxShadow: theme.shadows[1],
      fontSize: 12,
      fontFamily: "Vazirmatn",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: theme.palette.common.black,
    },
  }));
  return (
    <DarkTooltip title={title} arrow>
      {children}
    </DarkTooltip>
  );
};

export default CustomTooltip;
