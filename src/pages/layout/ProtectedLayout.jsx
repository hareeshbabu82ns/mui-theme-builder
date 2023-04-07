import NavBar from "components/NavBar";
import SideBar from "components/SideBar";

const { Box, useMediaQuery, useTheme, Container } = require("@mui/material");
const { useState } = require("react");
const { useSelector } = require("react-redux");
const { Outlet, Navigate, useLocation } = require("react-router-dom");

const drawerWidth = "300px";

function ProtectedLayout() {
  const theme = useTheme();
  const isSmUp = useMediaQuery(theme.breakpoints.up("md"));
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const location = useLocation();

  const user = useSelector((state) => state.global.user);

  // const { data } = useGetUserQuery(user?._id);
  const data = user;
  if (!user) {
    return <Navigate to={`/signin?from=${location.pathname}`} />;
  }

  return (
    <Box sx={{ display: "flex", minHeight: "cal(100vh-3px)" }}>
      <Box
        component="nav"
        sx={{ width: { md: drawerWidth }, flexShrink: { md: 0 } }}
      >
        {isSmUp ? null : (
          <SideBar
            user={data || {}}
            PaperProps={{
              style: {
                width: drawerWidth,
                backgroundColor: theme.palette.background.alt,
              },
            }}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
          />
        )}
        <SideBar
          user={data || {}}
          PaperProps={{
            style: {
              width: drawerWidth,
              backgroundColor: theme.palette.background.alt,
            },
          }}
          sx={{ display: { md: "block", sm: "none", xs: "none" } }}
        />
      </Box>

      <Box sx={{ flex: 1, display: "flex", flexDirection: "column" }}>
        <NavBar onDrawerToggle={handleDrawerToggle} user={data || {}} />
        <Box m="1.5rem 1.5rem">
          <Outlet />
        </Box>
      </Box>
    </Box>
  );
}

export default ProtectedLayout;
