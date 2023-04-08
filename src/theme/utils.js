import {
  CorePalette,
  Scheme,
  argbFromHex,
  customColor,
  hexFromArgb,
} from "@material/material-color-utilities";
import { get } from "utils";

export const generateThemeSchemeFromColors = (
  colorBase,
  { secondaryColor, tertiaryColor } = {}
) => {
  // const theme = themeFromSourceColor(argbFromHex(colorBase));
  const theme = themeFromColors(colorBase, { secondaryColor, tertiaryColor });

  /*let theme = undefined;
      if (typeof colorBase == 'string') {
          theme = themeFromSourceColor(argbFromHex(colorBase));
      }
      else {
          theme = await themeFromImage(colorBase);
      }*/

  const paletteTones = {};
  const paletteExtras = {};
  const light = {};
  const dark = {};

  for (const [key, palette] of Object.entries(theme.palettes)) {
    const tones = {};
    for (const tone of [0, 10, 20, 30, 40, 50, 60, 70, 80, 90, 95, 99, 100]) {
      const color = hexFromArgb(palette.tone(tone));
      tones[tone] = color;
    }
    paletteTones[key] = tones;
  }

  const lightJSON = theme.schemes.light.toJSON();
  const darkJSON = theme.schemes.dark.toJSON();

  // for (const [key, palette] of Object.entries(theme.palettes)) {
  //   console.log(palette);
  // }

  for (const [key, value] of Object.entries(lightJSON)) {
    const color = hexFromArgb(value);
    light[key] = color;
    // console.log(key, color);
  }
  for (const [key, value] of Object.entries(darkJSON)) {
    const color = hexFromArgb(value);
    dark[key] = color;
  }
  const scheme = {
    //: M3ThemeScheme
    light,
    dark,
    tones: paletteTones,
    extras: paletteExtras,
    colorBase,
    secondaryColor,
    tertiaryColor,
  };
  return scheme;
};

export function themeFromColors(
  colorBase,
  { secondaryColor, tertiaryColor, customColors } = {}
) {
  const source = argbFromHex(colorBase);
  const colors = { primary: source };
  if (secondaryColor) colors["secondary"] = argbFromHex(secondaryColor);
  if (tertiaryColor) colors["tertiary"] = argbFromHex(tertiaryColor);
  const palette =
    secondaryColor || tertiaryColor
      ? CorePalette.contentFromColors(colors)
      : CorePalette.of(source);

  return {
    source: {
      colorBase,
      secondaryColor,
      tertiaryColor,
    },
    schemes: {
      light: Scheme.lightFromCorePalette(palette),
      dark: Scheme.darkFromCorePalette(palette),
    },
    palettes: {
      primary: palette.a1,
      secondary: palette.a2,
      tertiary: palette.a3,
      neutral: palette.n1,
      neutralVariant: palette.n2,
      error: palette.error,
    },
    customColors: customColors
      ? customColors.map((c) => customColor(source, c))
      : [],
  };
}

// function that reverses the color palette
export function reverseTokens(tokensDark) {
  const reversedTokens = {};
  Object.entries(tokensDark).forEach(([key, val]) => {
    const keys = Object.keys(val);
    const values = Object.values(val);
    const length = keys.length;
    const reversedObj = {};
    for (let i = 0; i < length; i++) {
      reversedObj[keys[i]] = values[length - i - 1];
    }
    reversedTokens[key] = reversedObj;
  });
  return reversedTokens;
}

export const parseThemeSimple = (jsonStr, theme) => {
  return JSON.parse(jsonStr, (key, value) => {
    if (typeof value === "string") {
      if (value.startsWith("theme.")) {
        // theme values
        const valStr = value.replace("theme.", "");
        return get(theme, valStr, "");
      }
    }
    return value;
  });
};
