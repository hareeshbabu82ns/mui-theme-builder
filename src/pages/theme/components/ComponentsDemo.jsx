import Buttons from "pages/elements/samples/Buttons";
import Dividers from "pages/elements/samples/Dividers";
import IconButtons from "pages/elements/samples/IconButtons";
import AppBars from "pages/elements/samples/AppBars";

const ComponentsDemo = ({ component }) => {
  switch (component) {
    case "MuiButton":
      return <Buttons />;
    case "MuiDivider":
      return <Dividers />;
    case "MuiIconButton":
      return <IconButtons />;
    case "MuiAppBar":
      return <AppBars />;
    default:
      return <>No Demo Components for {component}</>;
  }
};

export default ComponentsDemo;
