import React, { useState } from "react";
import { TextField, Button } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SHORTEN_URL } from "../utils/mutations";
import { useUser } from "./UserContext";
import { Snackbar, Alert } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/customTheme";

function ShorteningForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState("");
  const { user } = useUser();

  // Use state for MUI Snackbar alerts
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  const [snackbarSeverity, setSnackbarSeverity] = useState("success");

  // Async function to handle Snackbar
  const handleSnackbarClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenSnackbar(false);
  };

  const [shortenUrl] = useMutation(SHORTEN_URL, {
    onCompleted: () => {
      setUrl("");
      setCustomSlug("");
      onShorten();
      setSnackbarMessage("URL Successfully Shortened");
      setSnackbarSeverity("success");
      setOpenSnackbar(true);
    },
    onError: (err) => {
      setSnackbarMessage(err.message);
      console.error(err.message);
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    },
  });

  // Create function to handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (user) {
      try {
        await shortenUrl({
          variables: { originalUrl: url, userId: user._id, customSlug },
        });
      } catch (err) {
        console.error("Error caught during mutation: ", err);
      }
    } else {
      setSnackbarMessage("You must be logged in to use this feature");
      setSnackbarSeverity("error");
      setOpenSnackbar(true);
    }
  };

  return (
    <div className="form">
      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            label="URL to shorten"
            variant="outlined"
            fullWidth
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            // InputLabelProps={{ shrink: true }}
            style={{
              margin: "20px 0",
              backgroundColor: "#17477c",
              borderRadius: "6px",
            }}
          />
          <TextField
            label="Custom URL path (optional)"
            variant="outlined"
            fullWidth
            value={customSlug}
            onChange={(e) => setCustomSlug(e.target.value)}
            style={{
              margin: "20px 0",
              backgroundColor: "#17477c",
              borderRadius: "6px",
            }}
          />
          <Button
            variant="contained"
            color="primary"
            type="submit"
            style={{ marginBottom: "20px", letterSpacing: ".2rem" }}
          >
            Shorten URL
          </Button>
          <Snackbar
            anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
            open={openSnackbar}
            autoHideDuration={4000}
            onClose={handleSnackbarClose}
            className="snackbar"
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
      </form>
    </div>
  );
}

export default ShorteningForm;
