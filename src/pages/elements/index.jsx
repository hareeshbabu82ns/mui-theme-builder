import { Box, Container } from "@mui/material";
import Buttons from "./samples/Buttons";
import FloatingActionButtons from "./samples/Fabs";
import Cards from "./samples/Cards";
import Accordions from "./samples/Accordions";
import Snackbars from "./samples/Snackbars";
import Switchs from "./samples/Switchs";
import Inputs from "./samples/Inputs";
import FlexBetween from "components/FlexBetween";
import Header from "components/Header";

const ElementsPage = () => {
  const boxSX = { mb: 8 };
  return (
    <Box margin={{ xs: "1rem 2rem", lg: "0" }}>
      <FlexBetween>
        <Header title="Components" subtitle="Simple Components" />
      </FlexBetween>
      <Box sx={boxSX} />
      <Buttons />
      <Box sx={boxSX} />
      <Inputs />
      <Box sx={boxSX} />
      <Switchs />
      <Box sx={boxSX} />
      <FloatingActionButtons />
      <Box sx={boxSX} />
      <Cards />
      <Box sx={boxSX} />
      <Accordions />
      <Box sx={boxSX} />
      <Snackbars />
    </Box>
  );
};

export default ElementsPage;
