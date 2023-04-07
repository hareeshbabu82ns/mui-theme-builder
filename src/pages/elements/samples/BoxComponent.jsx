import { Box } from "@mui/material";

const boxStyle = { p: 1, display: "flex", gap: 1.8, mb: 1, flexWrap: "wrap" };

const BoxComponent = ({ children }) => {
  return <Box sx={boxStyle}>{children}</Box>;
};

export default BoxComponent;
