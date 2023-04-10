import { Box, Typography } from "@mui/material";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import DeleteIcon from "@mui/icons-material/Delete";
import AlarmIcon from "@mui/icons-material/Alarm";
import AddShoppingCartIcon from "@mui/icons-material/AddShoppingCart";
import Fingerprint from "@mui/icons-material/Fingerprint";

import BoxComponent from "./BoxComponent";

const IconButtons = () => {
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        IconButtons
      </Typography>

      <Typography variant="h6">IconButtons with text</Typography>
      <BoxComponent>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="delete">
            <DeleteIcon />
          </IconButton>
          <IconButton aria-label="delete" disabled color="primary">
            <DeleteIcon />
          </IconButton>
          <IconButton color="secondary" aria-label="add an alarm">
            <AlarmIcon />
          </IconButton>
          <IconButton color="primary" aria-label="add to shopping cart">
            <AddShoppingCartIcon />
          </IconButton>
        </Stack>
      </BoxComponent>

      <Typography variant="h6">IconButtons Colors</Typography>
      <BoxComponent>
        <Stack direction="row" spacing={1}>
          <IconButton aria-label="fingerprint" color="secondary">
            <Fingerprint />
          </IconButton>
          <IconButton aria-label="fingerprint" color="success">
            <Fingerprint />
          </IconButton>
        </Stack>
      </BoxComponent>
    </Box>
  );
};

export default IconButtons;
