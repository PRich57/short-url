import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../utils/mutations";
import RegisterForm from "../components/RegisterForm";
import { Snackbar, Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/customTheme";

function Register() {
  const navigate = useNavigate();
  // Mutation hook for registering new user
  const [registerUser] = useMutation(REGISTER, {
    // Callback function called when mutation is successfully completed
    onCompleted: () => {
      // Navigate to root route
      navigate("/");
    },
  });

  // State variables for MUI Snackbar alerts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Function to handle closing the Snackbar
  const handleSnackbarClose = (event, reason) => {
    // Prevent snackbar from closing if the user clicks away
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Create handleRegister async function
  const handleRegister = async (username, email, password) => {
    try {
      await registerUser({ variables: { username, email, password } });
      setSnackbarMessage("Registration Successful. You can now log in");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      navigate("/");
    } catch (err) {
      setSnackbarMessage("Registration Failed: " + err.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="form">
      <RegisterForm onRegister={handleRegister} />
      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={6000}
          onClose={handleSnackbarClose}
        >
          <Alert
            elevation={6}
            variant="filled"
            onClose={handleSnackbarClose}
            severity={snackbarSeverity}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </ThemeProvider>
    </div>
  );
}

export default Register;
