import { Dialog } from "@mui/material";
import React from "react";
import { EditEntry } from "./EditEntry";
import { IEntry } from "../types";
import { ChooseProject } from "./ChooseProject";
import { EditProjects } from "./EditProjects";
import { EditCategories } from "./EditCategories";
interface DialogWithNavigationProps {
  open: boolean;
  onClose: () => void;
  entry: IEntry;
}
export const DialogWithNavigation: React.FC<DialogWithNavigationProps> = ({
  open,
  onClose,
  entry,
}) => {
  const [page, setPage] = React.useState(0);
  const onPageChange = (index: number) => {
    setPage(index);
  };
  React.useEffect(() => {
    setPage(0)
  },[open])
  return (
    <Dialog open={open} onClose={onClose}>
      {page === 0 && (
        <EditEntry
          onPageChange={onPageChange}
          onClose={onClose}
          entry={entry}
        />
      )}
      {page === 1 && (
        <EditCategories
          onBack={() => onPageChange(0)}
        />
      )}
      {page === 2 && (
        <EditProjects
          onBack={() => onPageChange(0)}
        />
      )}
    </Dialog>
  );
};
