import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

function RegisterForm({ onRegister }) {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  // Handle submit event
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(username, email, password);
    onRegister(username, email, password);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
        <TextField
          label="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          fullWidth
          margin='normal'
        />
        <TextField
          label="Password"
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          fullWidth
          margin='normal'
        />
        <Button type='submit' variant='contained' color='primary'>
          Sign Up
        </Button>
      </form>
    </Paper>
  );
}

export default RegisterForm;