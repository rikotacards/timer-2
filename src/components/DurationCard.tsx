import { Card, Box, Typography } from '@mui/material';
import React from 'react';
interface DuarationCardProps {
    hours: number;
    minutes: number; 
    desc: string;
    color?: string;
}
export const DuarationCard: React.FC<DuarationCardProps> = ({desc, minutes, hours, color}) => {
    return (
        <Card
        sx={{
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "flex-start",
          minWidth: 150
        }}
      >
        <Typography sx={{color}} variant="caption">{desc || "No Label"}</Typography>
        <Box sx={{ display: "flex" }}>
          <Typography fontWeight='bold' sx={{ mr: 1 }}>{hours}</Typography>
          <Typography sx={{ mr: 1 }}>hrs</Typography>
          <Typography fontWeight='bold' sx={{ mr: 1 }}>{minutes}</Typography>
          <Typography sx={{ mr: 1 }}>min</Typography>
        </Box>

      </Card>
    )
}