import { useMemo } from "react";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import customTheme from "theme";
import ThemePage from "pages/theme/ThemePage";

function App() {
  const themeState = useSelector((state) => state.theme);
  const theme = useMemo(
    () =>
      customTheme({
        isMui: true,
        mode: themeState.mode,
        baseColor: themeState.baseColor,
        secondaryColor: themeState.secondaryColor,
        tertiaryColor: themeState.tertiaryColor,
        fontFamily: "Inter, sans-serif",
      }),
    [themeState]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <ThemePage />
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
