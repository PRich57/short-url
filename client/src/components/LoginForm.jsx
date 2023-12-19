import React, { useState } from "react";
import { TextField, Button, Paper } from "@mui/material";

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(email, password);
  };

  return (
    <Paper
      style={{
        padding: "20px",
        backgroundColor: "#dedede",
        margin: "3rem 0",
      }}
      className="paper"
    >
      <h1>SIGN IN</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          style={{
            margin: "20px 0",
            backgroundColor: "#dedede",
            borderRadius: "6px",
          }}
        />
        <TextField
          label="Password"
          type="password"
          value={password || ""}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          style={{
            margin: "20px 0",
            backgroundColor: "#dedede",
            borderRadius: "6px",
          }}
        />
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px", letterSpacing: ".2rem" }}
        >
          GO
        </Button>
      </form>
    </Paper>
  );
}

export default LoginForm;
