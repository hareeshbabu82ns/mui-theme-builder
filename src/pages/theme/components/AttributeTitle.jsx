import { IconButton, Typography, useTheme } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2/Grid2";
import DeleteIcon from "@mui/icons-material/Delete";

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

export default AttributeTitle;
