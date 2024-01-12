import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import LoginForm from "../components/LoginForm";
import { useUser } from "../components/UserContext";
import { Snackbar, Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/customTheme";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();

  // Mutation hook from Apollo Client for login resolver
  const [loginUser] = useMutation(LOGIN, {
    // Callback function when login mutation is successful
    onCompleted: (data) => {
      // Store auth token in localStorage
      localStorage.setItem("token", data.login.token);
      // Update context with logged-in user's data
      setUser(data.login);
    },
  });

  // Use state for MUI Snackbar alerts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Function to handle closing Snackbar
  const handleSnackbarClose = (event, reason) => {
    // Prevent closing Snackbar if clicked away
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  // Function for handling login logic
  const handleLogin = async (identifier, password) => {
    try {
      // Attempt to log in with provided credentials
      await loginUser({ variables: { identifier, password } });
      // Set the state for Snackbar with a success message
      setSnackbarMessage("Login successful!");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
      // Navigate to the '/home' route upon successful login
      navigate("/home");
    } catch (err) {
      // If login fails, set the Snackbar state to display an error message
      setSnackbarMessage("Login Failed: " + err.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="form">
      <LoginForm onLogin={handleLogin} />
      <ThemeProvider theme={theme}>
        <Snackbar
          anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
          open={openSnackbar}
          autoHideDuration={4000}
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

export default Login;
