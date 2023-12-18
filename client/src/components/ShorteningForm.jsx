import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SHORTEN_URL } from "../utils/mutations";
import { useUser } from "./UserContext";
import { Snackbar, Alert } from "@mui/material";

function ShorteningForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState('');
  const { user } = useUser();

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

  const [shortenUrl, { data, error }] = useMutation(SHORTEN_URL, {
    onCompleted: () => {
      setUrl("");
      setCustomSlug("");
      onShorten();
      setSnackbarMessage('URL successfully shortened');
      setSnackbarSeverity('success');
      setOpenSnackbar(true);
    },
    onError: (err) => {
      setSnackbarMessage(err.message);
      console.log(err.message);
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    },
  });

  // Create function to handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Submitting URL:", url, "Custom Slug:", customSlug, "User ID:", user?._id);
    if (user) {
      try {
        await shortenUrl({
          variables: { originalUrl: url, userId: user._id, customSlug },
        });
      } catch (err) {
        console.error("Error caught during mutation:", err);
      }
    } else {
      setSnackbarMessage('You must be logged in to use this application.');
      setSnackbarSeverity('error');
      setOpenSnackbar(true);
    }
  };

  return (
      <div className="form">
        <h1>Shorten URL</h1>
        <form onSubmit={handleSubmit}>
          <TextField
            label="URL to shorten"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            style={{ margin: "20px 0", backgroundColor: "#dedede", borderRadius: "6px" }}
          />
          <TextField
            label="Custom url path (optional)"
            variant="outlined"
            fullWidth
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            style={{ marginBottom: "20px", backgroundColor: "#dedede", borderRadius: "6px" }}
          />
          <Button variant="contained" color="primary" type="submit" style={{ marginBottom: "20px" }}>
            Shorten URL
          </Button>
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
        </form>
      </div>
  );
}

export default ShorteningForm;
