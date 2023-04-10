import {
  Box,
  Chip,
  Divider,
  List,
  ListItemButton,
  ListItemText,
  Typography,
  styled,
} from "@mui/material";

import BoxComponent from "./BoxComponent";

const Root = styled("div")(({ theme }) => ({
  width: "100%",
  ...theme.typography.body2,
  "& > :not(style) + :not(style)": {
    marginTop: theme.spacing(2),
  },
}));

const Dividers = () => {
  const content = (
    <div>
      {`Lorem ipsum dolor sit amet, consectetur adipiscing elit. Phasellus id dignissim justo.
   Nulla ut facilisis ligula. Interdum et malesuada fames ac ante ipsum primis in faucibus.
   Sed malesuada lobortis pretium.`}
    </div>
  );
  return (
    <Box>
      <Typography variant="h5" gutterBottom fontWeight="bold">
        Dividers
      </Typography>

      <Typography variant="h6">Dividers with text</Typography>
      <BoxComponent>
        <Root>
          {content}
          <Divider>CENTER</Divider>
          {content}
          <Divider textAlign="left">LEFT</Divider>
          {content}
          <Divider textAlign="right">RIGHT</Divider>
          {content}
          <Divider>
            <Chip label="CHIP" />
          </Divider>
          {content}
        </Root>
      </BoxComponent>

      <Typography variant="h6">List Dividers</Typography>
      <BoxComponent>
        <List
          sx={{
            width: "100%",
            maxWidth: 360,
            bgcolor: "background.paper",
          }}
          component="nav"
          aria-label="mailbox folders"
        >
          <ListItemButton>
            <ListItemText primary="Inbox" />
          </ListItemButton>
          <Divider />
          <ListItemButton divider>
            <ListItemText primary="Drafts" />
          </ListItemButton>
          <ListItemButton>
            <ListItemText primary="Trash" />
          </ListItemButton>
          <Divider light />
          <ListItemButton>
            <ListItemText primary="Spam" />
          </ListItemButton>
        </List>
      </BoxComponent>
    </Box>
  );
};

export default Dividers;
