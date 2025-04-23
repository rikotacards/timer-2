import { Box, LinearProgress, Typography } from "@mui/material";
import React from "react";
import { Entry } from "../components/Entry";
import { useEntries } from "../hooks/queries/useEntries";
import { getTotalDuration } from "../utils/getTotalDuration";
import { DuarationCard } from "../components/DurationCard";
import { groupEntriesByDate } from "../utils/groupEntriesByDate";
import { groupEntriesByCategory } from "../utils/groupEntriesByCategory";
import { useCategories } from "../hooks/queries/useCategories";

export const MyEntries: React.FC = () => {
  const { data, isLoading } = useEntries();
  const categories = useCategories();
  if (!data || isLoading) {
    return <LinearProgress />;
  }
  const times = data.map((d) => ({
    startTime: d.start_time,
    endTime: d.end_time,
  }));
  const entriesByDate = groupEntriesByDate(data);
  const renderEntries = () => {
    const res = [];
    for (const key in entriesByDate) {
      const times = entriesByDate[key].map((e) => ({
        startTime: e.start_time,
        endTime: e.end_time,
      }));
      const total = getTotalDuration(times);
      const renderCategoryCards = () => {
        const res = [];
        const eByCategory = groupEntriesByCategory(entriesByDate[key]);
        for (const key in eByCategory) {
          const times = eByCategory[key]?.map((e) => ({
            startTime: e.start_time,
            endTime: e.end_time,
          }));
          const total = getTotalDuration(times);
          res.push(
            <DuarationCard
              desc={categories.data?.find((e) => e?.id == key)?.name || ''}
              hours={total.hours}
              minutes={total.minutes}
            />
          );
        }
        return res;
      };
      res.push(
        <Box key={key}>
          <Typography fontWeight={"bold"} sx={{ mb: 1 }} variant="body1">
            {key}
          </Typography>
          <Box sx={{ display: "flex", flexDirection: "row" }}>
            <DuarationCard
              desc="Total time logged for the day"
              hours={total.hours}
              minutes={total.minutes}
            />
            {renderCategoryCards()}
          </Box>
          {entriesByDate[key].map((t) => (
            <Entry
              key={t.id}
              id={t.id}
              desc={t.desc || ""}
              startTime={t.start_time}
              endTime={t.end_time}
              category={t.category}
              projectId={t.projectId}
            />
          ))}
        </Box>
      );
    }
    return res;
  };
  const total = getTotalDuration(times);
  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <DuarationCard
          hours={total.hours}
          minutes={total.minutes}
          desc="total time logged"
        />
      </Box>
      {renderEntries()}
    </Box>
  );
};
