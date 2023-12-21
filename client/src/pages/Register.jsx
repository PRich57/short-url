import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { REGISTER } from "../utils/mutations";
import RegisterForm from "../components/RegisterForm";
import { Snackbar, Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/alertTheme";

function Register() {
  const navigate = useNavigate();
  const [registerUser] = useMutation(REGISTER, {
    onCompleted: () => {
      // Redirect to Login page after successful registration
      navigate('/');
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

  // Create handleRegister async function
  const handleRegister = async (username, email, password) => {
    try {
      await registerUser({ variables: { username, email, password } });
      setSnackbarMessage('Registration Successful. You can now log in');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/');
    } catch (err) {
      setSnackbarMessage('Registration Failed: ' + err.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="form">
      <RegisterForm onRegister={handleRegister} />
      <ThemeProvider theme={theme}>
        <Snackbar 
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
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
