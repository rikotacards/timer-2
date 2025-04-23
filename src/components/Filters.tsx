import { Box, MenuItem, Select } from "@mui/material";
import React from "react";
import { useProjects } from "../hooks/queries/useProjects";
import { useCategories } from "../hooks/queries/useCategories";
interface FiltersProps {
  onProjectChange: (id: string) => void;
  onCategoryChange: (id: string) => void;

  project: string;
  category: string;
}
export const Filters: React.FC<FiltersProps> = ({
  project,
  onProjectChange,
  onCategoryChange,
  category,
}) => {
  const projects = useProjects();
  const categories = useCategories();
  const projectSelections = (projects.data || []).map((p) => (
    <MenuItem value={p.id}>{p.name}</MenuItem>
  ));
  const categorySelections = (categories.data || []).map((p) => (
    <MenuItem value={p.id}>{p.name}</MenuItem>
  ));
  return (
    <Box>
      <Select
        onChange={(e) => onProjectChange(e.target.value)}
        displayEmpty
        value={project}
      >
        <MenuItem value="">Projects</MenuItem>
        {projectSelections}
      </Select>
      <Select
        value={category}
        onChange={(e) => onCategoryChange(e.target.value)}
        displayEmpty
      >
        <MenuItem value="">Categories</MenuItem>

        {categorySelections}
      </Select>
    </Box>
  );
};
