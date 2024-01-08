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
          color: "#05386B",
          fontFamily: "Montserrat",
          letterSpacing: ".15rem",
        },
      },
    },
    MuiInputLabel: {
      styleOverrides: {
        root: {
          color: '#8EE4AF',
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: '#dedede',
          caretColor: '#dedede'
        },
      },
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#043d77",
          backgroundColor: "#8EE4AF",
          fontFamily: "Montserrat",
          letterSpacing: ".15rem",
          fontSize: ".8rem"
        },
        arrow: {
          color: "#8EE4AF"
        }
      }
    }
  },
});

export const deleteTheme = createTheme({
  components: {
    MuiTooltip: {
      styleOverrides: {
        tooltip: {
          color: "#043d77",
          backgroundColor: "#FFC27F",
          fontFamily: "Montserrat",
          letterSpacing: ".15rem",
          fontSize: ".8rem"
        },
        arrow: {
          color: "#FFC27F"
        }
      }
    }
  },
});