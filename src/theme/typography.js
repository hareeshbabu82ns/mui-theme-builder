/**
 * Typography used in theme
 * @param {JsonObject} theme theme customizations object
 */

export default function themeTypography(theme, customizations) {
  return {
    fontFamily: customizations.fontFamily,
    // fontSize: "1rem",
    h6: {
      color: theme.palette.text.heading,
      fontWeight: 600,
      fontSize: "1rem",
      lineHeight: "1.2rem",
    },
    h5: {
      fontWeight: 600,
      fontSize: "1.125rem",
      lineHeight: "1.6rem",
      color: theme.palette.text.heading,
    },
    h4: {
      color: theme.palette.text.heading,
      fontWeight: 600,
      fontSize: "1.3125rem",
      lineHeight: "1.6rem",
    },
    h3: {
      color: theme.palette.text.heading,
      fontWeight: 600,
      fontSize: "1.5rem",
      lineHeight: "1.75rem",
      fontFamily: customizations.fontFamily,
    },
    h2: {
      color: theme.palette.text.heading,
      fontWeight: 600,
      fontSize: "1.875rem",
      lineHeight: "2.25rem",
      fontFamily: customizations.fontFamily,
    },
    h1: {
      color: theme.palette.text.heading,
      fontWeight: 600,
      fontSize: "2.25rem",
      lineHeight: "2.75rem",
      fontFamily: customizations.fontFamily,
    },
    subtitle1: {
      color: theme.palette.text.primary,
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    subtitle2: {
      color: theme.palette.text.secondary,
      fontSize: "0.875rem",
      fontWeight: 400,
    },
    caption: {
      fontSize: "0.75rem",
      color: theme.palette.text.secondary,
      fontWeight: 400,
    },
    body1: {
      fontSize: "0.875rem",
      fontWeight: 400,
      lineHeight: "1.334em",
      color: theme.palette.text.primary,
    },
    body2: {
      letterSpacing: "0em",
      fontWeight: 400,
      lineHeight: "1.5em",
      color: theme.palette.text.secondary,
    },
    button: {
      textTransform: "capitalize",
      color: theme.palette.text.primary,
    },
    customInput: {
      marginTop: 1,
      marginBottom: 1,
      "& > label": {
        top: 23,
        left: 0,
        color: theme.palette.grey[500],
        '&[data-shrink="false"]': {
          top: 5,
        },
      },
      "& > div > input": {
        padding: "30.5px 14px 11.5px !important",
      },
      "& legend": {
        display: "none",
      },
      "& fieldset": {
        top: 0,
      },
    },
    mainContent: {
      backgroundColor: theme.palette.background.default,
      width: "100%",
      minHeight: "calc(100vh - 88px)",
      flexGrow: 1,
      padding: "20px",
      marginTop: "88px",
      marginRight: "20px",
      borderRadius: `${customizations.borderRadius}px`,
    },
    menuCaption: {
      fontSize: "0.875rem",
      fontWeight: 500,
      color: theme.palette.text.heading,
      padding: "6px",
      textTransform: "capitalize",
      marginTop: "10px",
    },
    subMenuCaption: {
      fontSize: "0.6875rem",
      fontWeight: 500,
      color: theme.palette.text.secondary,
      textTransform: "capitalize",
    },
    commonAvatar: {
      cursor: "pointer",
      borderRadius: "8px",
    },
    smallAvatar: {
      width: "22px",
      height: "22px",
      fontSize: "1rem",
    },
    mediumAvatar: {
      width: "34px",
      height: "34px",
      fontSize: "1.2rem",
    },
    largeAvatar: {
      width: "44px",
      height: "44px",
      fontSize: "1.5rem",
    },
  };
}
