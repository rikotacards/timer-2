import {
  Box,
  Button,
  MenuItem,
  MenuList,
  TextField,
} from "@mui/material";
import React from "react";
import { useCategories } from "../hooks/queries/useCategories";
import { useInsertCategory } from "../hooks/mutations/useAddCategory";
import { useUpdateEntry } from "../hooks/mutations/useUpdateEntry";
interface AddCategoryProps {
  onCancel: () => void;
  id: string;
  categoryId?: string;
  onClick?: (id: string) => void;
  isActive?: boolean;
}
export const AddCategory: React.FC<AddCategoryProps> = ({
  onCancel,
  id,
  categoryId,
  onClick,
  isActive
}) => {
  const [name, setName] = React.useState("");
  const categories = useCategories();
  const addCategory = useInsertCategory();
  const update = useUpdateEntry();
  const onAdd = () => {
    addCategory.mutate({
      name,
      color: "#FFF",
    });
  };
  if (!categories.data || categories.isLoading) {
    return null;
  }
  const onCategoryClick = (id: string, categoryId: string) => {
    console.log('mu')
    update.mutate({
      id,
      category: categoryId,
    });
  };

  return (
    <Box sx={{ display: "flex", flexDirection: "column", p: 1 }}>

      <TextField
        size="small"
        value={name}
        placeholder="Search category"
        onChange={(e) => setName(e.target.value)}
      />
      <MenuList>
        {(categories.data || []).map((c) => (
          <MenuItem
            key={c.id}
            color={categoryId === c.id ? "primary" : undefined}
            onClick={() =>
              !isActive ?  onClick?.(c.id) : onCategoryClick(id, c.id)
            }
          >
            {c.name}
          </MenuItem>
        ))}
      </MenuList>
      <Button onClick={onAdd}>Add</Button>
      <Button onClick={onCancel}>back</Button>
    </Box>
  );
};
