const SETTING_SPACING = {
  type: "spacing",
};
const SETTING_COLOR = {
  type: "color",
};
export const COMPONENT_SETTINGS = [
  {
    id: "MuiDivider",
    element: "MuiDivider",
    title: "Divider",
    styleOverrides: {
      root: {
        borderColor: {
          ...SETTING_COLOR,
        },
        backgroundColor: {
          ...SETTING_COLOR,
        },
      },
    },
  },
  {
    id: "MuiButton",
    element: "MuiButton",
    title: "Button",
    styleOverrides: {
      outlined: {
        borderColor: {
          ...SETTING_COLOR,
        },
      },
    },
  },
  {
    id: "MuiIconButton",
    element: "MuiIconButton",
    title: "IconButton",
    styleOverrides: {
      root: {
        padding: {
          ...SETTING_SPACING,
        },
      },
    },
  },
  {
    id: "MuiAppBar",
    element: "MuiAppBar",
    title: "AppBar",
    styleOverrides: {
      colorDefault: {
        background: {
          ...SETTING_COLOR,
        },
        color: {
          ...SETTING_COLOR,
        },
      },
      colorPrimary: {
        background: {
          ...SETTING_COLOR,
        },
        color: {
          ...SETTING_COLOR,
        },
      },
    },
  },
];
