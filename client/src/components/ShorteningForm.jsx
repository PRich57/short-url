import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SHORTEN_URL } from "../utils/mutations";
import { useUser } from "./UserContext";

function ShorteningForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [customSlug, setCustomSlug] = useState('');
  const { user } = useUser();

  const [shortenUrl, { data, error }] = useMutation(SHORTEN_URL, {
    onCompleted: () => {
      setUrl("");
      setCustomSlug("");
      onShorten();
    },
    onError: (err) => {
      console.error("Error during URL shortening:", err.message);
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
      console.error("No user data found");
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <TextField
          label="URL to shorten"
          variant="outlined"
          fullWidth
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <TextField
          label="Custom url path (optional)"
          variant="outlined"
          fullWidth
          value={customSlug}
          onChange={(e) => setCustomSlug(e.target.value)}
          style={{ marginBottom: "20px" }}
        />
        <Button variant="contained" color="primary" type="submit">
          Shorten URL
        </Button>
      </form>
      {data && (
        <Typography>Shortened URL: {data.shortenUrl.fullShortUrl}</Typography>
      )}
      {error && (
        <Typography color="error">Error: {error.message}</Typography>
      )}
    </div>
  );
}

export default ShorteningForm;
