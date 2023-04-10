import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPONENT_SETTINGS } from "./utils";
import { Box, Slider, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepmerge } from "@mui/utils";
import { get } from "utils";
import SketchColorPicker from "components/SketchColorPicker";
import { debounce } from "utils/debounceHook";
import { setCustomComponents } from "state/themeSlice";
import Buttons from "pages/elements/samples/Buttons";
import Dividers from "pages/elements/samples/Dividers";
import IconButtons from "pages/elements/samples/IconButtons";

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
      <Typography variant="h5">
        <span style={{ fontWeight: "bold" }}>{settings.element}</span> Settings
      </Typography>

      <Stack direction="row" gap={4}>
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
    default:
      return <>No Demo Components for {component}</>;
  }
};

const StyleOverrides = ({ settingConfig, settingData, onChange }) => {
  const handleStyleChange = (style, attribute, value) => {
    // console.log(style, attribute, value);
    if (onChange)
      onChange({ styleOverrides: { [style]: { [attribute]: value } } });
  };

  return (
    <>
      <Typography fontWeight="bold">StyleOverrides</Typography>
      <Stack gap={2} mt={1}>
        {Object.entries(settingConfig).map(([styleId, v]) => {
          // each style override
          return (
            <Box key={styleId} border={1} p={2}>
              <Typography fontWeight="bold">{styleId}</Typography>
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
  const handleColorChange = (color) => {
    setColor(color);
    if (onChange) onChange(color);
  };

  return (
    <Stack gap={2}>
      <Typography fontWeight="bold">{settingId}</Typography>
      <SketchColorPicker
        colorKey={settingId}
        color={color}
        varient="chrome"
        onChange={handleColorChange}
      />
      {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
    </Stack>
  );
};

const StyleAttributeSpacing = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  const s =
    typeof settingData === "string"
      ? settingData?.startsWith("theme.spacing")
        ? Number(settingData.match(/\d(?=\))/)?.[0] ?? "0")
        : Number(settingData?.replace("px", ""))
      : settingData ?? 0;
  const [space, setSpace] = useState(s);
  const handleSpaceChange = (e, space) => {
    setSpace(space);
    if (onChange) onChange(`theme.spacing(${space})`);
  };

  return (
    <>
      <Typography fontWeight="bold">{settingId}</Typography>
      <Slider
        value={space}
        max={9}
        size="medium"
        aria-label="spacing"
        valueLabelDisplay="auto"
        onChange={handleSpaceChange}
      />
      {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
    </>
  );
};

export default ComponentSettings;
