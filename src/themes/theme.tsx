import { createTheme } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      main: "#01677D",
      contrastText: "#FFFFFF",
    },
    secondary: {
      main: "#4B626A",
      contrastText: "#FFFFFF",
    },
    error: {
      main: "#BA1A1A",
      contrastText: "#FFFFFF",
    },
    background: {
      default: "#F5FAFD",
      paper: "#FFFFFF",
    },
    text: {
      primary: "#171C1E",
      secondary: "#40484B",
    },
    divider: "#70787C",
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
        },
      },
    },
  },
});

export default theme;
