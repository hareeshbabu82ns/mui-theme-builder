import { useTheme } from "@emotion/react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SketchColorPicker from "./SketchColorPicker";
import TonesIcon from "@mui/icons-material/OpacityOutlined";
import PalettesIcon from "@mui/icons-material/PaletteOutlined";

function ThemeColorPicker({ colorKey, themeColorPath, onChange }) {
  const theme = useTheme();

  const [themePathSplits, setThemePathSplits] = useState(
    themeColorPath.split(".")
  );

  const [colorModule, setColorModule] = useState(themePathSplits[1] || "");
  const [colorPaletteKey, setColorPaletteKey] = useState(
    themePathSplits[2] || ""
  );
  const [colorToneKey, setColorToneKey] = useState(themePathSplits[2] || "");

  const [paletteColor, setPaletteColor] = useState(themePathSplits[3] || "");
  const [toneColor, setToneColor] = useState(themePathSplits[3] || "");

  useEffect(() => {
    const splits = themeColorPath.split(".");
    setThemePathSplits(splits);
    setColorModule(splits[1] || "");
    setColorToneKey(splits[2] || "");
    setPaletteColor(splits[3] || "");
    setToneColor(splits[3] || "");
  }, [themeColorPath]);

  const handleColorModule = (v) => {
    setColorModule(v);
    setColorToneKey("");
    setToneColor("");
    setColorPaletteKey("");
    setPaletteColor("");
  };

  const handleToneChange = (v) => {
    setColorToneKey(v);
    setToneColor("");
  };
  const handlePaletteChange = (v) => {
    setColorPaletteKey(v);
    setPaletteColor("");
  };
  const handleToneColorChange = (v) => {
    setToneColor(v);
    if (onChange) onChange(`theme.${colorModule}.${colorToneKey}.${v}`);
  };
  const handlePaletteColorChange = (v) => {
    setPaletteColor(v);
    if (onChange) onChange(`theme.${colorModule}.${colorPaletteKey}.${v}`);
  };

  const colorModuleSelect = (
    <ToggleButtonGroup
      value={colorModule}
      exclusive
      onChange={(e, v) => handleColorModule(v)}
      aria-label="text alignment"
      size="small"
    >
      <Tooltip title="Tones">
        <ToggleButton value="tones" aria-label="tones">
          <TonesIcon />
        </ToggleButton>
      </Tooltip>
      <Tooltip title="Palette">
        <ToggleButton value="palette" aria-label="palette">
          <PalettesIcon />
        </ToggleButton>
      </Tooltip>
    </ToggleButtonGroup>
  );

  const colorToneKeySelect = (
    <FormControl fullWidth size="small">
      <InputLabel id="color-tones-key-select-label">Tone</InputLabel>
      <Select
        labelId="color-tones-key-select-label"
        id="color-tones-key-select"
        value={colorToneKey}
        label="Tone"
        onChange={(e) => handleToneChange(e.target.value)}
        displayEmpty
      >
        {Object.keys(theme.tones).map((p) => (
          <MenuItem key={p} value={p}>
            {p}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  const colorPaletteKeySelect = (
    <FormControl fullWidth size="small">
      <InputLabel id="color-palette-key-select-label">Palette</InputLabel>
      <Select
        labelId="color-palette-key-select-label"
        id="color-palette-key-select"
        value={colorPaletteKey}
        label="Palette"
        onChange={(e) => handlePaletteChange(e.target.value)}
        displayEmpty
      >
        {Object.keys(theme.palette)
          .filter((p) => !!theme.palette[p]?.main)
          .map((p) => (
            <MenuItem key={p} value={p}>
              {p}
            </MenuItem>
          ))}
      </Select>
    </FormControl>
  );

  const paletteColorSelect = (
    <FormControl fullWidth size="small">
      <InputLabel id="palette-color-select-label">Color</InputLabel>
      <Select
        labelId="palette-color-select-label"
        id="palette-color-select"
        value={paletteColor}
        label="Color"
        onChange={(e) => handlePaletteColorChange(e.target.value)}
        displayEmpty
        renderValue={(v) => <Typography>{v}</Typography>}
      >
        {Object.entries(theme.palette[colorPaletteKey] || {}).map(
          ([key, val]) => (
            <MenuItem key={key} value={key}>
              <SketchColorPicker color={val} colorKey={key} disabled />
            </MenuItem>
          )
        )}
      </Select>
    </FormControl>
  );

  const toneColorSelect = (
    <FormControl fullWidth size="small">
      <InputLabel id="tone-color-select-label">Color</InputLabel>
      <Select
        labelId="tone-color-select-label"
        id="tone-color-select"
        value={toneColor}
        label="Color"
        onChange={(e) => handleToneColorChange(e.target.value)}
        displayEmpty
        renderValue={(v) => <Typography>{v}</Typography>}
      >
        {Object.entries(theme.tones[colorToneKey] || {}).map(([key, val]) => (
          <MenuItem key={key} value={key}>
            <SketchColorPicker color={val} colorKey={key} disabled />
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );

  return (
    <Stack gap={2} direction={{ xs: "column", lg: "row" }}>
      {colorModuleSelect}
      <Box flex={1}>
        {colorModule === "palette" && (
          <Stack gap={2} direction="row">
            {colorPaletteKeySelect}
            {paletteColorSelect}
          </Stack>
        )}
        {colorModule === "tones" && (
          <Stack gap={2} direction="row">
            {colorToneKeySelect}
            {toneColorSelect}
          </Stack>
        )}
      </Box>
    </Stack>
  );
}

export default ThemeColorPicker;
