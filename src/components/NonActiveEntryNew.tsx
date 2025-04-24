import React from "react";
import { useActiveEntries } from "../hooks/queries/useActiveEntry";
import {
  Box,
  Button,
  Chip,
  Popover,
  Skeleton,
  TextField,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import { NonActiveChooseCategory } from "./NonActiveChooseCategory";
import { useInsertActiveEntry } from "../hooks/mutations/useStartEntry";
import { LabelImportant } from "@mui/icons-material";
import { ChooseProjectSimple } from "./ChooseProjectSimple";
export const NonActiveEntryNew: React.FC = () => {
  const activeEntry = useActiveEntries();
  const start = useInsertActiveEntry();
  const [nonActiveDesc, setNonActiveDesc] = React.useState("");
  const [dialogName, setDialogName] = React.useState("");
 
  const onStart = async () => {
    await start.mutate({
      description: nonActiveDesc,
      categoryId: selectedCategoryId,
      projectId: selectedCategoryId,
    });
  };
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
  const [selectedCategoryId, setSelectedCategoryId] =
    React.useState<string>("");
  const [selectedProjectId, setSelectedProjectId] = React.useState<
    string
  >("");
  const elId = open ? "simple-popover" : undefined;
  const cc = useGetCategoryInfo(selectedCategoryId || "");
  const pp = useGetProjectInfo(selectedProjectId || "");

  const onProjectIdChange = (id: string) => {
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

  return (
    <Box>
      <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center" }}>
        <TextField
          value={nonActiveDesc}
          onChange={(e) => setNonActiveDesc(e.target.value)}
          label="Description"
        />
        {selectedCategoryId ? (
          <Button
            name="category"
            onClick={handleClick}
            startIcon={<LabelImportant sx={{ color: cc?.color }} />}
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
            <AddIcon fontSize="small" /> category
          </Button>
        )}
        {selectedProjectId ? (
          <Chip
            component={Button}
            name="project"
            onClick={handleClick}
            label={pp?.name}
            sx={{ color: pp?.color, ml: 1, mr: 1, textTransform: "capitalize" }}
          />
        ) : (
          <Button
            name="project"
            onClick={handleClick}
            sx={{ textTransform: "capitalize" }}
          >
            <AddIcon fontSize="small" />
            Project
          </Button>
        )}
        <Button onClick={onStart} loading={start.isPending} color="success">
          Start
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
              selectedCategoryId={selectedCategoryId}
              onChange={onCategoryIdChange}
              onBack={handleClose}
            />
          )}
          {dialogName === "project" && (
            <ChooseProjectSimple
              selectedProjectId={selectedProjectId}
              onChange={onProjectIdChange}
              onBack={handleClose}
            />
          )}
        </Popover>
      </Box>
    </Box>
  );
};
