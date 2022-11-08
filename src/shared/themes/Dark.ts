import { createTheme } from "@mui/material/styles";
import { cyan, green } from "@mui/material/colors";

export const DarkTheme = createTheme({
  palette: {
    primary: {
      main: cyan[700],
      dark: cyan[900],
      light: cyan[500],
    },
    secondary: {
      main: green[700],
      dark: green[900],
      light: green[500],
    },
    background: {
      default: "#202124",
      paper: "#303134",
    },
  },
});
