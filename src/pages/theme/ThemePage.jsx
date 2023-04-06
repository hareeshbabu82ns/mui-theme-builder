import React from "react";
import { Box, Stack } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ThemeGenerator from "components/ThemeGenerator";
import ColorSystem from "components/ColorSystem";

const ThemePage = () => {
  return (
    <Box m="1.5rem 2.5rem">
      <FlexBetween>
        <Header title="Theme Settings" subtitle="Manage Theme Settings" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ThemeGenerator />

        <ColorSystem />
      </Stack>
    </Box>
  );
};

export default ThemePage;
