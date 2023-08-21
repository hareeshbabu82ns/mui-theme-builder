import React, { useState } from "react";
import {
  Box,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Stack,
  useMediaQuery,
  useTheme,
} from "@mui/material";

import Header from "components/Header";
import FlexBetween from "components/FlexBetween";
import ThemeGenerator from "components/ThemeGenerator";
import { Outlet, useNavigate, useParams } from "react-router-dom";
import { COMPONENT_SETTINGS } from "./utils";

const ThemePage = () => {
  const theme = useTheme();

  const navigate = useNavigate();

  const params = useParams();

  const [ component, setComponent ] = useState( params?.component ?? "" );

  const handleComponentSelect = ( e ) => {
    setComponent( e.target.value );
    navigate( e.target.value );
  };

  return (
    <Box margin={{ xs: "1rem 2rem", lg: "0" }}>
      <FlexBetween>
        <Header title="Theme Settings" subtitle="Manage Theme Settings" />
      </FlexBetween>

      <Stack direction="column" gap={2}>
        <ThemeGenerator />

        <Stack
          backgroundColor={theme.palette.background.tile}
          p="1rem"
          mt="1rem"
          gap={2}
        >
          <FormControl fullWidth>
            <InputLabel id="component-select-label">
              Select Component
            </InputLabel>
            <Select
              labelId="component-select-label"
              id="component-select"
              value={component}
              label="Select Component"
              onChange={handleComponentSelect}
              displayEmpty
            >
              {COMPONENT_SETTINGS.map( ( c ) => (
                <MenuItem key={c.id} value={c.id}>
                  {c.title}
                </MenuItem>
              ) )}
            </Select>
          </FormControl>

          <Outlet />
        </Stack>
      </Stack>
    </Box>
  );
};

export default ThemePage;
