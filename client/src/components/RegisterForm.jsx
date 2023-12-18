import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    onRegister(username, email, password);
  };

  return (
    <Paper style={{ padding: '20px', backgroundColor: '#dedede' }}>
      <h1>Create Account</h1>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          color='primary'
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin='normal'
          // InputLabelProps={{ shrink: true }}
          style={{ margin: "20px 0", backgroundColor: "#dedede", borderRadius: "6px" }}
        />
        <TextField
          label="Email"
          color='primary'
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin='normal'
          // InputLabelProps={{ shrink: true }}
          style={{ margin: "20px 0", backgroundColor: "#dedede", borderRadius: "6px" }}
        />
        <TextField
          label="Password"
          type="password"
          color='primary'
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin='normal'
          // InputLabelProps={{ shrink: true }}
          style={{ margin: "20px 0", backgroundColor: "#dedede", borderRadius: "6px" }}
        />
        <Button type='submit' variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

export default RegisterForm;