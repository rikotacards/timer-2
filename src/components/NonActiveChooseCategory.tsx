import {
  Box,
  Button,
  IconButton,
  MenuItem,
  Select,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";
import { useCategories } from "../hooks/queries/useCategories";
import { Close } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
interface NonActiveChooseCategoryProps {
  onBack: () => void;
  selectedCategoryId?: string;
  onChange: (id: string) => void;
}
export const NonActiveChooseCategory: React.FC<
  NonActiveChooseCategoryProps
> = ({ onBack, selectedCategoryId, onChange }) => {
  const c = useCategories();
  const nav = useNavigate();
  const onEdit = () => {
    nav("/categories");
  };
  if (c.isLoading || !c.data) {
    return null;
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "column", width: "200px" }}>
      <Toolbar>
        <Typography fontWeight={"bold"}>Add Category</Typography>
        <Box sx={{ ml: "auto" }}>
          <IconButton size="small" onClick={onBack}>
            <Close fontSize="small" />
          </IconButton>
        </Box>
      </Toolbar>

      <Select
        sx={{ m: 1 }}
        autoFocus
        onChange={(v) => onChange(v.target.value)}
        value={selectedCategoryId}
      >
        {c.data.map((cat) => (
          <MenuItem value={cat.id}>
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                flexDirection: "row",
              }}
            >
              <CircleIcon sx={{ color: cat.color, mr:1 }} fontSize="small" />
              <Typography>{cat.name}</Typography>
            </Box>
          </MenuItem>
        ))}
      </Select>
      <Button onClick={onEdit} sx={{ textTransform: "capitalize" }}>
        Edit categories
      </Button>
    </Box>
  );
};
