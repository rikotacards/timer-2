import { AppBar, IconButton, Toolbar, Typography } from "@mui/material";
import React from "react";
import MenuIcon from "@mui/icons-material/Menu";
import { useNavigate } from "react-router-dom";
interface ILayout {
  children: React.ReactNode;
}
const routes = [
  {
    name: "home",
    path: "/",
  },
  { name: "analytics", path: "/analytics" },
  { name: "Categories", path: "/categories" },
  { name: "Projects", path: "/projects" },
];
export const Layout: React.FC<ILayout> = ({ children }) => {
  const nav = useNavigate();

  return (
    <>
      <AppBar elevation={0} variant="outlined">
        <Toolbar>
          <IconButton sx={{ mr: 2 }}>
            <MenuIcon />
          </IconButton>
          {routes.map((r) => (
            <Typography
            key={r.name}
              sx={{
                cursor: "pointer",
                textDecoration: "none",
                textTransform: "capitalize",
                mr: 2,
              }}
              onClick={() => nav(r.path)}
            >
              {r.name}
            </Typography>
          ))}
        </Toolbar>
      </AppBar>
      <Toolbar />

      {children}
    </>
  );
};
