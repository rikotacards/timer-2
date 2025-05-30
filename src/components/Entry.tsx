import {
  Avatar,
  Box,
  Button,
  Chip,
  IconButton,
  Paper,
  Popover,
  Typography,
} from "@mui/material";
import React from "react";
import { getDuration } from "../utils/getDuration";
import { useDeleteEntry } from "../hooks/mutations/useDeleteEntry";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import {  MoreVert } from "@mui/icons-material";
import { StartEndDisplay } from "./StartEndDisplay";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import { ConfirmationDialog } from "./ConfirmationDialog";
import { DurationDisplay } from "./DurationDisplay";
import { IEntry } from "../types";
import { useNavigate } from "react-router-dom";
import { DialogWithNavigation } from "./DialogWithNavigation";

export const Entry: React.FC<IEntry> = ({
  desc,
  startTime,
  endTime,
  id,
  categoryId,
  projectId,
}) => {
  const nav = useNavigate();
  const deleteEntry = useDeleteEntry();
  const [deleteDialogOpen, setOnDelete] = React.useState(false);
  const onDeleteClick = () => {
    setOnDelete(true);
  };
  const onDeleteEntry = async () => {
    try {
      await deleteEntry.mutateAsync({
        id,
      });
      setOnDelete(false);
    } catch (e) {
      console.log(e);
    }
  };
  const [dialogName, setDialogName] = React.useState("");

  const onEdit = () => {
    setDialogName("edit");
  };
  const { hours, minutes, seconds } = getDuration(startTime, endTime);
  const hoursDecimal = Math.round((hours + minutes / 60) * 10) / 10;
  const categoryName = useGetCategoryInfo(categoryId);
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(
    null
  );

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const elId = open ? "simple-popover" : undefined;
  const project = useGetProjectInfo(projectId);
  const onProjectClick = () => {
    nav(`/analytics`, { state: { projectId: project?.id } });
  };
  return (
    <Box
      sx={{ mb: 2, maxWidth: "500px", display: "flex", alignItems: "center" }}
    >
      <Box sx={{ mr: 3 }}>
        {hours > 0 && (
          <Avatar elevation={10} component={Paper}>
            <Typography
              fontWeight={"bold"}
              variant="caption"
            >{`${hoursDecimal}`}</Typography>
            <Typography variant="caption">hr</Typography>
          </Avatar>
        )}
        {hours <= 0 && minutes >= 0 && (
          <Avatar
            component={Paper}
            elevation={10}
            sx={{
              display: "flex",
              flexDirection: "row",
              justifyContent: "center",
            }}
          >
            <Typography
              fontWeight={"bold"}
              variant="caption"
            >{`${minutes}`}</Typography>
            <Typography variant="caption">m</Typography>
          </Avatar>
        )}
      </Box>
      <Box
        sx={{
          borderLeft: `3px solid ${categoryName?.color}`,
          width: "100%",
          display: "flex",
          flexDirection: "column",
          pl: 2,
        }}
      >
        <Box
          sx={{ display: "flex", flexDirection: "row", alignItems: "baseline" }}
        >
          <Box>
            {!categoryName && (
              <Typography color="textSecondary" variant="caption">
                + category
              </Typography>
            )}
            {categoryName && (
              <Box
                sx={{
                  display: "flex",
                  flexDirection: "row",
                  alignItems: "center",
                }}
              >
                {/* <LabelImportant
                  sx={{ mr: 1, color: categoryName.color }}
                  fontSize="small"
                /> */}
                <Typography
                  sx={{
                    textTransform: "capitalize",
                    color: categoryName.color,
                  }}
                  variant="body2"
                  fontWeight={"bold"}
                >
                  {categoryName.name}
                </Typography>
              </Box>
            )}
            <Typography variant="body2" fontWeight={"600"}>
              {desc || "No desc"}
            </Typography>
          </Box>
          <Box sx={{ ml: "auto" }}>
            <StartEndDisplay startTime={startTime} endTime={endTime} />
          </Box>
        </Box>

        <DurationDisplay hours={hours} minutes={minutes} seconds={seconds} />
        <Box>
          {project && (
            <Chip
              sx={{ color: project?.color }}
              size="small"
              onClick={onProjectClick}
              label={`${project?.name}`}
            />
          )}
        </Box>
      </Box>
      <DialogWithNavigation
        open={dialogName === "edit"}
        onClose={() => setDialogName("")}
        entry={{ desc, startTime, endTime, id, categoryId, projectId }}
      />
      <ConfirmationDialog
        open={deleteDialogOpen}
        onClose={() => setOnDelete(false)}
        title={"Delete Entry"}
        text="Once deleted, the information cannot be recovered."
        submitName="Delete"
        submitFn={onDeleteEntry}
        buttonProps={{ color: "error" }}
      />
      <IconButton onClick={handleClick}>
        <MoreVert />
      </IconButton>
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
        <Box flexDirection={"column"} display="flex">
          <Button onClick={onEdit}>Edit</Button>

          <Button onClick={onDeleteClick} color="error">
            Delete
          </Button>
        </Box>
      </Popover>
    </Box>
  );
};
