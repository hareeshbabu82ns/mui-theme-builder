import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPONENT_SETTINGS } from "./utils";
import { Box, Stack, Typography, useTheme } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepmerge } from "@mui/utils";
import { get } from "utils";
import SketchColorPicker from "components/SketchColorPicker";
import { debounce } from "utils/debounceHook";
import { setCustomComponents } from "state/themeSlice";

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
    console.log(components);
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

      <Stack direction="row">
        <Box flex={1}>
          {settings.styleOverrides && (
            <StyleOverrides
              settingConfig={settings.styleOverrides}
              settingData={customComponents[component]?.styleOverrides}
              onChange={debouncedStyleChange}
            />
          )}
        </Box>
        <Box flex={1}>Compoment Demo</Box>
      </Stack>

      {/* <pre> {JSON.stringify(settings, null, "\t")}</pre> */}
    </Box>
  );
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
      {Object.entries(settingConfig).map(([styleId, v]) => {
        // each style override
        return (
          <Box key={styleId}>
            <Typography fontWeight="bold">{styleId}</Typography>
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
            {/* <pre>
              {k}-{JSON.stringify(v, null, "\t")}
            </pre> */}
          </Box>
        );
      })}
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
    <>
      {/* <Typography fontWeight="bold">{settingId}</Typography> */}
      <SketchColorPicker
        colorKey={settingId}
        color={color}
        varient="chrome"
        onChange={handleColorChange}
      />
      {/* <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre> */}
    </>
  );
};

const StyleAttributeSpacing = ({
  settingId,
  settingConfig,
  settingData,
  onChange,
}) => {
  return (
    <>
      <Typography fontWeight="bold">{settingId}</Typography>
      <pre>{JSON.stringify(settingConfig, null, "\t")}</pre>
      <pre>{JSON.stringify(settingData, null, "\t")}</pre>
    </>
  );
};

export default ComponentSettings;
