import React from "react";
import { MenuAppBar } from "../nav";
import { Box, CssBaseline, Drawer, Toolbar } from "@mui/material";

export const Layout = ({children}) => {
  return (
    <div>
      <CssBaseline />
      <MenuAppBar />
      {children}
    </div>
  );
};
