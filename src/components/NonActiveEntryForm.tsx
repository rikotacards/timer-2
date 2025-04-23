import { Box, Button, DialogTitle, TextField } from "@mui/material";
import React from "react";
import { NonActiveChooseCategory } from "./NonActiveChooseCategory";
import { ChooseProject } from "./ChooseProject";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import { useInsertActiveEntry } from "../hooks/mutations/useStartEntry";

export const NonActiveEntryForm: React.FC = () => {
  const [desc, setDesc] = React.useState("");
  const start = useInsertActiveEntry();
  const [selectedProjectId, setSelectedProjectId] = React.useState("");
  const [selectedCategoryId, setSelectedCategoryId] = React.useState("");
  const [isStart, setIsStart] = React.useState(false);
  const onCategoryIdChange = (id: string) => {
    setSelectedCategoryId(id);
    setIndex(0);
  };
  const onProjectIdChange = (id: string | null) => {
    setSelectedProjectId(id);
    setIndex(0);
  };
  const categoryName = useGetCategoryInfo(selectedCategoryId)?.name;
  const projectName = useGetProjectInfo(selectedProjectId)?.name;
  const onStart = async() => {
    setIsStart(true);
    await start.mutateAsync({
        description: desc,
        categoryId: selectedCategoryId,
        projectId: selectedProjectId
    })
    setIsStart(false);
  };
  const [index, setIndex] = React.useState(0);
  return (
    <Box sx={{ p: 1, display: "flex", flexDirection: "column", minWidth: 300 }}>
      {index === 0 && (
        <>
          <DialogTitle variant="h6">Activity</DialogTitle>
          <TextField
            autoFocus
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            placeholder="Description"
            sx={{ mb: 2 }}
          />
          <Button onClick={() => setIndex(1)}>
            {selectedCategoryId ? categoryName : "Add Category"}
          </Button>
          <Button onClick={() => setIndex(2)}>
            {selectedProjectId ? projectName : "Add Project"}
          </Button>
          <Button loading={isStart} onClick={onStart} color="success">
            Start
          </Button>
        </>
      )}
      {index === 1 && (
        <NonActiveChooseCategory
          onChange={onCategoryIdChange}
          selectedCategoryId={selectedCategoryId}
          onBack={() => setIndex(0)}
        />
      )}
      {index === 2 && (
        <ChooseProject
          onBack={() => setIndex(0)}
          onChange={onProjectIdChange}
          selectedProjectId={selectedProjectId}
        />
      )}
    </Box>
  );
};
