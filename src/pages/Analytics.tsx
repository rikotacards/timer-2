import { Box, LinearProgress } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { Entry } from "../components/Entry";
import { Filters } from "../components/Filters";
import { useEntries } from "../hooks/queries/useEntries";
import { getTotalDuration } from "../utils/getTotalDuration";
import { DuarationCard } from "../components/DurationCard";

export const Analytics: React.FC = () => {
  const location = useLocation();
  const state = location.state as {projectId: string, categoryId: string}
  
  const [selectedProject, setSelectedProject] = React.useState(state?.projectId );
  const [selectedCategory, setSelectedCategory] = React.useState(state?.categoryId)
  
  const onProjectChange = (id: string) => {
    setSelectedProject(id);
  };
  const onCategoryChange = (id: string) => {
    setSelectedCategory(id);
  }
 
  const entires = useEntries({ projectId: selectedProject, categoryId: selectedCategory});
  if (entires.isLoading) {
    return <LinearProgress />;
  }
  const times = (entires.data || []).map((d) => ({
    startTime: d.start_time,
    endTime: d.end_time,
  }));
  const total = getTotalDuration(times);
  const {hours, minutes} = total;
  return (
    <Box>
      <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
        <Filters 
        category={selectedCategory}
        project={selectedProject} 
        onCategoryChange={onCategoryChange}
        onProjectChange={onProjectChange} />
        <DuarationCard hours={hours} minutes={minutes} desc='Filtered total hours'/>
      </Box>
      {(entires.data || []).map((e) => (
        <Entry
          key={e.id}
          desc={e.desc || ""}
          startTime={e.start_time}
          endTime={e.end_time}
          id={e.id}
          categoryId={e.categoryId}
          projectId={e.projectId}
        />
      ))}
    </Box>
  );
};
