import {
  Box,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

import { useCategories } from "../hooks/queries/useCategories";
interface SmallChooseCategoryProps {
  onClick: (id: string) => void;
}
export const SmallChooseCategory: React.FC<SmallChooseCategoryProps> = ({
  onClick,
}) => {
  const { data } = useCategories();
  return (
    <Box>
      <List sx={{ maxHeight: 200, overflow: "hidden", overflowY: "scroll" }}>
        {data?.map((d) => (
          <ListItem disablePadding component={"div"}>
            <ListItemButton onClick={() => onClick(d.id)}>
                <ListItemIcon>
                  <CircleIcon sx={{ color: d.color }} />
                </ListItemIcon>
              <ListItemText>
                {d.name}
              </ListItemText>
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};
