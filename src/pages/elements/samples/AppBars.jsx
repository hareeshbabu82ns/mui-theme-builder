import React from "react";
import {
  AppBar,
  Box,
  Button,
  IconButton,
  Stack,
  Toolbar,
  Typography,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

function appBarLabel(label) {
  return (
    <Toolbar>
      <IconButton edge="start" color="inherit" aria-label="menu" sx={{ mr: 2 }}>
        <MenuIcon />
      </IconButton>
      <Typography variant="h6" noWrap component="div" sx={{ flexGrow: 1 }}>
        {label}
      </Typography>
    </Toolbar>
  );
}

const AppBars = () => {
  return (
    <Stack gap={2} sx={{ flexGrow: 1 }}>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Appbars
      </Typography>

      <Typography variant="h6">Default</Typography>
      <AppBar position="static" color="default">
        {appBarLabel("Default")}
      </AppBar>

      <Typography variant="h6">Primary</Typography>
      <AppBar position="static" color="primary">
        {appBarLabel("Primary")}
      </AppBar>
    </Stack>
  );
};

export default AppBars;
