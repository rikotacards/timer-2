import { Box, Typography } from "@mui/material";
import React from "react";
interface StartEndDisplayProps {
  startTime: string;
  endTime: string;
}
export const StartEndDisplay: React.FC<StartEndDisplayProps> = ({
  startTime,
  endTime,
}) => {
  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
      <Typography color='textSecondary' variant="caption">
        {new Date(startTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // or false for 24-hour format
        })}
      </Typography>
      <Typography color='textSecondary'  sx={{ ml: 0.5, mr: 0.5 }}>-</Typography>
      <Typography color='textSecondary'  variant="caption">
        {new Date(endTime).toLocaleTimeString([], {
          hour: "2-digit",
          minute: "2-digit",
          hour12: true, // or false for 24-hour format
        })}
      </Typography>
    </Box>
  );
};
