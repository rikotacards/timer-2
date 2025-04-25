import { ChevronLeft } from "@mui/icons-material";
import { Box, Button, IconButton, TextField, Toolbar } from "@mui/material";
import React from "react";
import { useInsertCategory } from "../hooks/mutations/useAddCategory";
interface AddNewCategoryProps {
  onBack: () => void;
}
export const AddNewCategory: React.FC<AddNewCategoryProps> = () => {
  const [cName, setCName] = React.useState("");
  const add = useInsertCategory();
  const onAdd = () => {
    add.mutate({ name: cName, color: "F###" });
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar>
        <Box>
          <IconButton>
            <ChevronLeft />
          </IconButton>
        </Box>
      </Toolbar>
      <TextField
        onChange={(e) => setCName(e.target.value)}
        placeholder={"Category name"}
      />
      <Button onClick={onAdd}>Add</Button>
    </Box>
  );
};
