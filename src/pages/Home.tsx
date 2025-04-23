import React from "react";
import { MyEntries } from "./MyEntries";
import { ActiveEntryDialog } from "../components/ActiveEntryDialog";
import { AcitveEntryForm } from "../components/ActiveEntryForm";
import { AddEntry } from "../components/AddEntry";
import { Card, Typography } from "@mui/material";
import { ActiveEntryRow } from "../components/ActiveEntryRow";

export const Home: React.FC = () => {
    
  return (
    <>
      {/* <AcitveEntryForm /> */}
      {/* <AddEntry/> */}
      <ActiveEntryRow/>
      <ActiveEntryDialog />
      <MyEntries />
    </>
  );
};
