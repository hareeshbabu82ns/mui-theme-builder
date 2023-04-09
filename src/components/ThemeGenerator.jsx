import React, { useEffect, useState } from "react";
import tinycolor from "tinycolor2";
import {
  Box,
  Button,
  Grid,
  IconButton,
  Stack,
  Toolbar,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import SketchColorPicker from "./SketchColorPicker";
import { useDispatch, useSelector } from "react-redux";
import { setTheme, setThemeColors } from "../state/themeSlice";
import {
  // ColorizeOutlined as BaseColorIcon,
  ColorLensOutlined,
  SaveAltOutlined,
  FileUploadOutlined,
} from "@mui/icons-material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import { jsonToURL } from "utils";

const ThemeGenerator = ({ isSidebar }) => {
  const theme = useTheme();

  const dispatch = useDispatch();
  const themeColors = useSelector((state) => state.theme);

  const [primaryColor, setPrimaryColor] = useState(themeColors.baseColor);
  const [secondaryColor, setScondaryColor] = useState(
    themeColors.secondaryColor
  );
  const [tertiaryColor, setTertiaryColor] = useState(themeColors.tertiaryColor);

  useEffect(() => {
    setPrimaryColor(themeColors.baseColor);
    setScondaryColor(themeColors.secondaryColor);
    setTertiaryColor(themeColors.tertiaryColor);
    // setPrimaryColor(theme.palette.primary.main);
    // setScondaryColor(theme.palette.secondary.main);
    // setTertiaryColor(theme.palette.tertiary[500]);
  }, [theme, themeColors]);

  const handleColorChange = (colorKey, color) =>
    dispatch(
      setThemeColors({
        ...themeColors,
        [colorKey]: color,
      })
    );

  const genBaseColor = (c) =>
    dispatch(
      setThemeColors({
        baseColor: tinycolor.random().toHexString(),
      })
    );

  const genTertiaryColors = () => {
    const colors = tinycolor
      .random()
      .triad()
      .map((c) => c.toHexString());

    dispatch(
      setThemeColors({
        baseColor: colors[0],
        secondaryColor: colors[1],
        tertiaryColor: colors[2],
      })
    );
  };

  const handleSaveTheme = () => {
    const url = jsonToURL(themeColors);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "theme-settings.json");
    document.body.appendChild(link);
    link.click();

    // Clean up and remove the link
    link.parentNode.removeChild(link);
  };

  const handleLoadTheme = (file) => {
    if (!file) return;
    var reader = new FileReader();
    reader.onload = function (event) {
      const savedTheme = JSON.parse(event.target.result);
      // console.log("File content:", savedTheme);
      dispatch(
        setTheme({
          mode: savedTheme.mode,
          baseColor: savedTheme.baseColor,
          secondaryColor: savedTheme.secondaryColor,
          tertiaryColor: savedTheme.tertiaryColor,
          customComponents: savedTheme.customComponents,
        })
      );
    };
    reader.readAsText(file);
  };

  return (
    <Box
      backgroundColor={isSidebar ? "inherited" : theme.palette.background.tile}
      display="flex"
      p="1rem"
      mt={isSidebar ? "none" : "2rem"}
    >
      <Stack direction="column" gap={4} sx={{ flexGrow: 1 }}>
        {/* <Stack direction="row" gap={2} alignItems="center">
          <ColorLensOutlined
            fontSize="large"
            sx={{ color: theme.palette.tertiary[900] }}
          />
          <Typography variant="h4" color={theme.palette.tertiary[700]}>
            Theme Generator
          </Typography>
        </Stack> */}

        <Toolbar disableGutters>
          <Grid container spacing={1} alignItems="center">
            <Grid item>
              <ColorLensOutlined
                fontSize="large"
                sx={{ color: theme.palette.tertiary[900] }}
              />
            </Grid>
            <Grid item sx={{ display: "flex", alignItems: "baseline" }}>
              <Typography
                color="inherit"
                sx={{ fontWeight: 500, letterSpacing: 0.5, fontSize: 20 }}
              >
                Theme Generator
              </Typography>
            </Grid>

            <Grid item xs></Grid>
            <Grid item>
              <Tooltip title="Save Theme">
                <IconButton
                  size="large"
                  color="inherit"
                  onClick={() => handleSaveTheme()}
                >
                  <SaveAltOutlined />
                </IconButton>
              </Tooltip>
              <Tooltip title="Load Theme">
                <IconButton size="large" color="inherit" component="label">
                  <input
                    hidden
                    accept="application/json"
                    type="file"
                    onChange={(e) => handleLoadTheme(e?.target?.files[0])}
                  />
                  <FileUploadOutlined />
                </IconButton>
              </Tooltip>
            </Grid>
          </Grid>
        </Toolbar>

        <Stack direction={isSidebar ? "column" : "row"} gap={2}>
          <Button color="primary" variant="contained" onClick={genBaseColor}>
            {/* <BaseColorIcon sx={{ mr: "10px" }} /> */}
            Generate Base Color
          </Button>
          <Button
            color="primary"
            variant="contained"
            onClick={genTertiaryColors}
          >
            {/* <BaseColorIcon sx={{ mr: "10px" }} /> */}
            Generate Tri Colors
          </Button>
        </Stack>

        <Grid2 container spacing={2} columns={isSidebar ? 1 : 3}>
          <Grid2 xs={3} md={1}>
            <Stack rowGap={1}>
              <Typography variant="h4">Base Color</Typography>
              <SketchColorPicker
                color={primaryColor}
                varient="chrome"
                onChange={(c) => handleColorChange("baseColor", c)}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={3} md={1}>
            <Stack rowGap={1}>
              <Typography variant="h4">Secondary Color</Typography>
              <SketchColorPicker
                color={secondaryColor}
                varient="chrome"
                onChange={(c) => handleColorChange("secondaryColor", c)}
              />
            </Stack>
          </Grid2>
          <Grid2 xs={3} md={1}>
            <Stack rowGap={1}>
              <Typography variant="h4">Tertiary Color</Typography>
              <SketchColorPicker
                color={tertiaryColor}
                varient="chrome"
                onChange={(c) => handleColorChange("tertiaryColor", c)}
              />
            </Stack>
          </Grid2>
        </Grid2>
      </Stack>
    </Box>
  );
};

export default ThemeGenerator;
