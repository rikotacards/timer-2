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
import { useInsertCategory } from "../hooks/mutations/useAddCategory";
import CheckIcon from "@mui/icons-material/Check";
import { colors } from "../colors";
interface EditProjectProps {
  project?: Project;
  isCategory?: boolean;
  onSuccess?: () => void;
}
export const EditProject: React.FC<EditProjectProps> = ({
  project,
  isCategory,
  onSuccess,
}) => {
  const [projectName, setProjectName] = React.useState(project?.name);
  const [color, setColor] = React.useState(project?.color || "");

  const addProject = useAddProject();
  const addCategory = useInsertCategory();
  const updateProject = useUpdateProject();
  const updateCategory = useUpdateCategory();
  const onClick = () => {
    console.log("click");
    if (project && project.name) {
      //update
      (isCategory ? updateCategory : updateProject).mutate({
        id: project.id,
        name: projectName || "",
        color,
      });
    } else {
      //insert
      (isCategory ? addCategory : addProject).mutate({
        name: projectName || "",
        color,
      });
    }
    onSuccess?.();
  };
  return (
    <Box sx={{  display: "flex", flexDirection: "column", p: 1 }}>
      <Typography sx={{ color, mb: 1 }}>{projectName}</Typography>
      <TextField
        size="small"
        sx={{ mb: 2 }}
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
      />
      <Box sx={{ display: "flex" }}>
        {colors.map((c) => (
          <IconButton onClick={() => setColor(c)}>
            <Avatar
              variant="circular"
              sx={{ backgroundColor: c, height: 20, width: 20 }}
            >
              {c === color ? <CheckIcon fontSize="small" /> : " "}
            </Avatar>
          </IconButton>
        ))}
      </Box>

      <Button onClick={onClick}>{project ? "save" : "add"}</Button>
    </Box>
  );
};
