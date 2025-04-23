import { Box, Button, Chip, TextField, Typography } from "@mui/material";
import React from "react";
import { useStopActiveEntry } from "../hooks/mutations/useStopActiveEntry";
import { useActiveEntries } from "../hooks/queries/useActiveEntry";
import { useInsertActiveEntry } from "../hooks/mutations/useStartEntry";
import { useUpdateActiveEntry } from "../hooks/mutations/useUpdateActiveEntry";
import { AddProjectDialog } from "./AddProjectDialog";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
export const AcitveEntryForm = () => {
  const stop = useStopActiveEntry();
  const start = useInsertActiveEntry();
  const activeEntry = useActiveEntries();
  const updateActiveEntry = useUpdateActiveEntry();
  const [desc, setDesc] = React.useState(activeEntry.data?.[0]?.desc || '');
  const [dialogName, setDialogName] = React.useState("");

  React.useEffect(() => {
    const toggleTimer = () => {
      if (activeEntry.data && activeEntry.data?.length) {
        const onStop = async (id: string, desc: string, startTime: string) => {
          await stop.mutate({
            id: id,
            desc: desc,
            startTime,
            endTime: new Date(),
          });
          setDesc("");
        };
        onStop(
          activeEntry.data[0].id,
          activeEntry.data[0].desc || "",
          activeEntry.data[0].start_time
        );
      } else {
        console.log("hi");
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      const isMac = navigator.platform.toUpperCase().includes("MAC");
      const isCmdEnter =
        (isMac && e.metaKey && e.key === "Enter") ||
        (!isMac && e.ctrlKey && e.key === "Enter");
      if (isCmdEnter) {
        e.preventDefault();
        toggleTimer();
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeEntry.data, stop]);
  const projectName = useGetProjectInfo(activeEntry.data?.[0]?.projectId || "");

  if (activeEntry.isLoading || !activeEntry.data) {
    return null;
  }

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setDesc(e.target.value);
  };

  const onUpdate = ({ id, desc }: { id: string; desc?: string }) => {
    updateActiveEntry.mutate({
      id,
      description: desc || "",
    });
  };

  const onStop = async (id: string, desc: string, startTime: string) => {
    await stop.mutate({
      id: id,
      desc: desc,
      startTime,
      endTime: new Date(),
    });
    setDesc("");
  };
  const hasActiveEntry = !!activeEntry.data.length;
  if (hasActiveEntry) {
    const entry = activeEntry.data[0];
    return (
      <Box>
        <Box sx={{ display: "flex", alignItems: "center" }}>
          <TextField
            size="small"
            onChange={onChange}
            onKeyDown={(e) =>
              e.key === "Enter" ? onUpdate({ id: entry.id, desc: desc }) : null
            }
            value={desc}
          />

          {entry.projectId ? (
            <Chip
              sx={{ ml: 1, mr: 1 }}
              size="small"
              label={projectName?.name}
            />
          ) : (
            <Button
              onClick={() => setDialogName("addProject")}
              sx={{ textTransform: "capitalize" }}
              size="small"
            >
              Add Project
            </Button>
          )}
          <Button sx={{ textTransform: "capitalize" }} size="small">
            Category
          </Button>
          <Typography>
            {new Date(entry.start_time).toLocaleTimeString()}
          </Typography>
          <Button
            variant="outlined"
            sx={{ ml: 1 }}
            color="error"
            onClick={() => onStop(entry.id, entry.desc || "", entry.created_at)}
          >
            stop
          </Button>
          <AddProjectDialog
            isActive={true}
            open={dialogName === "addProject"}
            onClose={() => setDialogName("")}
            entry={{ id: entry.id }}
          />
        </Box>
      </Box>
    );
  }
  return (
    <Box sx={{ p: 1 }}>
      <TextField
        autoFocus
        onKeyDown={(e) =>
          e.key === "Enter" && start.mutate({ description: desc })
        }
        onChange={onChange}
        value={desc}
        variant="outlined"
        size="small"
        placeholder="Desc"
      />
      <Button sx={{ textTransform: "capitalize" }} size="small">
        Add Project
      </Button>
      <Button sx={{ textTransform: "capitalize" }} size="small">
        Category
      </Button>
      <Button
        variant="outlined"
        color="success"
        onClick={() =>
          start.mutate({
            description: desc,
          })
        }
      >
        start
      </Button>
    </Box>
  );
};
