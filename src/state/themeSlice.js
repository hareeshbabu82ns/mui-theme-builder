import { createSlice } from "@reduxjs/toolkit";
import { loadThemeLocal, saveThemeLocal } from "../utils";

const { mode, baseColor, secondaryColor, tertiaryColor, customComponents } =
  loadThemeLocal();

const initialState = {
  mode,
  baseColor,
  secondaryColor,
  tertiaryColor,
  customComponents,
};

export const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeColors: (state, { payload }) => {
      state.baseColor = payload.baseColor;
      state.secondaryColor = payload.secondaryColor;
      state.tertiaryColor = payload.tertiaryColor;
      state.customComponents = payload.customComponents;
      saveThemeLocal({
        ...state,
        baseColor: state.baseColor,
        secondaryColor: state.secondaryColor,
        tertiaryColor: state.tertiaryColor,
        customComponents: state.customComponents,
      });
    },
    setBaseColor: (state, { payload }) => {
      state.baseColor = payload.baseColor;
      saveThemeLocal({ ...state, baseColor: state.baseColor });
    },
    setSecondaryColor: (state, { payload }) => {
      state.secondaryColor = payload.secondaryColor;
      saveThemeLocal({ ...state, secondaryColor: state.secondaryColor });
    },
    setTertiaryColor: (state, { payload }) => {
      state.tertiaryColor = payload.tertiaryColor;
      saveThemeLocal({ ...state, tertiaryColor: state.tertiaryColor });
    },
    setCustomComponents: (state, { payload }) => {
      state.customComponents = payload.customComponents;
      saveThemeLocal({ ...state, customComponents: state.customComponents });
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
  setBaseColor,
  setSecondaryColor,
  setTertiaryColor,
  setThemeColors,
  setCustomComponents,
} = themeSlice.actions;

export default themeSlice.reducer;
