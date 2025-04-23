import { Box, Typography } from '@mui/material';
import React from 'react';
interface DurationDisplayProps {
    hours: number;
    minutes: number;
    seconds: number;
}
export const DurationDisplay: React.FC<DurationDisplayProps> = ({hours, minutes, seconds}) => {
    return (
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}
        >
          {hours > 0 && (
            <Typography sx={{mr:1}} variant="caption">{`${hours} hours`}</Typography>
          )}
          <Typography variant="caption">{`${minutes} min, ${seconds} sec`}</Typography>
        </Box>
    )
}