import React from "react";
import { Box, Stack } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ColorSystem from "components/ColorSystem";

const ThemeColorsPage = () => {
  return (
    <Box margin={{ xs: "1rem 2rem", lg: "0" }}>
      <FlexBetween>
        <Header title="Theme Colors" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ColorSystem />
      </Stack>
    </Box>
  );
};

export default ThemeColorsPage;
