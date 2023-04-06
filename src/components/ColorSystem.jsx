import {
  Box,
  Grid,
  ListItem,
  ListItemText,
  Typography,
  useTheme,
} from "@mui/material";
import tinycolor from "tinycolor2";
import { toast } from "react-toastify";

const ColorSystem = () => {
  return (
    <>
      <Typography variant="h4" marginBottom={2}>
        Color System
      </Typography>

      <PaletteMainColors />

      <PaletteColorVariations />

      <PaletteColorTones />
    </>
  );
};

const PaletteColorTones = () => {
  const theme = useTheme();
  if (!theme.tones) return null;
  return (
    <Box
      backgroundColor={theme.palette.background.tile}
      p="1rem"
      borderRadius="0.55rem"
    >
      <Typography variant="h4" marginBottom={2}>
        Color Tones
      </Typography>
      {Object.entries(theme.tones).map(([k, v]) => {
        return (
          <Box key={k}>
            <Typography variant="h5" marginBottom={2}>
              {k}
            </Typography>
            <Grid container columns={13} marginBottom={2}>
              {Object.entries(v).map(([k1, v1]) => {
                return (
                  <Grid item xs={6} md={3} xl={1} key={k1}>
                    <ColorBox
                      title={k1}
                      path={`theme.tones.${k}.${k1}`}
                      color={v1}
                      onColor={theme.palette.getContrastText(v1)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
    </Box>
  );
};
const PaletteColorVariations = () => {
  const theme = useTheme();
  if (!theme.tones) return null;
  return (
    <Box
      backgroundColor={theme.palette.background.tile}
      p="1rem"
      borderRadius="0.55rem"
    >
      <Typography variant="h4" marginBottom={2}>
        Color Palettes
      </Typography>
      {Object.keys(theme.tones).map((k) => {
        if (!theme.palette[k]) return null;
        return (
          <Box key={`p-${k}`}>
            <Typography variant="h5" marginBottom={2}>
              {k}
            </Typography>
            <Grid container columns={18} marginBottom={2}>
              {Object.entries(theme.palette[k] || []).map(([k1, v1]) => {
                return (
                  <Grid item xs={9} md={4} xl={2} xxl={1} key={`p-${k1}`}>
                    <ColorBox
                      title={k1}
                      path={`theme.palette.${k}.${k1}`}
                      color={v1}
                      onColor={theme.palette.getContrastText(v1)}
                    />
                  </Grid>
                );
              })}
            </Grid>
          </Box>
        );
      })}
      {/* print rest of palettes */}
      <PrintPaletteColorVariations
        palette={theme.palette.background}
        title="background"
        getContrastText={theme.palette.getContrastText}
      />
      <PrintPaletteColorVariations
        palette={theme.palette.text}
        title="text"
        getContrastText={theme.palette.getContrastText}
      />
      <PrintPaletteColorVariations
        palette={theme.palette.success}
        title="success"
        getContrastText={theme.palette.getContrastText}
      />
      <PrintPaletteColorVariations
        palette={theme.palette.info}
        title="info"
        getContrastText={theme.palette.getContrastText}
      />
      <PrintPaletteColorVariations
        palette={theme.palette.warning}
        title="warning"
        getContrastText={theme.palette.getContrastText}
      />
      <PrintPaletteColorVariations
        palette={theme.palette.grey}
        title="grey"
        getContrastText={theme.palette.getContrastText}
      />
    </Box>
  );
};

const PrintPaletteColorVariations = ({ palette, title, getContrastText }) => {
  // return <pre>{JSON.stringify(palette)}</pre>;
  return (
    <Box key={`p-${title}`}>
      <Typography variant="h5">{title}</Typography>
      <Grid container columns={18} marginBottom={2}>
        {Object.entries(palette || []).map(([k1, v1]) => {
          return (
            <Grid item xs={9} md={6} xl={2} key={`p-${k1}`}>
              <ColorBox
                title={k1}
                path={`theme.palette.${title}.${k1}`}
                color={v1}
                onColor={getContrastText(v1)}
              />
            </Grid>
          );
        })}
      </Grid>
    </Box>
  );
};

const PaletteMainColors = () => {
  const theme = useTheme();
  return (
    <Box
      backgroundColor={theme.palette.background.tile}
      p="1rem"
      borderRadius="0.55rem"
    >
      <Typography variant="h5" marginBottom={2}>
        Palette Colors
      </Typography>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={1}>
        <Grid item xs={4}>
          <ColorBox
            title="Primary"
            path={"theme.palette.primary.main"}
            color={theme.palette.primary.main}
            onColor={theme.palette.onPrimary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Primary"
            path={"theme.palette.onPrimary.main"}
            color={theme.palette.onPrimary.main}
            onColor={theme.palette.primary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Primary Container"
            path={"theme.palette.primaryContainer.main"}
            color={theme.palette.primaryContainer.main}
            onColor={theme.palette.onPrimaryContainer.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Primary Container"
            path={"theme.palette.onPrimaryContainer.main"}
            color={theme.palette.onPrimaryContainer.main}
            onColor={theme.palette.primaryContainer.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={1}>
        <Grid item xs={4}>
          <ColorBox
            title="Secondary"
            path={"theme.palette.secondary.main"}
            color={theme.palette.secondary.main}
            onColor={theme.palette.onSecondary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Secondary"
            path={"theme.palette.onSecondary.main"}
            color={theme.palette.onSecondary.main}
            onColor={theme.palette.secondary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Secondary Container"
            path={"theme.palette.onSecondary.main"}
            color={theme.palette.onSecondary.main}
            onColor={theme.palette.onSecondaryContainer.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Secondary Container"
            path={"theme.palette.onSecondaryContainer.main"}
            color={theme.palette.onSecondaryContainer.main}
            onColor={theme.palette.secondaryContainer.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={1}>
        <Grid item xs={4}>
          <ColorBox
            title="Tertiary"
            path={"theme.palette.tertiary.main"}
            color={theme.palette.tertiary.main}
            onColor={theme.palette.onTertiary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Tertiary"
            path={"theme.palette.onTertiary.main"}
            color={theme.palette.onTertiary.main}
            onColor={theme.palette.tertiary.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Tertiary Container"
            path={"theme.palette.tertiaryContainer.main"}
            color={theme.palette.tertiaryContainer.main}
            onColor={theme.palette.onTertiaryContainer.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Tertiary Container"
            path={"theme.palette.onTertiaryContainer.main"}
            color={theme.palette.onTertiaryContainer.main}
            onColor={theme.palette.tertiaryContainer.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={1}>
        <Grid item xs={4}>
          <ColorBox
            title="Background"
            path={"theme.palette.background.main"}
            color={theme.palette.background.main}
            onColor={theme.palette.onBackground.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Background"
            path={"theme.palette.onBackground.main"}
            color={theme.palette.onBackground.main}
            onColor={theme.palette.background.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Surface"
            path={"theme.palette.surface.main"}
            color={theme.palette.surface.main}
            onColor={theme.palette.onSurface.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Surface"
            path={"theme.palette.onSurface.main"}
            color={theme.palette.onSurface.main}
            onColor={theme.palette.surface.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={2}>
        <Grid item xs={4}>
          <ColorBox
            title="Surface Variant"
            path={"theme.palette.surfaceVariant.main"}
            color={theme.palette.surfaceVariant.main}
            onColor={theme.palette.onSurfaceVariant.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Surface Variant"
            path={"theme.palette.onSurfaceVariant.main"}
            color={theme.palette.onSurfaceVariant.main}
            onColor={theme.palette.surfaceVariant.main}
          />
        </Grid>
        <Grid item xs={8}>
          <ColorBox
            title="Outline"
            path={"theme.palette.outline.main"}
            color={theme.palette.outline.main}
            onColor={theme.palette.background.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={2}>
        <Grid item xs={4}>
          <ColorBox
            title="Error"
            path={"theme.palette.error.main"}
            color={theme.palette.error.main}
            onColor={theme.palette.onError.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Error"
            path={"theme.palette.onError.main"}
            color={theme.palette.onError.main}
            onColor={theme.palette.error.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Error Container"
            path={"theme.palette.errorContainer.main"}
            color={theme.palette.errorContainer.main}
            onColor={theme.palette.onErrorContainer.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="On Error Container"
            path={"theme.palette.onErrorContainer.main"}
            color={theme.palette.onErrorContainer.main}
            onColor={theme.palette.errorContainer.main}
          />
        </Grid>
      </Grid>
      <Grid container columns={{ xs: 8, md: 12, lg: 16 }} marginBottom={2}>
        <Grid item xs={4}>
          <ColorBox
            title="Inverse Surface"
            path={"theme.palette.inverseSurface.main"}
            color={theme.palette.inverseSurface.main}
            onColor={theme.palette.inverseOnSurface.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Inverse On Surface"
            path="theme.palette.inverseOnSurface.main"
            color={theme.palette.inverseOnSurface.main}
            onColor={theme.palette.inverseSurface.main}
          />
        </Grid>
        <Grid item xs={4}>
          <ColorBox
            title="Inverse Primary"
            path={"theme.palette.inversePrimary.main"}
            color={theme.palette.inversePrimary.main}
            onColor={theme.palette.onPrimaryContainer.main}
          />
        </Grid>
      </Grid>
    </Box>
  );
};

const ColorBox = ({
  title,
  path,
  color,
  onColor,
  displayColorSpace = "hsl", // none, hsl, hsv, rgb
}) => {
  const tinyColor = tinycolor(color);
  const colorStr = (
    displayColorSpace === "none"
      ? ""
      : displayColorSpace === "hsl"
      ? tinyColor.toHslString()
      : displayColorSpace === "rgb"
      ? tinyColor.toRgbString()
      : tinyColor.toHsvString()
  ).replaceAll("%", "");
  const clipText = `${path || title}\n${color}\n${colorStr}`;

  const handleOnClick = () => {
    navigator.clipboard.writeText(clipText);
    const infoContent = (
      <ListItem>
        <ListItemText
          primary="Color details copied to Clipboard"
          secondary={<pre>{clipText}</pre>}
        ></ListItemText>
      </ListItem>
    );

    // toast.dismiss("col-key");
    toast.info(infoContent, {
      toastId: "col-key",
      autoClose: true,
      closeOnClick: true,
    });
  };

  return (
    <Box
      sx={{
        transition: "all 1s",
        width: "100%",
        height: 110,
        justifyContent: "space-between",
        display: "flex",
        padding: 2,
        flexDirection: "column",
        backgroundColor: color,
        color: onColor,
      }}
      onClick={handleOnClick}
    >
      <Typography variant="subtitle2">{title}</Typography>
      <Typography variant="subtitle2">{color}</Typography>
      <Typography variant="subtitle2">{colorStr}</Typography>
    </Box>
  );
};

export default ColorSystem;
