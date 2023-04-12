import { Box, Stack, Typography, useTheme } from "@mui/material";
import { get } from "utils";
import StyleAttribute from "./StyleAttribute";

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

export default StyleOverrides;
