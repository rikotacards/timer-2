import {
    Box,
    Button,
    DialogTitle,
    IconButton,
    MenuItem,
    Select,
    Toolbar,
  } from "@mui/material";
  import React from "react";
  import { ChevronLeft } from "@mui/icons-material";
import { useProjects } from "../hooks/queries/useProjects";
  interface NonActiveChooseCategoryProps {
    onBack: () => void;
    selectedProjectId: null | string;
    onChange: (id: string | null) => void;
  }
  export const ChooseProject: React.FC<
    NonActiveChooseCategoryProps
  > = ({ onBack, selectedProjectId, onChange }) => {
    const c = useProjects();
    if (c.isLoading || !c.data) {
      return null;
    }
  
    return (
      <Box sx={{ display: "flex", flexDirection: "column" }}>
        <Toolbar>
          <Box>
            <IconButton onClick={onBack}>
              <ChevronLeft />
            </IconButton>
          </Box>
          <DialogTitle>Add Project</DialogTitle>
        </Toolbar>
  
        <Select 
        autoFocus
        onChange={(v) => onChange(v.target.value)}
        value={selectedProjectId}>
          {c.data.map((cat) => (
            <MenuItem value={cat.id}>{cat.name}</MenuItem>
          ))}
        </Select>
        <Button>Add New Project</Button>
        <Button onClick={onBack}>Back</Button>
      </Box>
    );
  };
  