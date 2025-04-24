import React from "react";
import { useCategories } from "../hooks/queries/useCategories";
import {
  Box,
  Button,
  Card,
  Dialog,
  LinearProgress,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { EditProject } from "../components/EditProject";
import { ConfirmationDialog } from "../components/ConfirmationDialog";
import { useDeleteCategory } from "../hooks/mutations/useDeleteCategory";
interface CategoryRowProps {
  name: string;
  color: string;
  id: string;
}
const CategoryRow: React.FC<CategoryRowProps> = ({ name, color, id }) => {
  const [dName, setDName] = React.useState("");
  const deleteCategory = useDeleteCategory();
  const onDelete = async () => {
    try {
      deleteCategory.mutateAsync({
        id,
      });
    } catch (e) {
      console.log(e);
    }
  };
  const onClick = (name: string) => {
    setDName(name);
  };
  const onClose = () => {
    setDName("");
  };
  return (
    <>
      <TableRow>
        <TableCell>
          <Typography fontWeight={'bold'} variant='body2' sx={{ color: color }}>{name}</Typography>
        </TableCell>
        <TableCell align="right">
          <Button
            onClick={() => onClick("edit")}
            sx={{ ml: "auto", mr: 1, textTransform: 'capitalize' }}
            variant="outlined"
            size="small"
          >
            edit
          </Button>
          <Button
            onClick={() => onClick("delete")}
            variant="outlined"
            color="error"
            size="small"
            sx={{textTransform: 'capitalize'}}
          >
            delete
          </Button>
        </TableCell>
        <Dialog open={dName === "edit"} onClose={onClose}>
          <EditProject onSuccess={onClose} project={{ name, id, color }} isCategory />
        </Dialog>
        <ConfirmationDialog
          open={dName === "delete"}
          onClose={() => setDName("")}
          title={"Delete Category"}
          text="Once deleted, the information cannot be recovered."
          submitName="Delete"
          submitFn={onDelete}
          buttonProps={{ color: "error" }}
        />
      </TableRow>
    </>
  );
};

export const Categories: React.FC = () => {
  const { data, isLoading } = useCategories();
  const [open, setOpen] = React.useState(false);
  if (isLoading) {
    return <LinearProgress />;
  }
  const onClick = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Box>
      <Box
        sx={{
          mb: 1,
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
        }}
      >
        <Button
          sx={{ ml: "auto", textTransform: "capitalize", fontWeight: "bold" }}
          color="success"
          variant="contained"
          onClick={onClick}
        >
          New Category
        </Button>
      </Box>
      <Card sx={{ p: 2, mb: 1 }} variant="outlined">
        <Typography color="textSecondary">
          Categories are a way to help you group and identify activities. For
          example "Exercise"
        </Typography>
      </Card>
      <TableContainer variant="outlined" component={Paper}>
        <Table>
          <TableHead component={Paper}>
            <TableRow>
              <TableCell>Name</TableCell>
              <TableCell align="right"></TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {data?.map((r) => (
              <CategoryRow key={r.id} name={r.name} color={r.color} id={r.id} />
            ))}
          </TableBody>
        </Table>
      </TableContainer>
      <Dialog open={open} onClose={onClose}>
        <EditProject onSuccess={onClose} isCategory />
      </Dialog>
    </Box>
  );
};
