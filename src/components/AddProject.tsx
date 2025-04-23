import { Box, Button, MenuItem, MenuList, TextField } from "@mui/material";
import React from "react";
import { useUpdateActiveEntry } from "../hooks/mutations/useUpdateActiveEntry";
import { useProjects } from "../hooks/queries/useProjects";
import { useUpdateEntry } from "../hooks/mutations/useUpdateEntry";
import { CreateNewProjectDialog } from "./CreateNewProjectDialog";

interface AddProjectProps {
    onClose: () => void;
    entryId?: string;
    isActive?: boolean;
    projectId?: string;
    onClick?: (id: string) => void;
}

export const AddProject: React.FC<AddProjectProps> = ({onClose, entryId, isActive, onClick}) => {
  const [createNewOpen, setOpen] = React.useState(false);
  const { data, isLoading } = useProjects();
  const update = useUpdateEntry();
  const updateActiveEntry = useUpdateActiveEntry();

  const onProjectClick = async(projectId: string) => {
    if(!entryId){ throw new Error('No Id')}
    if(onClick && !isActive){
      onClick(projectId);
      return;
    }
    if(isActive){
        updateActiveEntry.mutateAsync({
            id: entryId,
            projectId
        }) 
    } else {
        update.mutateAsync({
            id: entryId,
            projectId
        })
    }
    
    onClose()
}
if(!data || isLoading){
    return null
}
const onNewProject = () => {
    setOpen(true)
}
const onCloseCreateNew = () => {
    setOpen(false)
}
  return (
    <>
      <Box sx={{p:1, display: "flex", flexDirection: "column" }}>
        <TextField placeholder="Search a project" />
        <MenuList>
          {data.map((d) => (
            <MenuItem onClick={async () => onProjectClick(d.id)}>
              {d.name}
            </MenuItem>
          ))}
        </MenuList>
        <Button onClick={onNewProject}>Create new project</Button>
      </Box>
      <CreateNewProjectDialog open={createNewOpen} onClose={onCloseCreateNew} />
    </>
  );
};
