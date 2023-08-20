import { useMemo } from "react";
import { useSelector } from "react-redux";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterLuxon } from "@mui/x-date-pickers/AdapterLuxon";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";

import customTheme from "theme";
import ThemePage from "pages/theme/ThemePage";
import ProtectedLayout from "pages/layout/ProtectedLayout";
import LoginPage from "pages/user/Login";
import SignupPage from "pages/user/Signup";
import ElementsPage from "pages/elements";
import ThemeCodePage from "pages/code";
import ThemeColorsPage from "pages/theme/ThemeColorsPage";
import ComponentSettings from "pages/theme/ComponentSettings";

function App() {
  const themeState = useSelector((state) => state.theme);
  const theme = useMemo(
    () =>
      customTheme({
        mode: themeState.mode,
        baseColor: themeState.baseColor,
        secondaryColor: themeState.secondaryColor,
        tertiaryColor: themeState.tertiaryColor,
        customComponents: themeState.customComponents,
        fontFamily: "'Plus Jakarta Sans', sans-serif",
        borderRadius: 16,
      }),
    [themeState]
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline enableColorScheme />
      <LocalizationProvider dateAdapter={AdapterLuxon}>
        <BrowserRouter>
          <Routes>
            <Route element={<ProtectedLayout />}>
              <Route path="/" element={<Navigate to="/theme" replace />} />
              <Route path="/components" element={<ElementsPage />} />
              <Route path="/theme" element={<ThemePage />}>
                <Route path=":component" element={<ComponentSettings />} />
              </Route>
              <Route path="/themeColors" element={<ThemeColorsPage />} />
              <Route path="/themeCode" element={<ThemeCodePage />} />
            </Route>
            <Route path="/signin" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
          </Routes>
        </BrowserRouter>
      </LocalizationProvider>
    </ThemeProvider>
  );
}

export default App;
