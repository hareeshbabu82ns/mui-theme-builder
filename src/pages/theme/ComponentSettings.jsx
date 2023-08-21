import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { COMPONENT_SETTINGS } from "./utils";
import { Box, Stack } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { deepmerge } from "@mui/utils";

import { debounce } from "utils/debounceHook";
import { setCustomComponents } from "state/themeSlice";

import StyleOverrides from "./components/StyleOverrides";
import ComponentsDemo from "./components/ComponentsDemo";

const ComponentSettings = () => {
  const { component } = useParams();

  const customComponents = useSelector( ( state ) => state.theme.customComponents );
  const dispatch = useDispatch();

  const [ settings, setSettings ] = useState(
    COMPONENT_SETTINGS.find( ( s ) => s.id === component ) ?? {}
  );
  // console.log(customComponents);
  useEffect( () => {
    setSettings( COMPONENT_SETTINGS.find( ( s ) => s.id === component ) ?? {} );
  }, [ component ] );

  const handleStyleOverrides = ( styleObj ) => {
    const custComp = { [ component ]: { ...styleObj } };
    const components = deepmerge( customComponents, custComp );
    // console.log(components);
    dispatch( setCustomComponents( components ) );
  };
  const debouncedStyleChange = debounce(
    ( styleObj ) => handleStyleOverrides( styleObj ),
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
              settingData={customComponents[ component ]?.styleOverrides}
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

export default ComponentSettings;
