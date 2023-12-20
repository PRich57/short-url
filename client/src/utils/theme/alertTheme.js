// This code was found at https://stackoverflow.com/questions/66000868/material-ui-alerts-using-custom-colors
// I made alterations of my own but this is the source for how I set it up

import { createTheme } from "@mui/material";

export const theme = createTheme({
  components: {
    MuiAlert: {
      styleOverrides: {
        filledSuccess: {
          backgroundColor: "#8EE4AF",
          color: "#05386B",
          fontFamily: "Montserrat",
          letterSpacing: ".15rem",
        },
        filledError: {
          backgroundColor: "#FFC27F",
          color: "#1A191D",
          fontFamily: "Montserrat",
          letterSpacing: ".15rem"
        }
      }
    }
  }
});