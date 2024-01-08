import React, { useState } from "react";
import { Link } from "react-router-dom";
import { TextField, Button, Paper } from "@mui/material";
import { ThemeProvider } from "@emotion/react";
import { theme } from "../utils/theme/customTheme";

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <Paper
      style={{ padding: "20px", backgroundColor: "#dedede" }}
      className="paper"
    >
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <ThemeProvider theme={theme}>
          <TextField
            label="Username"
            color="primary"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            style={{
              margin: "20px 0",
              backgroundColor: "#17477c",
              borderRadius: "6px",
            }}
          />
          <TextField
            label="Email"
            color="primary"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            style={{
              margin: "20px 0",
              backgroundColor: "#17477c",
              borderRadius: "6px",
            }}
          />
          <TextField
            label="Password"
            type="password"
            color="primary"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            fullWidth
            margin="normal"
            InputLabelProps={{ shrink: true }}
            style={{
              marginTop: "20px",
              backgroundColor: "#17477c",
              borderRadius: "6px",
            }}
          />
          <p
            style={{
              fontSize: "11px",
              color: "#FFC27F",
              marginTop: "0",
              marginBottom: "20px",
            }}
          >
            Minimum 8 characters and at least 1 of each: uppercase and lowercase
            letters, number, and special character.{" "}
          </p>
          <Button type="submit" variant="contained" color="primary">
            SIGN UP
          </Button>
        </ThemeProvider>
      </form>
      <p
        style={{
          fontSize: "11px",
          color: "#FFC27F",
          marginTop: "20px",
          marginBottom: "20px",
        }}
      >
        Already have an account?{" "}
        <Link
          to="/login"
          style={{
            color: "#8EE4AF",
            cursor: "pointer",
            textDecoration: "none",
          }}
        >
          SIGN IN!
        </Link>
      </p>
    </Paper>
  );
}

export default RegisterForm;
