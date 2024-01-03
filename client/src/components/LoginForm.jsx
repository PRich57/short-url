import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/alertTheme";

function LoginForm({ onLogin }) {
  const [identifier, setIdentifier] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    onLogin(identifier, password);
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
      <ThemeProvider theme={theme}>
        <TextField
          label="Username or Email"
          value={identifier}
          onChange={(e) => setIdentifier(e.target.value)}
          fullWidth
          margin="normal"
          InputLabelProps={{ shrink: true }}
          style={{
            margin: "20px 0",
            backgroundColor: "#17477c",
            borderRadius: "6px",
            color: "white"
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
            backgroundColor: "#17477c",
            borderRadius: "6px",
            color: "white",
          }}
          />
        </ThemeProvider>
        <Button
          type="submit"
          variant="contained"
          color="primary"
          style={{ marginBottom: "20px", letterSpacing: ".2rem" }}
        >
          GO
        </Button>
      </form>
      <p
        style={{
          fontSize: "11px",
          color: "#FFC27F",
          marginTop: "0",
          marginBottom: "20px",
        }}
      >
        Don't have an account?{" "}
        <Link
          to="/register"
          style={{
            color: "#8EE4AF",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          SIGN UP!
        </Link>
      </p>
    </Paper>
  );
}

export default LoginForm;
