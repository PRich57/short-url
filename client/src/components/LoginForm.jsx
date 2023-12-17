import React, { useState } from 'react';
import { TextField, Button, Paper } from '@mui/material';

function LoginForm({ onLogin }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(email, password);
    onLogin(email, password);
  };

  return (
    <Paper style={{ padding: '20px' }}>
      <form onSubmit={handleSubmit}>
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
          Login
        </Button>
      </form>
    </Paper>
  );
}

export default LoginForm;