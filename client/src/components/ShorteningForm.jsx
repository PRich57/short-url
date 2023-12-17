import React, { useState } from "react";
import { TextField, Button, Typography } from "@mui/material";
import { useMutation } from "@apollo/client";
import { SHORTEN_URL } from "../utils/mutations";
import { useUser } from "./UserContext";

function ShorteningForm({ onShorten }) {
  const [url, setUrl] = useState("");
  const [shortenUrl, { data }] = useMutation(SHORTEN_URL);
  const { user } = useUser();

  // Create function to handle submit event
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (user) {
      await shortenUrl({
        variables: { originalUrl: url, userId: user._id, customSlug: "" },
      });
      setUrl("");
      onShorten();
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
        <Button variant="contained" color="primary" type="submit">
          Shorten URL
        </Button>
      </form>
      {data && (
        <Typography>Shortened URL: {data.shortenUrl.fullShortUrl}</Typography>
      )}
    </div>
  );
}

export default ShorteningForm;
