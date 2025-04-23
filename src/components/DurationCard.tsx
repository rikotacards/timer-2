import { Card, Box, Typography } from '@mui/material';
import React from 'react';
interface DuarationCardProps {
    hours: number;
    minutes: number; 
    desc: string;
}
export const DuarationCard: React.FC<DuarationCardProps> = ({desc, minutes, hours}) => {
    return (
        <Card
        sx={{
          p: 2,
          m: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "row" }}>
          <Typography fontWeight='bold' sx={{ mr: 1 }}>{hours}</Typography>
          <Typography sx={{ mr: 1 }}>hrs</Typography>
          <Typography fontWeight='bold' sx={{ mr: 1 }}>{minutes}</Typography>
          <Typography sx={{ mr: 1 }}>min</Typography>
        </Box>

        <Typography variant="caption">{desc}</Typography>
      </Card>
    )
}