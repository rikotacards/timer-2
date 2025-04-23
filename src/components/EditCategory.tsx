import React from "react";
import { Category } from "../types";
import {
  Avatar,
  Box,
  Button,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import { useInsertCategory } from "../hooks/mutations/useAddCategory";
import { useUpdateCategory } from "../hooks/mutations/useUpdateCategory";
interface EditProjectProps {
  category?: Category;
}
const colors = ["#d73a4a", "#94FD76", "#0366d6", "#aaaaaa"];
export const EditCategory: React.FC<EditProjectProps> = ({ category }) => {
  const [projectName, setProjectName] = React.useState(category?.name || "");
  const [color, setColor] = React.useState(category?.color || "");
  const addCategory = useInsertCategory();
  const updateCategory = useUpdateCategory();
  const onClick = () => {
    console.log('click')
    if (category) {
      //update
      updateCategory.mutate({
        id: category.id,
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
        sx={{ mb: 2 }}
        value={projectName}
        onChange={(e) => {
          setProjectName(e.target.value);
        }}
      />
      <Typography variant="body2">Color</Typography>
      <Box sx={{ display: "flex" }}>
        {colors.map((c) => (
          <IconButton onClick={() => setColor(c)}>
            <Avatar
              variant="circular"
              sx={{ backgroundColor: c, height: 20, width: 20 }}
            >
              {" "}
            </Avatar>
          </IconButton>
        ))}
      </Box>

      <Button onClick={onClick}>{category ? "save" : "add"}</Button>
    </Box>
  );
};
