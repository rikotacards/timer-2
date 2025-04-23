import React from "react";
import { useActiveEntries } from "../hooks/queries/useActiveEntry";
import {
  Box,
  Button,
  Card,
  CircularProgress,
  Skeleton,
  TextField,
  Typography,
} from "@mui/material";
import { useGetCategoryInfo } from "../hooks/utils/useGetCategoryInfo";
import { useGetProjectInfo } from "../hooks/utils/useGetProjectInfo";
import LabelIcon from "@mui/icons-material/Label";
import { useStopActiveEntry } from "../hooks/mutations/useStopActiveEntry";
export const ActiveEntryRow: React.FC = () => {
  const activeEntry = useActiveEntries();
  const ae = activeEntry?.data?.[0];
  const stop = useStopActiveEntry();
  const onStop = async() => {
    try {
        if(!ae?.id){
            throw new Error('no Id')
        }
        await stop.mutateAsync({
            id: ae.id,
            desc: ae.desc,
            startTime: ae.start_time,
            endTime: new Date(),
            projectId: ae.projectId,
            categoryId: ae.categoryId
        })
    } catch(e){
        console.log(e)
    }
  }
  const c = useGetCategoryInfo(ae?.categoryId);
  const p = useGetProjectInfo(ae?.categoryId);

  const [desc, setDesc] = React.useState(ae?.desc);


  if (activeEntry.isLoading) {
    return (
      <Skeleton height={60} width={300} variant="rectangular">
        <Box></Box>
      </Skeleton>
    );
  }

  const hasActiveEntry = !!activeEntry.data?.length;
  if (!hasActiveEntry) {
    return (
      <Card sx={{ p: 1, m: 1 }}>
        <Typography>Command + K to start activity</Typography>
      </Card>
    );
  }

  return (
    <Box sx={{ display: "flex", flexDirection: "row", alignItems: "center", m:1 }}>
        <CircularProgress sx={{mr:1}}  color='warning' />
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
        <Button sx={{textTransform: 'capitalize'}}>Add category</Button>
      )}
      {ae?.projectId ? (
        <Button>{p?.name}</Button>
      ) : (
        <Button sx={{textTransform: 'capitalize'}}>Add project</Button>
      )}
      <Button loading={stop.isPending} onClick={onStop} color="error">Stop</Button>
    </Box>
  );
};
