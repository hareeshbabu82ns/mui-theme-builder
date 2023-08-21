import React from "react";
import { Box, Stack, IconButton, useTheme } from "@mui/material";
import PropTypes from "prop-types";

// components
import Profile from "./Profile.js";
import { toggleMode } from "state/themeSlice";
// import { IconBellRinging, IconMenu } from '@tabler/icons';
import {
  DarkModeOutlined,
  Menu as IconMenu,
  LightModeOutlined,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { AppBarStyled, ToolbarStyled } from "../shared/logo/Logo.js";

const Header = (props) => {
  const dispatch = useDispatch();
  const theme = useTheme();

  const changeThemeMode = () => dispatch(toggleMode());
  // const lgUp = useMediaQuery((theme) => theme.breakpoints.up('lg'));
  // const lgDown = useMediaQuery((theme) => theme.breakpoints.down('lg'));

  return (
    <AppBarStyled position="sticky" color="default">
      <ToolbarStyled>
        <IconButton
          color="inherit"
          aria-label="menu"
          onClick={props.toggleMobileSidebar}
          sx={{
            display: {
              lg: "none",
              xs: "inline",
            },
          }}
        >
          <IconMenu width="20" height="20" />
        </IconButton>

        <Box flexGrow={1} />
        <Stack spacing={1} direction="row" alignItems="center">
          <IconButton onClick={changeThemeMode}>
            {theme.palette.isDark ? (
              <LightModeOutlined sx={{ fontSize: "25px" }} />
            ) : (
              <DarkModeOutlined sx={{ fontSize: "25px" }} />
            )}
          </IconButton>

          <Profile />
        </Stack>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

Header.propTypes = {
  sx: PropTypes.object,
};

export default Header;
