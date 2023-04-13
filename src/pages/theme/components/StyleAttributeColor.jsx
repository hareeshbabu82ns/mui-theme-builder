import { Box, Paper, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import { get } from "utils";
import AttributeTitle from "./AttributeTitle";
import ThemeColorPicker from "components/ThemeColorPicker";
import SketchColorPicker from "components/SketchColorPicker";
import { parseSplitThemeValue, updateModeSplitThemeValue } from "theme/utils";

const StyleAttributeColor = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  const theme = useTheme();

  const [color, setColor] = useState("");

  const [colorPath, setColorPath] = useState("");

  useEffect(() => {
    const themeColor = parseSplitThemeValue(settingData)[theme?.palette?.mode];
    const c =
      typeof themeColor === "string"
        ? themeColor?.startsWith("theme.")
          ? get(theme, themeColor.replace("theme.", ""))
          : themeColor
        : "";
    setColor(c);
    setColorPath(themeColor?.startsWith("theme.") ? themeColor : "");
  }, [settingData, theme]);

  const handleColorChange = (color) => {
    setColor(color);
    setColorPath("");
    if (onChange)
      onChange(
        updateModeSplitThemeValue(settingData, color, theme?.palette?.mode)
      );
  };

  const handleThemeColorChange = (color) => {
    setColor(get(theme, color.replace("theme.", "")));
    setColorPath(color);
    if (onChange)
      onChange(
        updateModeSplitThemeValue(settingData, color, theme?.palette?.mode)
      );
  };

  return (
    <Paper>
      <Stack gap={2}>
        <AttributeTitle
          attributeId={settingId}
          handleAttributeDelete={() => handleColorChange(undefined)}
        />
        <Stack
          gap={2}
          px={2}
          py={1}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <Box sx={{ flex: 2 }}>
            <ThemeColorPicker
              colorKey={settingId}
              themeColorPath={colorPath}
              onChange={handleThemeColorChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SketchColorPicker
              // colorKey={settingId}
              color={color}
              varient="chrome"
              onChange={handleColorChange}
            />
          </Box>
        </Stack>
        {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
      </Stack>
    </Paper>
  );
};

export default StyleAttributeColor;
