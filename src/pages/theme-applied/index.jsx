import { useMemo, useState } from "react";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";
import {
  designTokensLight,
  designTokensDark,
  themedComponentsLight,
  themedComponentsDark,
} from "./theme-utils";
import ElementsPage from "pages/elements";

const generateTheme = (mode) => {
  const designTokens = mode === "light" ? designTokensLight : designTokensDark;
  const themedComponents =
    mode === "light" ? themedComponentsLight : themedComponentsDark;

  let theme = createTheme(designTokens);
  theme = deepmerge(theme, themedComponents);

  return theme;
};

function ThemedApp() {
  const [mode, setMode] = useState("dark");

  const theme = useMemo(() => generateTheme(mode), [mode]);

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <ElementsPage />
    </ThemeProvider>
  );
}

export default ThemedApp;
