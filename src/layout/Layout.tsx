import { AppBar, Box, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
interface ILayout {
  children: React.ReactNode;
}
export const Layout: React.FC<ILayout> = ({ children }) => {
  const nav = useNavigate();

  return (
    <>
      <AppBar elevation={0} variant="outlined">
        <Toolbar>
          <IconButton sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          <Typography
            sx={{
              cursor: "pointer",
              textDecoration: "none",
              textTransform: "capitalize",
            }}
            onClick={() => nav("/")}
          >
            Home
          </Typography>
          <Box sx={{ ml: 2 }}>
            <Typography
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                textTransform: "capitalize",
              }}
              onClick={() => nav("/analytics")}
            >
              Analytics
            </Typography>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />

      {children}
    </>
  );
};
