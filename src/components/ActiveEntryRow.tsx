import React from "react";
import { useActiveEntries } from "../hooks/queries/useActiveEntry";
import {
  Box,
  Button,
  CircularProgress,
  Popover,
  Skeleton,
  TextField,
} from "@mui/material";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import LabelIcon from "@mui/icons-material/Label";
import { useStopActiveEntry } from "../hooks/mutations/useStopActiveEntry";
import { NonActiveChooseCategory } from "./NonActiveChooseCategory";
import { ChooseProject } from "./ChooseProject";
import { useInsertActiveEntry } from "../hooks/mutations/useStartEntry";
export const ActiveEntryRow: React.FC = () => {
  const activeEntry = useActiveEntries();
  const ae = activeEntry?.data?.[0];
  const start = useInsertActiveEntry();
  const stop = useStopActiveEntry();
  const [nonActiveDesc, setNonActiveDesc] = React.useState("")
  const [dialogName, setDialogName] = React.useState("");
  const onStop = async () => {
    try {
      if (!ae?.id) {
        throw new Error("no Id");
      }
      stop.mutate({
        id: ae.id,
        desc: ae.desc,
        startTime: ae.start_time,
        endTime: new Date(),
        projectId: ae.projectId,
        categoryId: ae.categoryId,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onStart = async() => {
    await start.mutate({
      description: nonActiveDesc, 
      categoryId: selectedCategoryId,
      projectId: selectedCategoryId
    })
  }
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
    setDialogName(event.currentTarget.name);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const [selectedCategoryId, setSelectedCategoryId] = React.useState<
    string 
  >("");
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string  | null
  >("");
  const elId = open ? "simple-popover" : undefined;
  const c = useGetCategoryInfo(ae?.categoryId);
  const cc = useGetCategoryInfo(selectedCategoryId || "");
  const p = useGetProjectInfo(ae?.categoryId);
  const pp = useGetProjectInfo(selectedProjectId || "");


  const [desc, setDesc] = React.useState(ae?.desc);
  const onProjectIdChange = (id: string | null) => {
    setSelectedProjectId(id);
    handleClose();
  };
  const onCategoryIdChange = (id: string) => {
    setSelectedCategoryId(id);
    handleClose();
  };
  if (activeEntry.isLoading) {
    return (
      <Skeleton height={60} width={300} variant="rectangular">
        <Box></Box>
      </Skeleton>
    );
  }

  const hasActiveEntry = !!activeEntry.data?.length;
  console.log("HAS", hasActiveEntry)
  if (!hasActiveEntry) {
    return (
      <Box sx={{ display: "flex" }}>
        <TextField value={nonActiveDesc} onChange={(e) => setNonActiveDesc(e.target.value)} label='Description' />
        {selectedCategoryId ? (
          <Button
          name='category'
            onClick={handleClick}
            startIcon={<LabelIcon />}
            sx={{ ml: 1, mr: 1, textTransform: "capitalize" }}
          >
            {cc?.name}
          </Button>
        ) : (
          <Button
            name="category"
            onClick={handleClick}
            sx={{ textTransform: "capitalize" }}
          >
            Add category
          </Button>
        )}
       {selectedProjectId ? (
          <Button
          name='project'
            onClick={handleClick}
            startIcon={<LabelIcon />}
            sx={{ ml: 1, mr: 1, textTransform: "capitalize" }}
          >
            {pp?.name}
          </Button>
        ) : (
          <Button
            name="project"
            onClick={handleClick}
            sx={{ textTransform: "capitalize" }}
          >
            Add project
          </Button>
        )}
        <Button onClick={onStart} loading={start.isPending} color="success">Start</Button>
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
              selectedCategoryId={selectedCategoryId}
              onChange={onCategoryIdChange}
              onBack={handleClose}
            />
          )}
          {dialogName === "project" && (
            <ChooseProject
              selectedProjectId={selectedProjectId}
              onChange={onProjectIdChange}
              onBack={handleClose}
            />
          )}
        </Popover>
      </Box>
    );
  }

  return (
    <Box
      sx={{ display: "flex", flexDirection: "row", alignItems: "center", m: 1 }}
    >
      <CircularProgress sx={{ mr: 1 }} color="warning" />
      <TextField
        value={desc || ae?.desc}
        onChange={(e) => {
          setDesc(e.target.value);
        }}
        size="small"
      />
      {ae?.categoryId ? (
        <Button
          startIcon={<LabelIcon />}
          sx={{ ml: 1, mr: 1, textTransform: "capitalize" }}
        >
          {c?.name}
        </Button>
      ) : (
        <Button sx={{ textTransform: "capitalize" }}>Add category</Button>
      )}
      {ae?.projectId ? (
        <Button>{p?.name}</Button>
      ) : (
        <Button sx={{ textTransform: "capitalize" }}>Add project</Button>
      )}
      <Button loading={stop.isPending} onClick={onStop} color="error">
        Stop
      </Button>
    </Box>
  );
};
