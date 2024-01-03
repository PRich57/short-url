import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import LoginForm from "../components/LoginForm";
import { useUser } from "../components/UserContext";
import { Snackbar, Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/alertTheme";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      // Store auth token in localStorage
      localStorage.setItem("token", data.login.token);
      // Store user info in context
      setUser(data.login);
    },
  });

    // Use state for MUI Snackbar alerts
    const [openSnackbar, setOpenSnackbar] = useState(false);
    const [snackbarMessage, setSnackbarMessage] = useState('');
    const [snackbarSeverity, setSnackbarSeverity] = useState('success');

      // Async function to handle Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setOpenSnackbar(false);
  }

  // Create handleLogin async function
  const handleLogin = async (identifier, password) => {
    try {
      await loginUser({ variables: { identifier, password } });
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/home');
    } catch (err) {
      setSnackbarMessage('Login Failed: ' + err.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="form">
      <LoginForm onLogin={handleLogin} />
      <ThemeProvider theme={theme}>
        <Snackbar 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
