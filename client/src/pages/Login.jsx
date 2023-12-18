import React, { useState } from "react";
import { useMutation } from "@apollo/client";
import { useNavigate } from "react-router-dom";
import { LOGIN } from "../utils/mutations";
import LoginForm from "../components/LoginForm";
import { useUser } from "../components/UserContext";
import { Snackbar, Alert } from "@mui/material";

function Login() {
  const navigate = useNavigate();
  const { setUser } = useUser();
  const [loginUser] = useMutation(LOGIN, {
    onCompleted: (data) => {
      // Store auth token in localStorage
      localStorage.setItem("token", data.login.token);
      // Store user info in context
      setUser(data.login);
      console.log(data);
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
  const handleLogin = async (email, password) => {
    try {
      await loginUser({ variables: { email, password } });
      setSnackbarMessage('Login successful!');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
      navigate('/home');
    } catch (err) {
      setSnackbarMessage('Login failed:' + err.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
    <div>
      <LoginForm onLogin={handleLogin} />
      <Snackbar 
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
    </div>
  );
}

export default Login;
