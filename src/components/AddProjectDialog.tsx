import { Dialog, DialogTitle } from "@mui/material";
import React from "react";
import { useProjects } from "../hooks/queries/useProjects";
import { IEntry } from "../types";
import { AddProject } from "./AddProject";
interface AddProjectDialogProps {
  open: boolean;
  onClose: () => void;
  entry: Omit<IEntry, "desc" | "startTime" | "endTime">;
  isActive?: boolean;
}
export const AddProjectDialog: React.FC<AddProjectDialogProps> = ({
  isActive,
  open,
  onClose,
  entry,
}) => {
  const { data, isLoading } = useProjects();

  if (!data || isLoading) {
    return null;
  }

  return (
    <Dialog open={open} onClose={onClose}>
      <DialogTitle>Add Project</DialogTitle>
      <AddProject onClose={onClose} isActive={isActive} entryId={entry.id} />
    </Dialog>
  );
};
