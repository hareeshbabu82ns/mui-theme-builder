import React from "react";
import { Stack } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ThemeGenerator from "components/ThemeGenerator";
import ColorSystem from "components/ColorSystem";

const ThemePage = () => {
  return (
    <>
      <FlexBetween>
        <Header title="Theme Settings" subtitle="Manage Theme Settings" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ThemeGenerator />

        <ColorSystem />
      </Stack>
    </>
  );
};

export default ThemePage;
