import React, { useEffect, useState } from "react";
import { Dialog, DialogTitle, DialogContent, Button, Select, MenuItem, Typography } from "@mui/material";
import { AcitveEntryForm } from "./ActiveEntryForm";
import { AddEntry } from "./AddEntry";

export const ActiveEntryDialog: React.FC = () => {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCmdEnter =
        (isMac && e.metaKey && e.key === "Enter") ||
        (!isMac && e.ctrlKey && e.key === "Enter");
      if (isCmdEnter) {
        e.preventDefault();
      }
      const isCmdK = isMac
        ? e.metaKey && e.key.toLowerCase() === "k"
        : e.ctrlKey && e.key.toLowerCase() === "k";

      if (isCmdK) {
        e.preventDefault(); // prevent browser behavior
        setOpen(true);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, []);

  return (
    <Dialog open={open} onClose={() => setOpen(false)}>
        <AddEntry />
    </Dialog>
  );
};
