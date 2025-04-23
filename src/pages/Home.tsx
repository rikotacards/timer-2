import React from "react";
import { MyEntries } from "./MyEntries";
import { ActiveEntryDialog } from "../components/ActiveEntryDialog";

import { ActiveEntryRow } from "../components/ActiveEntryRow";

export const Home: React.FC = () => {
    
  return (
    <>

      <ActiveEntryRow/>
      <ActiveEntryDialog />
      <MyEntries />
    </>
  );
};
