import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { TextField, Button, Typography, Paper, Container } from '@mui/material';
import axios from 'axios';

interface SignInProps {
  onSignIn: () => void; // Callback function to handle successful sign-in
}

const SignIn: React.FC<SignInProps> = ({ onSignIn }) => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:3001/api/auth/signin', {
        username,
        password,
      });
      localStorage.setItem('access_token', response.data.access_token); // Store the token
      onSignIn(); // Call the onSignIn callback
    } catch (err) {
      setError('Invalid credentials');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Typography variant="h4">Welcome to Inventory Management</Typography>
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h5" gutterBottom>
          Sign In
        </Typography>
        <form onSubmit={handleSignIn}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" variant="contained" color="primary" fullWidth sx={{ marginTop: 2 }}>
            Sign In
          </Button>
        </form>
        {error && (
          <Typography variant="body1" sx={{ marginTop: 2, color: 'red' }}>
            {error}
          </Typography>
        )}
      </Paper>
    </Container>
  );
};

export default SignIn;