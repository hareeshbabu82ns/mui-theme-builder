import { createTheme } from "@mui/material";
import { deepmerge } from "@mui/utils";

import { getDesignTokens, getThemedComponents } from "./M3Theme";
import { generateThemeSchemeFromColors, reverseTokens } from "./utils";

export const customTheme = (customization) => {
  const isDark = customization.mode === "dark";

  const baseColor = customization.baseColor || "#130019";

  const themeScheme = generateThemeSchemeFromColors(baseColor, {
    secondaryColor: customization.secondaryColor,
    tertiaryColor: customization.tertiaryColor,
  });

  const finalTones = !isDark
    ? themeScheme.tones
    : reverseTokens(themeScheme.tones);

  const designTokens = getDesignTokens({
    mode: customization.mode,
    scheme: themeScheme[customization.mode],
    tones: finalTones,
  });

  let newM3Theme = createTheme(designTokens);
  newM3Theme = deepmerge(newM3Theme, getThemedComponents(newM3Theme));

  document
    .querySelector('meta[name="theme-color"]')
    ?.setAttribute("content", themeScheme[customization.mode].surface);

  // console.log(newM3Theme);
  return newM3Theme;
};

export default customTheme;
