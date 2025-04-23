import React from "react";
import { Project } from "../types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useUpdateCategory } from "../hooks/mutations/useUpdateCategory";
import { useAddProject } from "../hooks/mutations/useAddProject";
import { useUpdateProject } from "../hooks/mutations/useUpdateProject";
interface EditProjectProps {
  project: Project;
}
const colors = ["#d73a4a", "#94FD76", "#0366d6", "#aaaaaa"];
export const EditProject: React.FC<EditProjectProps> = ({ project }) => {
  const [projectName, setProjectName] = React.useState(project.name);
   const [color, setColor] = React.useState(project?.color || "");
 
  const addCategory = useAddProject();
    const updateCategory = useUpdateProject();
    const onClick = () => {
        console.log('click')
        if (project) {
          //update
          updateCategory.mutate({
            id: project.id,
            name: projectName,
            color,
          });
        } else {
          //insert
          addCategory.mutate({
            name: projectName,
            color,
          });
        }
      };
  return (
    <Box sx={{ p: 0, display: "flex", flexDirection: "column" }}>
      <TextField
      sx={{mb:2}}
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
      />
      <Typography variant='body2'>Color</Typography>
      <Box sx={{ display: "flex" }}>
        {colors.map((c) => (
          <IconButton onClick={() => setColor(c)}>
            <Avatar
              variant="circular"
              sx={{ backgroundColor: c, height: 20, width: 20 }}
            >
                {' '}
            </Avatar>
          </IconButton>
        ))}
      </Box>

      <Button onClick={onClick}>{project ? "save" : "add"}</Button>
    </Box>
  );
};
