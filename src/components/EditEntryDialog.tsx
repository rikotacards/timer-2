import {
  Box,
  Button,
  Dialog,
  DialogTitle,
  IconButton,
  TextField,
  Typography,
} from "@mui/material";
import React from "react";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import CloseIcon from "@mui/icons-material/Close";
import { useUpdateEntry } from "../hooks/mutations/useUpdateEntry";
import dayjs, { Dayjs } from "dayjs";
import { AddCategory } from "./AddCategory";
import { IEntry } from "../types";
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
  const [pageName, setPageName] = React.useState("");

  const goCategory = () => {
    setPageName("category");
  };
  const [end, setEnd] = React.useState<Dayjs | null>(dayjs(entry.endTime));
  const [desc, setDesc] = React.useState(entry.desc);
  const update = useUpdateEntry();
  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };
  const onCancel = () => {
    setPageName("");
  };
  const onSave = async () => {
    await update.mutateAsync({
      id: entry.id,
      description: desc,
      startTime: start,
      endTime: end,
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
      {pageName === "" && (
        <Box sx={{ p: 1, display: "flex", flexDirection: "column" }}>
          <Typography>Desc</Typography>
          <TextField onChange={onChange} value={desc} />
          <Typography>Start time</Typography>
          <DateTimePicker onChange={(v) => setStart(v)} value={start} />
          <Typography>End time</Typography>
          <DateTimePicker onChange={(v) => setEnd(v)} value={end} />
          <Typography>Category</Typography>
          <Typography>{entry.category}</Typography>
          <Button onClick={goCategory}>Add category</Button>
        </Box>
      )}
      {pageName === "category" && (
        <AddCategory
          id={entry.id}
          categoryId={entry.category}
          onCancel={onCancel}
        />
      )}
      <Button onClick={onClose}>Cancel</Button>
      <Button onClick={onSave}>Save</Button>
    </Dialog>
  );
};
