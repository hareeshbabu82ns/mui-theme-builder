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

import PeopleIcon from "@mui/icons-material/PeopleOutline";
import DnsRoundedIcon from "@mui/icons-material/DnsOutlined";
import PermMediaOutlinedIcon from "@mui/icons-material/PhotoSizeSelectActualOutlined";
import PublicIcon from "@mui/icons-material/PublicOutlined";
import SettingsEthernetIcon from "@mui/icons-material/SettingsEthernetOutlined";
import SettingsInputComponentIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import ColorIcon from "@mui/icons-material/ColorLensOutlined";
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
        <Toolbar
          sx={{
            bgcolor: theme.palette.background.alt,
            alignItems: "center",
          }}
        >
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
        icon: <ColorIcon />,
        to: "/theme",
      },
      {
        id: "Theme Colors",
        icon: <DnsRoundedIcon />,
        to: "/themeColors",
      },
      {
        id: "Components",
        icon: <DnsRoundedIcon />,
        to: "/components",
      },
      {
        id: "Theme Code",
        icon: <DnsRoundedIcon />,
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
  {
    id: "Build",
    children: [
      {
        id: "Authentication",
        icon: <PeopleIcon />,
      },
      { id: "Database", icon: <DnsRoundedIcon /> },
      { id: "Storage", icon: <PermMediaOutlinedIcon /> },
      { id: "Hosting", icon: <PublicIcon /> },
      { id: "Functions", icon: <SettingsEthernetIcon /> },
      {
        id: "Machine learning",
        icon: <SettingsInputComponentIcon />,
      },
    ],
  },
];

export default SideBar;
