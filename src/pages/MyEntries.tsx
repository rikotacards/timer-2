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
  
  const entriesByDate = groupEntriesByDate(data);
  const renderEntries = () => {
    const res = [];
    for (const date in entriesByDate) {
      const times = entriesByDate[date].map((e) => ({
        startTime: e.start_time,
        endTime: e.end_time,
      }));
      const total = getTotalDuration(times);
      const renderCategoryCards = () => {
        const res = [];
        const eByCategory = groupEntriesByCategory(entriesByDate[date]);
        for (const key in eByCategory) {
          
          const times = eByCategory[key]?.map((e) => ({
            startTime: e.start_time,
            endTime: e.end_time,
          }));
          const total = getTotalDuration(times);
          res.push(
            <DuarationCard
              desc={categories.data?.find((e) => e?.id == key)?.name || ""}
              hours={total.hours}
              color={categories.data?.find((e) => e?.id == key)?.color || ""}
              minutes={total.minutes}
            />
          );
        }
        return res;
      };
      res.push(
        <Box key={date}>
          <Box
            sx={{mb:1, display: "flex", flexDirection: "row", alignItems: "center" }}
          >
            <Typography fontWeight={"bold"}  variant="body1">
              {date}
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "row",
                alignItem: "center",
                ml:2
              }}
            >
              <Typography color='textSecondary' sx={{mr:1}}>Total</Typography>
              <Typography fontWeight='bold' sx={{mr:1}}>{total.hours}</Typography>
              <Typography sx={{mr:1}}>hrs</Typography>
              <Typography fontWeight='bold' sx={{mr:1}}>{total.minutes}</Typography>
              <Typography>min</Typography>
            </Box>
          </Box>
          <Box sx={{ display: "flex", flexDirection: "row", overflowX:'scroll' }}>
           
            {renderCategoryCards()}
          </Box>
          {entriesByDate[date].map((t) => (
            <Entry
              key={t.id}
              id={t.id}
              desc={t.desc || ""}
              startTime={t.start_time}
              endTime={t.end_time}
              categoryId={t.categoryId}
              projectId={t.projectId}
            />
          ))}
        </Box>
      );
    }
    return res;
  };
  return (
    <Box sx={{mt:1}}>
      
      {renderEntries()}
    </Box>
  );
};
