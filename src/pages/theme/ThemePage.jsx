import React from "react";
import { Stack } from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ThemeGenerator from "components/ThemeGenerator";

const ThemePage = () => {
  return (
    <>
      <FlexBetween>
        <Header title="Theme Settings" subtitle="Manage Theme Settings" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ThemeGenerator />
      </Stack>
    </>
  );
};

export default ThemePage;
