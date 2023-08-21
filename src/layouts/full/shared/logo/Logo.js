import {
  AppBar,
  Box,
  Toolbar,
  Typography,
  styled,
  useTheme,
} from "@mui/material";
import muiLogo from "assets/mui.svg";

export const AppBarStyled = styled(AppBar)(({ theme }) => ({
  boxShadow: "none",
  background: theme.palette.background.paper,
  justifyContent: "center",
  backdropFilter: "blur(4px)",
  [theme.breakpoints.up("lg")]: {
    minHeight: "70px",
  },
}));
export const ToolbarStyled = styled(Toolbar)(({ theme }) => ({
  width: "100%",
  color: theme.palette.text.secondary,
}));

const Logo = () => {
  const theme = useTheme();
  return (
    <AppBarStyled position="sticky" color="default" elevation={0}>
      <ToolbarStyled sx={{ alignItems: "center" }}>
        <img src={muiLogo} alt="MUI Logo" />
        <Box sx={{ width: 16 }} />
        <Typography variant="h4" color={theme.palette.primary.dark}>
          v5 Theme
        </Typography>
      </ToolbarStyled>
    </AppBarStyled>
  );
};

export default Logo;
