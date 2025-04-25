import React from "react";
import {
  Box,
  Button,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";
import { Project } from "../types";
import { ChevronLeft } from "@mui/icons-material";
import { useCategories } from "../hooks/queries/useCategories";
import { EditCategory } from "./EditCategory";
interface AllProjectsPageProps {
  onBack: () => void;
  onPageChange: (page: number) => void;
}

const AllCategories: React.FC<AllProjectsPageProps> = ({ onBack }) => {
  const projects = useCategories();
  const [page, setPage] = React.useState(0);
  const [project, selectProject] = React.useState<Project | undefined>();
  const allProjectsOnPageChange = (index: number) => {
    setPage(index);
  };
  const onProjectClick = (p: Project) => {
    selectProject(p);
  };
  return (
    <>
      {page === 0 && (
        <>
          <Toolbar>
            <IconButton onClick={onBack}>
              <ChevronLeft />
            </IconButton>
            <Typography>Edit Categories</Typography>
          </Toolbar>
          <List>
            {projects.data?.map((p) => (
              <ListItem key={p.id}>
                <ListItemButton
                  onClick={() => {
                    allProjectsOnPageChange(1);
                    onProjectClick(p);
                  }}
                >
                  <ListItemText color={p.color}>{p.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button onClick={() => allProjectsOnPageChange(2)} fullWidth>Add Category</Button>
        </>
      )}
      {page === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Toolbar disableGutters>
            <IconButton size="small" onClick={() => allProjectsOnPageChange(0)}>
              <ChevronLeft fontSize="small" />
            </IconButton>
            <Typography sx={{ mr: 2 }}>
              Edit Category: {project?.name}
            </Typography>
          </Toolbar>
          {project && <EditCategory category={project} />}
        </Box>
      )}
       
      {page === 2 && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Toolbar disableGutters>
            <IconButton size="small" onClick={() => allProjectsOnPageChange(0)}>
              <ChevronLeft fontSize="small" />
            </IconButton>
            <Typography sx={{ mr: 2 }}>
              Add Category: {project?.name}
            </Typography>
          </Toolbar>
          {project && <EditCategory/>}
        </Box>
      )}
    </>
  );
};
interface EditCategoriesProps {
  onBack: () => void;
}
export const EditCategories: React.FC<EditCategoriesProps> = ({ onBack }) => {
  const [page, setPage] = React.useState(0);
  const onPageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Box>
      {page === 0 && (
        <AllCategories onBack={onBack} onPageChange={onPageChange} />
      )}
    </Box>
  );
};
