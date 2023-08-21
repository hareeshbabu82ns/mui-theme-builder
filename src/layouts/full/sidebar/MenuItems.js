// import {
//   IconAperture, IconCopy, IconLayoutDashboard, IconLogin, IconMoodHappy, IconTypography, IconUserPlus
// } from '@tabler/icons';
import {
  TypeSpecimenOutlined as IconAperture,
  PagesOutlined as IconPage,
  CopyAllOutlined as IconCopy,
  HomeOutlined as DashboardIcon,
  IcecreamOutlined as IconMoodHappy,
  CurrencyRupeeOutlined as TransactionsIcon,
  AccountBalanceWalletOutlined as AccountsIcon,
  PointOfSaleOutlined as OverviewIcon,
  AdminPanelSettingsOutlined as AdminIcon,
} from "@mui/icons-material";

import ColorsIcon from "@mui/icons-material/ColorLensOutlined";
import ComponentsIcon from "@mui/icons-material/SettingsInputComponentOutlined";
import CodeIcon from "@mui/icons-material/CodeOutlined";
import ThemeIcon from "@mui/icons-material/ColorizeOutlined";
import SignInIcon from "@mui/icons-material/Login";
import SignUpIcon from "@mui/icons-material/Password";

import { uniqueId } from "lodash";

const Menuitems = [
  {
    id: uniqueId(),
    title: "Theme",
    icon: ThemeIcon,
    href: "/theme",
  },
  {
    id: uniqueId(),
    title: "Theme Colors",
    icon: ColorsIcon,
    href: "/themeColors",
  },
  {
    id: uniqueId(),
    title: "Components",
    icon: ComponentsIcon,
    href: "/components",
  },
  {
    id: uniqueId(),
    title: "Theme Code",
    icon: CodeIcon,
    href: "/themeCode",
  },

  ///////// Sample Pages ///////////
  {
    navlabel: true,
    subheader: "Sample Pages",
  },
  {
    id: uniqueId(),
    title: "Signin",
    icon: SignInIcon,
    href: "/signin",
  },
  {
    id: uniqueId(),
    title: "Signup",
    icon: SignUpIcon,
    href: "/signup",
  },
];

export default Menuitems;
