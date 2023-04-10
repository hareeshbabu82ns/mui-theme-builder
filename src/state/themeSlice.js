import { createSlice } from "@reduxjs/toolkit";
import { loadThemeLocal, saveThemeLocal } from "../utils";

const { mode, baseColor, secondaryColor, tertiaryColor, customComponents } =
  loadThemeLocal();

// const customComponents = {
//   MuiButton: {
//     styleOverrides: {
//       outlined: {
//         borderColor: "theme.palette.background.default",
//       },
//     },
//   },
// };

const initialState = {
  mode,
  baseColor,
  secondaryColor,
  tertiaryColor,
  customComponents: customComponents ?? {},
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setTheme: (state, { payload }) => {
      state.mode = payload.mode;
      state.baseColor = payload.baseColor;
      state.secondaryColor = payload.secondaryColor;
      state.tertiaryColor = payload.tertiaryColor;
      state.customComponents = payload.customComponents || {};
      saveThemeLocal({
        ...state,
        mode: state.mode,
        baseColor: state.baseColor,
        secondaryColor: state.secondaryColor,
        tertiaryColor: state.tertiaryColor,
        customComponents: state.customComponents,
      });
    },
    setThemeColors: (state, { payload }) => {
      state.baseColor = payload.baseColor;
      state.secondaryColor = payload.secondaryColor;
      state.tertiaryColor = payload.tertiaryColor;
      saveThemeLocal({
        ...state,
        baseColor: state.baseColor,
        secondaryColor: state.secondaryColor,
        tertiaryColor: state.tertiaryColor,
      });
    },
    setBaseColor: (state, { payload }) => {
      state.baseColor = payload;
      saveThemeLocal({ ...state, baseColor: state.baseColor });
    },
    setSecondaryColor: (state, { payload }) => {
      state.secondaryColor = payload;
      saveThemeLocal({ ...state, secondaryColor: state.secondaryColor });
    },
    setTertiaryColor: (state, { payload }) => {
      state.tertiaryColor = payload;
      saveThemeLocal({ ...state, tertiaryColor: state.tertiaryColor });
    },
    setCustomComponents: (state, { payload }) => {
      state.customComponents = payload || {};
      saveThemeLocal({ ...state, customComponents: state.customComponents });
    },
    setMode: (state, { payload }) => {
      state.mode = payload;
      saveThemeLocal({ ...state, mode: state.mode });
    },
    toggleMode: (state) => {
      state.mode = state.mode === "light" ? "dark" : "light";
      saveThemeLocal({ ...state, mode: state.mode });
    },
  },
});

// Action creators are generated for each case reducer function
export const {
  toggleMode,
  setMode,
  setBaseColor,
  setSecondaryColor,
  setTertiaryColor,
  setThemeColors,
  setCustomComponents,
  setTheme,
} = themeSlice.actions;

export default themeSlice.reducer;
