import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateEntry } from "../hooks/mutations/useUpdateEntry";
import dayjs, { Dayjs } from "dayjs";
import { IEntry } from "../types";
import { useCategories } from "../hooks/queries/useCategories";
import { useProjects } from "../hooks/queries/useProjects";
import { MoreHoriz } from "@mui/icons-material";
interface EditEntryDialogProps {
  open: boolean;
  onClose: () => void;
  entry: IEntry;
}
export const EditEntryDialog: React.FC<EditEntryDialogProps> = ({
  open,
  onClose,
  entry,
}) => {
  const [start, setStart] = React.useState<Dayjs | null>(
    dayjs(entry.startTime)
  );
  console.log("ww", entry);
  const [categoryId, setCategoryId] = React.useState(entry.category);
  const [projectId, setProjectId] = React.useState(entry.projectId);
  const categories = useCategories();
  const projects = useProjects();
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs(entry.endTime));
  const [desc, setDesc] = React.useState(entry.desc);
  const update = useUpdateEntry();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onSave = async () => {
    await update.mutateAsync({
      id: entry.id,
      description: desc,
      startTime: start,
      endTime: end,
      category: categoryId,
      projectId: projectId,
    });
    onClose();
  };
  return (
    <Dialog onClose={onClose} open={open}>
      <DialogTitle sx={{ display: "flex", alignItems: "center" }}>
        Edit Entry
        <Box sx={{ ml: "auto" }}>
          <IconButton size="small" onClick={onClose}>
            <CloseIcon fontSize="small" />
          </IconButton>
        </Box>
      </DialogTitle>

      <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
        <Typography sx={{ mb: 1 }} variant="body2">
          Description
        </Typography>
        <TextField sx={{ mb: 2 }} onChange={onChange} value={desc} />
        <Typography sx={{ mb: 1 }} variant="body2">
          Start time
        </Typography>
        <DateTimePicker
          sx={{ mb: 2 }}
          onChange={(v) => setStart(v)}
          value={start}
        />
        <Typography sx={{ mb: 1 }} variant="body2">
          End time
        </Typography>
        <DateTimePicker
          sx={{ mb: 2 }}
          onChange={(v) => setEnd(v)}
          value={end}
        />
        <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center'}}>
          <Typography sx={{ mb: 1 }} variant="body2">
            Category
          </Typography>
          <Box sx={{ml:'auto'}}>

          <MoreHoriz/>
          </Box>
        </Box>
        <Select
          value={categoryId}
          sx={{ mb: 2 }}
          onChange={(e) => setCategoryId(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {categories.data?.map((c) => (
            <MenuItem value={c.id}>{c.name}</MenuItem>
          ))}
        </Select>
        <Typography sx={{ mb: 1 }} variant="body2">
          Project
        </Typography>
        <Select
          value={projectId}
          onChange={(e) => setProjectId(e.target.value)}
        >
          <MenuItem value="">None</MenuItem>
          {projects.data?.map((c) => (
            <MenuItem value={c.id}>{c.name}</MenuItem>
          ))}
        </Select>
      </Box>

      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </Dialog>
  );
};
