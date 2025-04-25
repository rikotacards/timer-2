import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import React from "react";
import CircleIcon from "@mui/icons-material/Circle";

import { useCategories } from "../hooks/queries/useCategories";
import { useProjects } from "../hooks/queries/useProjects";
import { useInsertActiveEntry } from "../hooks/mutations/useStartEntry";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import { KeyboardArrowDown } from "@mui/icons-material";
interface SmallChooseCategoryProps {
  onClose: () => void;
}
export const NonActiveEntrySmall: React.FC<SmallChooseCategoryProps> = ({
  onClose,
}) => {
  const { data } = useCategories();
  const start = useInsertActiveEntry();
  const { data: projects } = useProjects();
  const [desc, setDesc] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = React.useState<string>("");
  const category = useGetCategoryInfo(selectedCategoryId || "");
  const project = useGetProjectInfo(selectedProjectId || "");
  const [open, setOpen] = React.useState(category ? "" : "category");
  const [isProjectOpen, setProjectOpen] = React.useState(false);
  const onProjectIdChange = (id: string) => {
    setSelectedProjectId(id);
  };
  const onCategoryIdChange = (id: string) => {
    setSelectedCategoryId(id);
  };
  const onStart = async () => {
    await start.mutate({
      description: desc,
      categoryId: selectedCategoryId,
      projectId: selectedCategoryId,
    });
    onClose();
  };
  return (
    <Box sx={{ display: "flex", flexDirection: "column" }}>
      <Toolbar>Add Activity
        <Box sx={{ml:'auto'}}>
            <IconButton onClick={onClose} size='small'>
                <KeyboardArrowDown/>
            </IconButton>
        </Box>

      </Toolbar>
      <Box sx={{ p: 1 }}>
        <Typography sx={{ p: 1 }}>Category:</Typography>
        {open === "" && (
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setOpen("category");
                }}
              >
                <ListItemIcon>
                  <CircleIcon sx={{ color: category?.color }} />
                </ListItemIcon>
                <ListItemText>{category?.name}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}

        {open == "category" && (
          <List
            sx={{
              maxHeight: 200,
              overflow: "hidden",
              overflowY: "scroll",
              width: "100%",
            }}
          >
            {data?.map((d) => (
              <ListItem disablePadding component={"div"}>
                <ListItemButton
                  selected={d.id === category?.id}
                  onClick={() => {
                    onCategoryIdChange(d.id);
                    setOpen("");
                  }}
                >
                  <ListItemIcon>
                    <CircleIcon sx={{ color: d.color }} />
                  </ListItemIcon>
                  <ListItemText>{d.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <Typography sx={{ p: 1 }}>Project:</Typography>
        {!isProjectOpen && (
          <List>
            <ListItem disablePadding>
              <ListItemButton
                onClick={() => {
                  setProjectOpen(true);
                }}
              >
                {project && (
                  <ListItemIcon>
                    <CircleIcon sx={{ color: project?.color }} />
                  </ListItemIcon>
                )}
                <ListItemText>{project?.name || "Select Project"}</ListItemText>
              </ListItemButton>
            </ListItem>
          </List>
        )}

        {isProjectOpen && (
          <List
            sx={{ maxHeight: 200, overflow: "hidden", overflowY: "scroll" }}
          >
            {projects?.map((d) => (
              <ListItem disablePadding component={"div"}>
                <ListItemButton
                  onClick={() => {
                    onProjectIdChange(d.id);
                    setProjectOpen(false);
                  }}
                >
                  <ListItemIcon>
                    <CircleIcon sx={{ color: d.color }} />
                  </ListItemIcon>
                  <ListItemText>{d.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        )}
        <TextField
          placeholder="What are you working on?"
          fullWidth
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
          sx={{ mb: 1 }}
        />
        <Button loading={start.isPending} onClick={onStart} fullWidth sx={{ p: 1 }} variant="contained" color="success">
          Start
        </Button>
      </Box>
    </Box>
  );
};
