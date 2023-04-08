import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

import { getDesignTokens, getThemedComponents } from "./M3Theme";
import {
  generateThemeSchemeFromColors,
  parseThemeSimple,
  reverseTokens,
} from "./utils";

const customTheme = (customization) => {
  const baseColor = customization.baseColor || "#130019";

  const { themeScheme, theme } = generateCustomTheme({
    mode: customization.mode,
    baseColor,
    secondaryColor: customization.secondaryColor,
    tertiaryColor: customization.tertiaryColor,
    customComponents: customization.customComponents,
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
  customComponents,
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

  const newM3Theme = createTheme(designTokens);
  const themedComponents = getThemedComponents(newM3Theme);
  const customThemedComponents = customComponents
    ? deepmerge(themedComponents, {
        components: parseThemeSimple(customComponents, newM3Theme),
      })
    : themedComponents;
  const theme = deepmerge(newM3Theme, customThemedComponents);
  // console.log(newM3Theme.components);

  return {
    themeScheme,
    theme,
    designTokens,
    themedComponents: customThemedComponents,
  };
};

export default customTheme;
