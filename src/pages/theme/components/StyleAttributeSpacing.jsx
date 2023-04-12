import { Box, Paper, Slider, Stack } from "@mui/material";
import { useState } from "react";
import AttributeTitle from "./AttributeTitle";

const StyleAttributeSpacing = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  // const theme = useTheme();
  const s =
    typeof settingData === "string"
      ? settingData?.startsWith("theme.spacing")
        ? Number(settingData.match(/\d(?=\))/)?.[0] ?? "0")
        : Number(settingData?.replace("px", ""))
      : settingData ?? 0;
  const [space, setSpace] = useState(s);
  const handleSpaceChange = (e, space) => {
    setSpace(space || 0);
    if (onChange)
      onChange(
        space
          ? settingConfig?.type === "pixels"
            ? `${space}px`
            : `theme.spacing(${space})`
          : space
      );
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
