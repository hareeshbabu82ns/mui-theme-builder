import { Box, Paper, Slider, Stack, useTheme } from "@mui/material";
import { useEffect, useState } from "react";
import AttributeTitle from "./AttributeTitle";
import { parseSplitThemeValue, updateModeSplitThemeValue } from "theme/utils";

const StyleAttributeSpacing = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  const theme = useTheme();

  const [space, setSpace] = useState(0);

  useEffect(() => {
    const themeSpace = parseSplitThemeValue(settingData)[theme?.palette?.mode];
    const s =
      typeof themeSpace === "string"
        ? themeSpace?.startsWith("theme.spacing")
          ? Number(themeSpace.match(/\d(?=\))/)?.[0] ?? "0")
          : Number(themeSpace?.replace("px", ""))
        : settingData ?? 0;
    setSpace(s);
  }, [settingData, theme]);

  const handleSpaceChange = (e, space) => {
    setSpace(space || 0);
    if (onChange) {
      const newSpace = space
        ? settingConfig?.type === "pixels"
          ? `${space}px`
          : `theme.spacing(${space})`
        : space;
      onChange(
        updateModeSplitThemeValue(settingData, newSpace, theme?.palette?.mode)
      );
    }
  };

  return (
    <Paper variant="rounded">
      <Stack gap={2}>
        <AttributeTitle
          attributeId={settingId}
          handleAttributeDelete={() => handleSpaceChange(undefined)}
        />
        <Box mx={2} px={2} py={1}>
          <Slider
            value={space}
            min={settingConfig?.min || 0}
            max={settingConfig?.max || 9}
            step={settingConfig?.step || 1}
            size="medium"
            aria-label="spacing"
            valueLabelDisplay="auto"
            onChange={handleSpaceChange}
          />
        </Box>
        {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
      </Stack>
    </Paper>
  );
};

export default StyleAttributeSpacing;
