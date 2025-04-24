import React from "react";
import { MyEntries } from "./MyEntries";

import { NewEntry } from "../components/NewEntry";

export const Home: React.FC = () => {
    
  return (
    <>

      <NewEntry/>
      <MyEntries />
    </>
  );
};
