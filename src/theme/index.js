import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

import { getDesignTokens, getThemedComponents } from "./M3Theme";
import { generateThemeSchemeFromColors, reverseTokens } from "./utils";

const customTheme = (customization) => {
  const baseColor = customization.baseColor || "#130019";

  const { themeScheme, theme } = generateCustomTheme({
    mode: customization.mode,
    baseColor,
    secondaryColor: customization.secondaryColor,
    tertiaryColor: customization.tertiaryColor,
  });

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeScheme[customization.mode].surface);

  // console.log(newM3Theme);
  return theme;
};

export const generateCustomTheme = ({
  mode,
  baseColor,
  secondaryColor,
  tertiaryColor,
}) => {
  const isDark = mode === "dark";
  const themeScheme = generateThemeSchemeFromColors(baseColor, {
    secondaryColor,
    tertiaryColor,
  });

  const finalTones = !isDark
    ? themeScheme.tones
    : reverseTokens(themeScheme.tones);

  const designTokens = getDesignTokens({
    mode: mode,
    scheme: themeScheme[mode],
    tones: finalTones,
  });

  let newM3Theme = createTheme(designTokens);
  const themedComponents = getThemedComponents(newM3Theme);
  newM3Theme = deepmerge(newM3Theme, themedComponents);

  return { themeScheme, theme: newM3Theme, designTokens, themedComponents };
};

export default customTheme;
