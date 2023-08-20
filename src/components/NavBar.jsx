import React from "react";
import {
  AppBar,
  Avatar,
  Grid,
  IconButton,
  Toolbar,
  Tooltip,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/MenuTwoTone";
// import ColorIcon from "@mui/icons-material/ColorLensOutlined";
import DarkIcon from "@mui/icons-material/DarkModeOutlined";
import LightIcon from "@mui/icons-material/LightModeOutlined";
// import { useLocation } from "react-router-dom";
// import tinycolor from "tinycolor2";

import { useDispatch } from "react-redux";
import { toggleMode } from "state/themeSlice";

const NavBar = ( { onDrawerToggle, window, user, sx } ) => {
  const { palette } = useTheme();
  // const location = useLocation();
  const dispatch = useDispatch();

  const changeThemeMode = () => dispatch( toggleMode() );

  // const changeThemeScheme = async () => {
  //   const randaomColors = tinycolor
  //     .random()
  //     .tetrad()
  //     .map((c) => c.toHexString());
  //   const payload = {
  //     baseColor: randaomColors[0],
  //     secondaryColor: randaomColors[1],
  //     tertiaryColor: randaomColors[2],
  //   };
  //   dispatch(setThemeColors(payload));
  // };

  const trigger = useScrollTrigger( {
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  } );

  return (
    <>
      <AppBar
        color={trigger ? "primary" : "default"}
        position="sticky"
        elevation={trigger ? 2 : 0}
      >
        <Toolbar>
          <Grid container spacing={1} alignItems="center">
            <Grid item sx={{ display: { md: "none", sm: "block" } }}>
              <IconButton color="inherit" edge="start" onClick={onDrawerToggle}>
                <MenuIcon />
              </IconButton>
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="inherit"
                sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}
              ></Typography>
            </Grid>

            <Grid item xs></Grid>
            {/* <Grid item>
              <Tooltip title="Change Color">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={changeThemeScheme}
                >
                  <ColorIcon />
                </IconButton>
              </Tooltip>
            </Grid> */}

            <Grid item>
              <Tooltip title="Switch Theme">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={changeThemeMode}
                >
                  {palette.mode === "light" ? <DarkIcon /> : <LightIcon />}
                </IconButton>
              </Tooltip>
            </Grid>

            <Grid item>
              <Tooltip title={user.name}>
                <IconButton color="inherit" sx={{ p: 0.5 }}>
                  <Avatar
                    alt="My Avatar"
                    sx={{
                      background: palette.secondaryContainer.contrastText,
                      width: 28,
                      height: 28,
                      fontSize: 16,
                    }}
                  >
                    {user.name
                      .split( " " )
                      .map( ( n ) => n.substring( 0, 1 ) )
                      .join( "" )}
                  </Avatar>
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>
      </AppBar>
    </>
  );
};

export default NavBar;
