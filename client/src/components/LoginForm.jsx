import React, { useState } from "react";
import { TextField, Button, Paper, Link } from "@mui/material";

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
          // InputLabelProps={{ shrink: true }}
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
          // InputLabelProps={{ shrink: true }}
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
          href="/register"
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
