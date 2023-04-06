import { alpha, darken, lighten } from "@mui/material";
import paletteGen from "./generate-material-palette";

// (mode: M3ThemeMode, scheme: M3ColorTokens, tones?: M3ThemeTones) => ThemeOptions
export const getDesignTokens = ({ mode, scheme, tones, customizations }) => {
  const isDark = mode === "dark";
  return {
    palette: {
      mode,
      isDark,
      primary: {
        main: scheme.primary,
        contrastText: scheme.onPrimary,
        ...paletteGen({ hex: scheme.primary, isDark }),
      },
      onPrimary: {
        main: scheme.onPrimary,
        contrastText: scheme.primary,
      },
      primaryContainer: {
        main: scheme.primaryContainer,
        contrastText: scheme.onPrimaryContainer,
      },
      onPrimaryContainer: {
        main: scheme.onPrimaryContainer,
        contrastText: scheme.primaryContainer,
      },
      secondary: {
        main: scheme.secondary,
        contrastText: scheme.onSecondary,
        ...paletteGen({ hex: scheme.secondary, isDark }),
      },
      onSecondary: {
        main: scheme.onSecondary,
        contrastText: scheme.secondary,
      },
      secondaryContainer: {
        main: scheme.secondaryContainer,
        contrastText: scheme.onSecondaryContainer,
      },
      onSecondaryContainer: {
        main: scheme.onSecondaryContainer,
        contrastText: scheme.secondaryContainer,
      },
      tertiary: {
        main: scheme.tertiary,
        contrastText: scheme.onTertiary,
        ...paletteGen({ hex: scheme.tertiary, isDark }),
      },
      onTertiary: {
        main: scheme.onTertiary,
        contrastText: scheme.tertiary,
      },
      tertiaryContainer: {
        main: scheme.tertiaryContainer,
        contrastText: scheme.onTertiaryContainer,
      },
      onTertiaryContainer: {
        main: scheme.onTertiaryContainer,
        contrastText: scheme.tertiary,
      },
      error: {
        main: scheme.error,
        contrastText: scheme.onError,
        ...paletteGen({ hex: scheme.error, isDark }),
      },
      onError: {
        main: scheme.onError,
        contrastText: scheme.error,
      },
      errorContainer: {
        main: scheme.errorContainer,
        contrastText: scheme.onErrorContainer,
      },
      onErrorContainer: {
        main: scheme.onErrorContainer,
        contrastText: scheme.errorContainer,
      },
      background2: {
        main: scheme.background,
        contrastText: scheme.onBackground,
      },
      onBackground: {
        main: scheme.onBackground,
        contrastText: scheme.background,
      },
      surface: {
        main: scheme.surface,
        contrastText: scheme.onSurface,
      },
      onSurface: {
        main: scheme.onSurface,
        contrastText: scheme.surface,
      },
      surfaceVariant: {
        main: scheme.surfaceVariant,
        contrastText: scheme.onSurfaceVariant,
      },
      onSurfaceVariant: {
        main: scheme.onSurfaceVariant,
        contrastText: scheme.surfaceVariant,
      },
      inverseSurface: {
        main:
          scheme.inverseSurface ||
          (mode === "light" ? tones?.neutral[20] : tones?.neutral[90]),
        contrastText:
          scheme.inverseOnSurface ||
          (mode === "light" ? tones?.neutral[95] : tones?.neutral[20]),
      },
      inverseOnSurface: {
        main:
          scheme.inverseOnSurface ||
          (mode === "light" ? tones?.neutral[95] : tones?.neutral[20]),
        contrastText:
          scheme.inverseSurface ||
          (mode === "light" ? tones?.neutral[20] : tones?.neutral[90]),
      },
      inversePrimary: {
        main:
          scheme.inversePrimary ||
          (mode === "light" ? tones?.neutral[80] : tones?.neutral[40]),
        contrastText: scheme.primary,
      },

      surfaceTint: scheme.primary,
      outline: scheme.outline,
      shadow: scheme.shadow,

      background: {
        // default: scheme.background,
        // paper: scheme.surface,
        default: isDark
          ? darken(scheme.primary, 0.75)
          : lighten(scheme.primary, 0.9),
        paper: isDark
          ? darken(scheme.primary, 0.75)
          : lighten(scheme.primary, 0.9),
        alt: isDark
          ? darken(scheme.primary, 0.6)
          : lighten(scheme.primary, 0.7),
        tile: isDark
          ? darken(scheme.primary, 0.65)
          : lighten(scheme.primary, 0.75),
      },
      common: {
        white: scheme.background,
        black: scheme.onBackground,
      },
      text: {
        primary: scheme.onSurface,
        secondary: scheme.onSecondaryContainer,
      },
      divider: scheme.outline,
    },
    tones,
  };
};

// returns { components: Theme["components"] }
export const getThemedComponents = (
  theme, //: Theme
  customizations
) => {
  return {
    components: {
      MuiCssBaseline: {
        defaultProps: {
          enableColorScheme: true,
        },
      },
      MuiDivider: {
        styleOverrides: {
          root: {
            borderColor: theme.palette.outline,
            backgroundColor: theme.palette.outline,
          },
        },
      },
      MuiIconButton: {
        styleOverrides: {
          root: {
            padding: theme.spacing(1),
          },
        },
      },
      MuiTabs: {
        styleOverrides: {
          root: {
            marginLeft: theme.spacing(1),
          },
          indicator: {
            height: 3,
            borderTopLeftRadius: 3,
            borderTopRightRadius: 3,
          },
        },
      },
      MuiTab: {
        styleOverrides: {
          root: {
            textTransform: "none",
            margin: "0 16px",
            minWidth: 0,
            padding: 0,
            [theme.breakpoints.up("md")]: {
              padding: 0,
              minWidth: 0,
            },
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            background: theme.palette.surface.main,
            color: theme.palette.onSurface.main,
            transition: theme.transitions.create(
              ["background-color", "box-shadow", "color"],
              {
                duration: theme.transitions.duration.short,
              }
            ),
          },
          colorDefault: {
            background: theme.palette.surface.main,
            color: theme.palette.onSurface.main,
            transition: theme.transitions.create(
              ["background-color", "box-shadow", "color"],
              {
                duration: theme.transitions.duration.short,
              }
            ),
          },
          colorPrimary: {
            background:
              theme.palette.mode === "light"
                ? lighten(theme.palette.primary.main, 0.85)
                : darken(theme.palette.primary.main, 0.8),
            color: theme.palette.surface.contrastText,
            transition: theme.transitions.create(
              ["background-color", "box-shadow", "color"],
              {
                duration: theme.transitions.duration.short,
              }
            ),
          },
        },
      },
      MuiButton: {
        styleOverrides: {
          root: {
            // borderRadius: `${customizations?.radius || "10"}px`,
            borderRadius: "4px",
            textTransform: "none",
            fontWeight: "bold",
          },
          outlined: {
            borderColor: theme.palette.outline,
            //background: theme.palette.surface.main,
          },
        },
        variants: [
          {
            props: { variant: "elevated" },
            style: {
              boxShadow: theme.shadows[1],
              background: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
              "&:hover": {
                background: alpha(theme.palette.primary.main, 0.15),
              },
            },
          },
          {
            props: { variant: "filled" },
            style: {
              background: theme.palette.primary.main,
              color: theme.palette.onPrimary.main,
              "&:hover": {
                boxShadow: theme.shadows[1],
                background: alpha(theme.palette.primary.main, 0.85),
              },
            },
          },
          {
            props: { variant: "tonal" },
            style: {
              background: theme.palette.secondaryContainer.main,
              color: theme.palette.onSecondaryContainer.main,
              "&:hover": {
                boxShadow: theme.shadows[1],
                background: alpha(theme.palette.secondaryContainer.main, 0.8),
              },
            },
          },
        ],
      },
      MuiFab: {
        styleOverrides: {
          root: {
            borderRadius: "18px",
          },
        },
        variants: [
          {
            props: { variant: "primary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.primaryContainer.main,
              color: theme.palette.onPrimaryContainer.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.primaryContainer.main, 0.08)
                    : darken(theme.palette.primaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "extended", color: "primary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.primaryContainer.main,
              color: theme.palette.onPrimaryContainer.main,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.primaryContainer.main, 0.08)
                    : darken(theme.palette.primaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "secondary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.secondaryContainer.main,
              color: theme.palette.onSecondaryContainer.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.secondaryContainer.main, 0.08)
                    : darken(theme.palette.secondaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "extended", color: "secondary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.secondaryContainer.main,
              color: theme.palette.onSecondaryContainer.main,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.secondaryContainer.main, 0.08)
                    : darken(theme.palette.secondaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "tertiary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.tertiaryContainer.main,
              color: theme.palette.onTertiaryContainer.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.tertiaryContainer.main, 0.08)
                    : darken(theme.palette.tertiaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "extended", color: "tertiary" },
            style: {
              boxShadow: theme.shadows[3],
              background: theme.palette.tertiaryContainer.main,
              color: theme.palette.onTertiaryContainer.main,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: theme.shadows[4],
                background:
                  theme.palette.mode === "dark"
                    ? lighten(theme.palette.tertiaryContainer.main, 0.08)
                    : darken(theme.palette.tertiaryContainer.main, 0.08),
              },
            },
          },
          {
            props: { variant: "surface" },
            style: {
              boxShadow: theme.shadows[3],
              //background: theme.palette.surface.main,
              background: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
              "&:hover": {
                boxShadow: theme.shadows[4],
                background: alpha(theme.palette.primary.main, 0.08),
              },
            },
          },
          {
            props: { variant: "extended", color: "surface" },
            style: {
              boxShadow: theme.shadows[3],
              //background: theme.palette.surface.main,
              background: alpha(theme.palette.primary.main, 0.05),
              color: theme.palette.primary.main,
              fontWeight: "bold",
              "&:hover": {
                boxShadow: theme.shadows[4],
                background: alpha(theme.palette.primary.main, 0.08),
              },
            },
          },
        ],
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: `${customizations?.radius || "10"}px`,
            padding: "10px 8px",
          },
        },
        variants: [
          {
            props: { variant: "elevation" },
            style: {
              boxShadow: theme.shadows[1],
              backgroundColor: alpha(theme.palette.primary.main, 0.05),
              transition: theme.transitions.create(
                ["background-color", "box-shadow", "border-color", "color"],
                {
                  duration: theme.transitions.duration.short,
                }
              ),
              "&:hover": {
                boxShadow: theme.shadows[2],
                background: alpha(theme.palette.primary.main, 0.08),
              },
            },
          },
          {
            props: { variant: "filled" },
            style: {
              backgroundColor: theme.palette.surfaceVariant.main,
              transition: theme.transitions.create(
                ["background-color", "box-shadow", "border-color", "color"],
                {
                  duration: theme.transitions.duration.short,
                }
              ),
              "&:hover": {
                boxShadow: theme.shadows[1],
                background: alpha(theme.palette.surfaceVariant.main, 0.8),
              },
            },
          },
          {
            props: { variant: "outlined" },
            style: {
              backgroundColor: theme.palette.surface.main,
              borderColor: theme.palette.outline,
              transition: theme.transitions.create(
                ["background-color", "box-shadow", "border-color", "color"],
                {
                  duration: theme.transitions.duration.short,
                }
              ),
              "&:hover": {
                boxShadow: theme.shadows[1],
                background: alpha(theme.palette.onSurface.main, 0.05),
              },
            },
          },
        ],
      },
      MuiPaper: {
        defaultProps: {
          elevation: 0,
        },
        styleOverrides: {
          root: {
            backgroundImage: "none",
            // background:
            //   theme.palette.mode === "dark"
            //     ? darken(theme.palette.primary.main, 0.9)
            //     : lighten(theme.palette.primary.main, 0.9),
            color: theme.palette.onSurface.main,
          },
          rounded: {
            borderRadius: `${theme.customization?.borderRadius}px`,
          },
          outlined: {
            borderColor: theme.palette.outline,
            background: theme.palette.surface.main,
          },
        },
      },
      MuiCardHeader: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
            padding: "24px",
          },
          title: {
            fontSize: "1.125rem",
          },
        },
      },
      MuiCardContent: {
        styleOverrides: {
          root: {
            padding: "24px",
          },
        },
      },
      MuiCardActions: {
        styleOverrides: {
          root: {
            padding: "24px",
          },
        },
      },
      MuiDrawer: {
        styleOverrides: {
          root: {
            //background: theme.palette.surface.main,
            //color: theme.palette.onSurface.main,
          },
          paper: {
            border: "0px",
            //background: theme.palette.mode == 'light' ? lighten(theme.palette.primary.main, 0.85) : darken(theme.palette.primary.main, 0.8),
            //color: theme.palette.surface.contrastText,
            background: theme.palette.surface.main,
            color: theme.palette.onSurface.main,
          },
        },
      },
      MuiListItem: {
        styleOverrides: {
          root: {
            paddingTop: 1,
            paddingBottom: 1,
            "& .MuiListItemButton-root": {
              paddingTop: 8,
              paddingBottom: 8,
            },
          },
        },
      },
      // MuiListItemButton: {
      //   styleOverrides: {
      //     root: {
      //       borderRadius: customizations?.radius || 10,
      //       "&.Mui-selected": {
      //         color: theme.palette.onSecondaryContainer.main,
      //         background: theme.palette.secondaryContainer.main,
      //         "& > .MuiListItemText-root > .MuiTypography-root": {
      //           fontWeight: "bold",
      //         },
      //       },
      //     },
      //   },
      // },
      MuiListItemButton: {
        styleOverrides: {
          root: {
            color: theme.palette.text.primary,
            // borderRadius: customizations?.radius || 10,
            paddingTop: "10px",
            paddingBottom: "10px",
            "&.Mui-selected": {
              background: theme.palette.secondaryContainer.main,
              color: theme.palette.onSecondaryContainer.main,
              "&:hover": {
                color: theme.palette.onSecondaryContainer.main,
                background: alpha(theme.palette.secondaryContainer.main, 0.8),
              },
              "& .MuiListItemIcon-root": {
                color: theme.palette.secondary.main,
              },
              "& > .MuiListItemText-root > .MuiTypography-root": {
                fontWeight: "bold",
              },
            },
            "&:hover": {
              color: theme.palette.onSecondary.main,
              background: alpha(theme.palette.secondary.main, 0.8),
              "& .MuiListItemIcon-root": {
                color: theme.palette.onSecondaryContainer.main,
              },
            },
            "& .MuiListItemIcon-root": {
              color: theme.palette.secondary.main,
            },
          },
        },
      },
      MuiListItemIcon: {
        styleOverrides: {
          root: {
            color: "inherit",
            // color: theme.palette.text.primary,
            minWidth: 32,
            "&.Mui-selected": {
              fontWeight: "bold",
            },
          },
        },
      },
      MuiListItemText: {
        styleOverrides: {
          primary: {
            color: "inherit",
          },
        },
      },
      MuiInputBase: {
        styleOverrides: {
          input: {
            color: theme.palette.onSurface.main,
            "&::placeholder": {
              color: theme.palette.secondary.main,
              fontSize: "0.875rem",
            },
          },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            // background: bgColor,
            borderRadius: `${theme.customization?.borderRadius}px`,
            "& .MuiOutlinedInput-notchedOutline": {
              // borderColor: theme.palette.grey[400],
              borderColor: theme.palette.outline,
            },
            "&:hover $notchedOutline": {
              // borderColor: theme.palette.primary[700],
              borderColor: alpha(theme.palette.outline, 0.8),
            },
            "&.MuiInputBase-multiline": {
              padding: 1,
            },
          },
          input: {
            fontWeight: 500,
            // background: bgColor,
            padding: "15.5px 14px",
            borderRadius: `${theme.customization?.borderRadius}px`,
            "&.MuiInputBase-inputSizeSmall": {
              padding: "10px 14px",
              "&.MuiInputBase-inputAdornedStart": {
                paddingLeft: 0,
              },
            },
          },
          inputAdornedStart: {
            paddingLeft: 4,
          },
          notchedOutline: {
            borderRadius: `${theme.customization?.borderRadius}px`,
          },
        },
      },
      MuiSlider: {
        styleOverrides: {
          root: {
            "&.Mui-disabled": {
              color: theme.palette.grey[300],
            },
          },
          mark: {
            backgroundColor: theme.palette.background.paper,
            width: "4px",
          },
          valueLabel: {
            color: theme.palette.primary[800],
          },
        },
      },
      MuiAvatar: {
        styleOverrides: {
          root: {
            color: theme.palette.primary[200],
            background: theme.palette.primary[500],
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: {
            "&.MuiChip-deletable .MuiChip-deleteIcon": {
              color: "inherit",
            },
          },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            background: theme.palette.secondaryContainer.main,
            color: theme.palette.secondaryContainer.contrastText,
          },
        },
      },
      MuiDataGrid: {
        styleOverrides: {
          root: {
            "& .MuiToolbar-root > *": {
              color: theme.palette.primaryContainer.contrastText,
            },
          },
          virtualScroller: {
            background: theme.palette.primaryContainer.main,
          },
          footerContainer: {
            color: theme.palette.secondaryContainer.contrastText,
            background: theme.palette.secondaryContainer.main,
          },
          columnHeaders: {
            color: theme.palette.secondaryContainer.contrastText,
            background: theme.palette.secondaryContainer.main,
          },
        },
      },
      MuiAccordion: {
        styleOverrides: {
          root: {
            "&:before": {
              backgroundColor: theme.palette.surfaceVariant.main,
            },
            "&.Mui-disabled": {
              backgroundColor: theme.palette.inverseOnSurface.main,
              color: theme.palette.inverseSurface.main,
            },
          },
        },
      },
      MuiSnackbarContent: {
        styleOverrides: {
          root: {
            backgroundColor: theme.palette.inverseSurface.main,
          },
          message: {
            color: theme.palette.inverseOnSurface.main,
          },
          action: {
            color: theme.palette.inversePrimary.main,
          },
        },
      },
      MuiSwitch: {
        styleOverrides: {
          root: {
            width: 42,
            height: 26,
            padding: 0,
            marginLeft: 12,
            marginRight: 8,
            "& .MuiSwitch-switchBase": {
              padding: 0,
              margin: 7,
              transitionDuration: "100ms",
              "&.Mui-checked": {
                transform: "translateX(16px)",
                margin: 4,
                "& + .MuiSwitch-track": {
                  backgroundColor: theme.palette.primary.main,
                  opacity: 1,
                  border: 0,
                },
                "& .MuiSwitch-thumb": {
                  color: theme.palette.onPrimary.main,
                  width: 18,
                  height: 18,
                },
                /*'& .MuiSwitch-thumb:before': {
                                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                                        theme.palette.primary.main,
                                    )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                                },
                                '&.Mui-disabled .MuiSwitch-thumb:before': {
                                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="12" width="12" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
                                        alpha(theme.palette.onSurfaceVariant.main, 0.28),
                                    )}" d="M21,7L9,19L3.5,13.5L4.91,12.09L9,16.17L19.59,5.59L21,7Z"/></svg>')`,
                                },*/
                "&.Mui-disabled + .MuiSwitch-track": {
                  backgroundColor: alpha(theme.palette.onSurface.main, 0.1),
                },
                "&.Mui-disabled .MuiSwitch-thumb": {
                  color: alpha(theme.palette.surface.main, 0.8),
                },
              },
              "&.Mui-focusVisible .MuiSwitch-thumb": {
                color: theme.palette.primary.main,
                border: `6px solid ${theme.palette.primary.contrastText}`,
              },
              "&.Mui-disabled .MuiSwitch-thumb": {
                color: alpha(theme.palette.onSurface.main, 0.3),
              },
            },
            "& .MuiSwitch-thumb": {
              boxSizing: "border-box",
              color: theme.palette.outline,
              width: 12,
              height: 12,
              "&:before": {
                content: "''",
                position: "absolute",
                width: "100%",
                height: "100%",
                left: 0,
                top: 0,
                backgroundRepeat: "no-repeat",
                backgroundPosition: "center",
              },
            },
            "& .MuiSwitch-track": {
              borderRadius: 26 / 2,
              border: `1px solid ${theme.palette.outline}`,
              backgroundColor: theme.palette.surfaceVariant.main,
              opacity: 1,
              transition: theme.transitions.create(["background-color"], {
                duration: 500,
              }),
            },
          },
        },
      },
    },
  };
};
