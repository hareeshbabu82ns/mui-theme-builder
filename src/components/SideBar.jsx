import {
  AppBar,
  Box,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
import { useState, useEffect } from "react";

import ColorsIcon from "@mui/icons-material/ColorLensOutlined";
import ComponentsIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import CodeIcon from "@mui/icons-material/CodeOutlined";
import ThemeIcon from "@mui/icons-material/ColorizeOutlined";
import SignInIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/Password";

import { Link, useLocation } from "react-router-dom";
import muiLogo from "assets/mui.svg";

const SideBar = (props) => {
  const { user, sx, window, open, ...others } = props;

  const theme = useTheme();

  const location = useLocation();

  const [selectedIndex, setSelectedIndex] = useState(
    location.pathname.replace("/", "")
  );

  const trigger = useScrollTrigger({
    disableHysteresis: true,
    threshold: 0,
    target: window ? window() : undefined,
  });

  useEffect(() => {
    setSelectedIndex(location.pathname.replace("/", ""));
  }, [location.pathname]);

  const handleListItemClick = (event, index) => {
    setSelectedIndex(index);
  };

  return (
    <Drawer variant="permanent" {...others} sx={sx} open={open}>
      <AppBar
        color={trigger ? "primary" : "default"}
        position="sticky"
        elevation={trigger ? 2 : open ? 2 : 0}
      >
        <Toolbar sx={{ alignItems: "center" }}>
          <img src={muiLogo} alt="MUI Logo" />
          <Box sx={{ width: 16 }} />
          <Typography
            variant="h5"
            fontWeight="bold"
            color={theme.palette.primary.dark}
          >
            v5 Theme
          </Typography>
          {/* {others.open && (
              <IconButton onClick={() => others.onClose()}>
                <ChevronLeftOutlined />
              </IconButton>
            )} */}
        </Toolbar>
      </AppBar>
      <List>
        {categories.map(({ id, children }, index) => (
          <Box key={`${id}-${index}`}>
            {id.length > 0 && (
              <ListItem sx={{ py: 2, px: 3 }}>
                <ListItemText sx={{ fontWeight: "bold" }}>
                  <Typography
                    color="inherit"
                    sx={{ ml: 1, fontSize: 15, fontWeight: 500 }}
                  >
                    {id}
                  </Typography>
                </ListItemText>
              </ListItem>
            )}
            {children.map(({ id: childId, icon, to }) => (
              <ListItem key={`${id}-${childId}`}>
                <ListItemButton
                  selected={
                    selectedIndex === childId || location.pathname === to
                  }
                  onClick={(event) => handleListItemClick(event, childId)}
                  component={Link}
                  to={to}
                >
                  <ListItemIcon>{icon}</ListItemIcon>
                  <ListItemText>{childId}</ListItemText>
                </ListItemButton>
              </ListItem>
            ))}
          </Box>
        ))}
      </List>
    </Drawer>
  );
};

const categories = [
  {
    id: "",
    children: [
      {
        id: "Theme",
        icon: <ThemeIcon />,
        to: "/theme",
      },
      {
        id: "Theme Colors",
        icon: <ColorsIcon />,
        to: "/themeColors",
      },
      {
        id: "Components",
        icon: <ComponentsIcon />,
        to: "/components",
      },
      {
        id: "Theme Code",
        icon: <CodeIcon />,
        to: "/themeCode",
      },
    ],
  },
  {
    id: "Sample Pages",
    children: [
      {
        id: "Signin",
        icon: <SignInIcon />,
        to: "/signin",
      },
      { id: "Signup", icon: <SignUpIcon />, to: "/signup" },
    ],
  },
];

export default SideBar;
