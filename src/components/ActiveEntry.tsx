import React from "react";
import { NonActiveChooseCategory } from "./NonActiveChooseCategory";
import { LabelImportant } from "@mui/icons-material";
import {
  Box,
  TextField,
  Button,
  Chip,
  Popover,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useStopActiveEntry } from "../hooks/mutations/useStopActiveEntry";

import { Entry } from "../hooks/queries/useEntries";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import { useUpdateActiveEntry } from "../hooks/mutations/useUpdateActiveEntry";
import { ChooseProjectSimple } from "./ChooseProjectSimple";
interface ActiveEntryProps {
  entry: Omit<Entry, "end_time">;
}
export const ActiveEntry: React.FC<ActiveEntryProps> = ({ entry }) => {
  const [desc, setDesc] = React.useState(entry.desc);
  const [categoryId, setSelectedCategoryId] = React.useState<string>(
    entry.categoryId || ""
  );
  const [projectId, setSelectedProjectId] = React.useState<string>(
    entry.projectId || ""
  );
  const c = useGetCategoryInfo(entry.categoryId);
  const p = useGetProjectInfo(entry.projectId);
  const update = useUpdateActiveEntry();
  const [dialogName, setDialogName] = React.useState("");
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );
  const stop = useStopActiveEntry();
  const onStop = async () => {
    try {
      stop.mutate({
        id: entry.id,
        desc: entry.desc,
        startTime: entry.start_time,
        endTime: new Date(),
        projectId: entry.projectId,
        categoryId: entry.categoryId,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setDialogName(event.currentTarget.name);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);

  const elId = open ? "simple-popover" : undefined;
  const onProjectIdChange = (id: string | null) => {
    console.log("hi", id);
    if (!id) {
      return;
    }
    setSelectedProjectId(id);
    update.mutate({ id: entry.id, projectId: id });

    handleClose();
  };
  const onCategoryIdChange = (id: string) => {
    setSelectedCategoryId(id);
    update.mutate({ id: entry.id, categoryId: id });

    handleClose();
  };
  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", m: 1 }}
    >
     
      <TextField
        label="Description"
        value={desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        size="small"
      />
      {entry.categoryId ? (
        <Box sx={{display: 'flex', flexDirection: 'column'}}>
          <Button
            startIcon={<LabelImportant sx={{ color: c?.color }} />}
            name="category"
            onClick={handleClick}
            sx={{ ml: 1, mr: 1, textTransform: "capitalize" }}
          >
            {c?.name}
          </Button>
        </Box>
      ) : (
        <Button
          name="category"
          onClick={handleClick}
          sx={{ textTransform: "capitalize" }}
        >
          <AddIcon /> category
        </Button>
      )}
      {entry?.projectId ? (
        <Button name="project" onClick={handleClick}>
          {<Chip sx={{textTransform: 'capitalize'}} size="small" label={p?.name} />}
        </Button>
      ) : (
        <Button
          name="project"
          onClick={handleClick}
          sx={{ textTransform: "capitalize" }}
        >
          <AddIcon /> project
        </Button>
      )}
      <Button loading={stop.isPending} onClick={onStop} color="error">
        Stop
      </Button>
      <Popover
        id={elId}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "left",
        }}
      >
        {dialogName === "category" && (
          <NonActiveChooseCategory
            selectedCategoryId={categoryId}
            onChange={onCategoryIdChange}
            onBack={handleClose}
          />
        )}
        {dialogName === "project" && (
          <ChooseProjectSimple
            selectedProjectId={projectId}
            onChange={onProjectIdChange}
            onBack={handleClose}
          />
        )}
      </Popover>
    </Box>
  );
};
