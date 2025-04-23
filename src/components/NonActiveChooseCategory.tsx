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
import { useCategories } from "../hooks/queries/useCategories";
import { ChevronLeft } from "@mui/icons-material";
interface NonActiveChooseCategoryProps {
  onBack: () => void;
  selectedCategoryId?: string;
  onChange: (id: string) => void;
}
export const NonActiveChooseCategory: React.FC<
  NonActiveChooseCategoryProps
> = ({ onBack, selectedCategoryId, onChange }) => {
  const c = useCategories();
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
        <DialogTitle>Add Category</DialogTitle>
      </Toolbar>

      <Select 
      autoFocus
      onChange={(v) => onChange(v.target.value)}
      value={selectedCategoryId}>
        {c.data.map((cat) => (
          <MenuItem value={cat.id}>{cat.name}</MenuItem>
        ))}
      </Select>
      <Button>Add New Category</Button>
      <Button onClick={onBack}>Back</Button>
    </Box>
  );
};
