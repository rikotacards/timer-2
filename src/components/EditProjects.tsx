import React from "react";
import { useProjects } from "../hooks/queries/useProjects";
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
import { EditProject } from "./EditProject";
interface AllProjectsPageProps {
  onBack: () => void;
  onPageChange: (page: number) => void;
}
const AllProjectsPage: React.FC<AllProjectsPageProps> = ({ onBack }) => {
  const projects = useProjects();
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
            <Typography>Edit Projects</Typography>
          </Toolbar>
          <List>
            {projects.data?.map((p) => (
              <ListItem>
                <ListItemButton
                  onClick={() => {
                    allProjectsOnPageChange(1);
                    onProjectClick(p);
                  }}
                >
                  <ListItemText>{p.name}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
          <Button>Add Project</Button>
        </>
      )}
      {page === 1 && (
        <Box sx={{ display: "flex", flexDirection: "column" }}>
          <Toolbar disableGutters>
            <IconButton size="small" onClick={() => allProjectsOnPageChange(0)}>
              <ChevronLeft fontSize="small" />
            </IconButton>
            <Typography sx={{ mr: 2 }}>
              Edit Project: {project?.name}
            </Typography>
          </Toolbar>
          {project && <EditProject project={project} />}
        </Box>
      )}
    </>
  );
};
interface EditProjectsProps {
  onBack: () => void;
}
export const EditProjects: React.FC<EditProjectsProps> = ({ onBack }) => {
  const [page, setPage] = React.useState(0);
  const onPageChange = (page: number) => {
    setPage(page);
  };
  return (
    <Box>
      {page === 0 && (
        <AllProjectsPage onBack={onBack} onPageChange={onPageChange} />
      )}
    </Box>
  );
};
