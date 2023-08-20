import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

import { getDesignTokens, getThemedComponents } from "./M3Theme";
import {
  generateThemeSchemeFromColors,
  parseThemeSimple,
  reverseTokens,
} from "./utils";
import themeTypography from "./typography";

const customTheme = (customization) => {
  const baseColor = customization.baseColor || "#130019";

  const { themeScheme, theme } = generateCustomTheme({
    mode: customization.mode,
    baseColor,
    secondaryColor: customization.secondaryColor,
    tertiaryColor: customization.tertiaryColor,
    customComponents: customization.customComponents,
    customization,
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
  customization,
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
  const themedTypography = themeTypography(newM3Theme, customization);
  const newM3TypoTheme = deepmerge(newM3Theme, {
    typography: themedTypography,
  });
  const customThemedComponents = customComponents
    ? deepmerge(themedComponents, {
        components: parseThemeSimple(customComponents, newM3TypoTheme),
      })
    : themedComponents;
  const theme = deepmerge(newM3TypoTheme, customThemedComponents);
  // console.log(newM3Theme.components);

  return {
    themeScheme,
    theme,
    designTokens: { ...designTokens, typography: themedTypography },
    themedComponents: customThemedComponents,
  };
};

export default customTheme;
