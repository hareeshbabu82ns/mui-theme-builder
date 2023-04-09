import React from "react";
import { Stack } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ColorSystem from "components/ColorSystem";

const ThemeColorsPage = () => {
  return (
    <>
      <FlexBetween>
        <Header title="Theme Colors" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ColorSystem />
      </Stack>
    </>
  );
};

export default ThemeColorsPage;
