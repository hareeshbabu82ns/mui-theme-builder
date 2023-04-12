const SETTING_PIXELS = {
  type: "pixels",
  min: 0,
  max: 300,
  step: 8,
};
const SETTING_SPACING = {
  type: "spacing",
  min: 0,
  max: 9,
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
          ...SETTING_PIXELS,
          max: 30,
          step: 2,
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
  {
    id: "MuiDrawer",
    element: "MuiDrawer",
    title: "Drawer",
    styleOverrides: {
      paper: {
        border: {
          ...SETTING_SPACING,
        },
        background: {
          ...SETTING_COLOR,
        },
        color: {
          ...SETTING_COLOR,
        },
      },
    },
  },
  {
    id: "MuiPaper",
    element: "MuiPaper",
    title: "Paper",
    defaultProps: {
      ...SETTING_SPACING,
    },
    styleOverrides: {
      root: {
        color: {
          ...SETTING_COLOR,
        },
      },
      rounded: {
        borderRadius: {
          ...SETTING_PIXELS,
        },
        background: {
          ...SETTING_COLOR,
        },
      },
      outlined: {
        borderColor: {
          ...SETTING_COLOR,
        },
        background: {
          ...SETTING_COLOR,
        },
      },
    },
  },
];
