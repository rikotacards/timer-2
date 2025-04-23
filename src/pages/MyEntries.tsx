import { Box, Card, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { Entry } from "../components/Entry";
import { useEntries } from "../hooks/queries/useEntries";
import { getTotalDuration } from "../utils/getTotalDuration";
import { DuarationCard } from "../components/DurationCard";

export const MyEntries: React.FC = () => {
  const { data, isLoading } = useEntries();
  if (!data || isLoading) {
    return <LinearProgress />;
  }
  const times = data.map((d) => ({
    startTime: d.start_time,
    endTime: d.end_time,
  }));
  const total = getTotalDuration(times);
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <DuarationCard hours={total.hours} minutes={total.minutes} desc='total time logged'/>
      </Box>

      {data.map((t) => (
        <Entry
          key={t.id}
          id={t.id}
          desc={t.desc}
          startTime={t.start_time}
          endTime={t.end_time}
          category={t.category}
          projectId={t.projectId}
        />
      ))}
    </Box>
  );
};
