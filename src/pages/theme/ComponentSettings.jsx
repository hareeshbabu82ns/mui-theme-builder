import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPONENT_SETTINGS } from "./utils";
import {
  Box,
  IconButton,
  Paper,
  Slider,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepmerge } from "@mui/utils";
import DeleteIcon from "@mui/icons-material/Delete";
import { get } from "utils";
import SketchColorPicker from "components/SketchColorPicker";
import { debounce } from "utils/debounceHook";
import { setCustomComponents } from "state/themeSlice";
import Buttons from "pages/elements/samples/Buttons";
import Dividers from "pages/elements/samples/Dividers";
import IconButtons from "pages/elements/samples/IconButtons";
import AppBars from "pages/elements/samples/AppBars";
import ThemeColorPicker from "components/ThemeColorPicker";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";

const ComponentSettings = () => {
  const { component } = useParams();

  const customComponents = useSelector((state) => state.theme.customComponents);
  const dispatch = useDispatch();

  const [settings, setSettings] = useState(
    COMPONENT_SETTINGS.find((s) => s.id === component) ?? {}
  );
  // console.log(customComponents);
  useEffect(() => {
    setSettings(COMPONENT_SETTINGS.find((s) => s.id === component) ?? {});
  }, [component]);

  const handleStyleOverrides = (styleObj) => {
    const custComp = { [component]: { ...styleObj } };
    const components = deepmerge(customComponents, custComp);
    // console.log(components);
    dispatch(setCustomComponents(components));
  };
  const debouncedStyleChange = debounce(
    (styleObj) => handleStyleOverrides(styleObj),
    500
  );

  return (
    <Box id={component} sx={{ mt: 2 }}>
      {/* <Typography variant="h5">
        <span style={{ fontWeight: "bold" }}>{settings.element}</span> Settings
      </Typography> */}

      <Stack direction={{ xs: "column-reverse", lg: "row" }} gap={4}>
        <Box flex={1}>
          {settings.styleOverrides && (
            <StyleOverrides
              settingConfig={settings.styleOverrides}
              settingData={customComponents[component]?.styleOverrides}
              onChange={debouncedStyleChange}
            />
          )}
        </Box>
        <Box flex={1}>
          <ComponentsDemo component={component} />
        </Box>
      </Stack>

      {/* <pre> {JSON.stringify(settings, null, "\t")}</pre> */}
    </Box>
  );
};

const ComponentsDemo = ({ component }) => {
  switch (component) {
    case "MuiButton":
      return <Buttons />;
    case "MuiDivider":
      return <Dividers />;
    case "MuiIconButton":
      return <IconButtons />;
    case "MuiAppBar":
      return <AppBars />;
    default:
      return <>No Demo Components for {component}</>;
  }
};

const StyleOverrides = ({ settingConfig, settingData, onChange }) => {
  const theme = useTheme();

  const handleStyleChange = (style, attribute, value) => {
    // console.log(style, attribute, value);
    if (onChange)
      onChange({ styleOverrides: { [style]: { [attribute]: value } } });
  };

  return (
    <>
      <Typography
        variant="h5"
        fontWeight="bold"
        color={theme.palette.info.main}
      >
        StyleOverrides
      </Typography>
      <Stack gap={4} mt={1}>
        {Object.entries(settingConfig).map(([styleId, v]) => {
          // each style override
          return (
            <Box key={styleId} border={0}>
              <Typography
                variant="h5"
                fontWeight="bold"
                color={theme.palette.tertiary.main}
                px={1}
              >
                {styleId}
              </Typography>
              <Stack gap={2} mt={1}>
                {Object.entries(v).map(([attrId, settingConfig]) => {
                  // each style attribute
                  const sData = get(settingData, `${styleId}.${attrId}`, "");
                  return (
                    <StyleAttribute
                      key={attrId}
                      settingId={attrId}
                      settingConfig={settingConfig}
                      settingData={sData}
                      onChange={(value) =>
                        handleStyleChange(styleId, attrId, value)
                      }
                    />
                  );
                })}
              </Stack>
              {/* <pre>
              {k}-{JSON.stringify(v, null, "\t")}
            </pre> */}
            </Box>
          );
        })}
      </Stack>
    </>
  );
};

const StyleAttribute = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  switch (settingConfig?.type) {
    case "color":
      return (
        <StyleAttributeColor
          settingId={settingId}
          settingConfig={settingConfig}
          settingData={settingData}
          onChange={onChange}
        />
      );
    case "spacing":
    case "pixels":
      return (
        <StyleAttributeSpacing
          settingId={settingId}
          settingConfig={settingConfig}
          settingData={settingData}
          onChange={onChange}
        />
      );
    default:
      return null;
  }
};

const StyleAttributeColor = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  const theme = useTheme();
  const c = settingData?.startsWith("theme.")
    ? get(theme, settingData.replace("theme.", ""))
    : settingData;

  const [color, setColor] = useState(c);

  const [colorPath, setColorPath] = useState(
    settingData?.startsWith("theme.") ? settingData : ""
  );

  const handleColorChange = (color) => {
    setColor(color);
    setColorPath("");
    if (onChange) onChange(color);
  };

  const handleThemeColorChange = (color) => {
    setColor(get(theme, color.replace("theme.", "")));
    setColorPath(color);
    if (onChange) onChange(color);
  };

  return (
    <Paper>
      <Stack gap={2}>
        <AttributeTitle
          attributeId={settingId}
          handleAttributeDelete={() => handleColorChange(undefined)}
        />
        <Stack
          gap={2}
          px={2}
          py={1}
          direction={{ xs: "column", md: "row" }}
          alignItems={{ xs: "stretch", md: "center" }}
        >
          <Box sx={{ flex: 2 }}>
            <ThemeColorPicker
              colorKey={settingId}
              themeColorPath={colorPath}
              onChange={handleThemeColorChange}
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <SketchColorPicker
              // colorKey={settingId}
              color={color}
              varient="chrome"
              onChange={handleColorChange}
            />
          </Box>
        </Stack>
        {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
      </Stack>
    </Paper>
  );
};

const StyleAttributeSpacing = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  // const theme = useTheme();
  const s =
    typeof settingData === "string"
      ? settingData?.startsWith("theme.spacing")
        ? Number(settingData.match(/\d(?=\))/)?.[0] ?? "0")
        : Number(settingData?.replace("px", ""))
      : settingData ?? 0;
  const [space, setSpace] = useState(s);
  const handleSpaceChange = (e, space) => {
    setSpace(space || 0);
    if (onChange)
      onChange(
        space
          ? settingConfig?.type === "pixels"
            ? `${space}px`
            : `theme.spacing(${space})`
          : space
      );
  };

  return (
    <Paper variant="rounded">
      <Stack gap={2}>
        <AttributeTitle
          attributeId={settingId}
          handleAttributeDelete={() => handleSpaceChange(undefined)}
        />
        <Box mx={2} px={2} py={1}>
          <Slider
            value={space}
            min={settingConfig?.min || 0}
            max={settingConfig?.max || 9}
            step={settingConfig?.step || 1}
            size="medium"
            aria-label="spacing"
            valueLabelDisplay="auto"
            onChange={handleSpaceChange}
          />
        </Box>
        {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
      </Stack>
    </Paper>
  );
};

const AttributeTitle = ({ attributeId, handleAttributeDelete }) => {
  const theme = useTheme();
  return (
    <Grid2
      container
      spacing={1}
      alignItems="center"
      // borderBottom={"dashed 1px"}
      px={2}
      pt={1}
    >
      <Grid2 xs>
        <Typography
          variant="h6"
          fontWeight="bold"
          color={theme.palette.info.main}
        >
          {attributeId}
        </Typography>
      </Grid2>
      <Grid2 xs="auto">
        <IconButton size="small" onClick={handleAttributeDelete}>
          <DeleteIcon />
        </IconButton>
      </Grid2>
    </Grid2>
  );
};

export default ComponentSettings;
