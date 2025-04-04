import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextField,
  Button,
  Typography,
  Paper,
  Container,
  MenuItem,
  Select,
  InputLabel,
  FormControl,
} from '@mui/material';
import api from '../api/api';

const CreateUserForm: React.FC = () => {
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [role, setRole] = useState<string>('User');
  const [error, setError] = useState<string>('');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      await api.post('http://localhost:3001/api/users', {
        username,
        password,
        role,
      });
      navigate('/');
    } catch (err) {
      console.log(err);
      setError('Failed to create user');
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Paper elevation={3} sx={{ padding: 4, marginTop: 4 }}>
        <Typography variant="h4" gutterBottom>
          Create User
        </Typography>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Username"
            type="text"
            fullWidth
            margin="normal"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <TextField
            label="Password"
            type="password"
            fullWidth
            margin="normal"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <FormControl fullWidth margin="normal">
            <InputLabel>Role</InputLabel>
            <Select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              required
            >
              <MenuItem value="Manager">Manager</MenuItem>
              <MenuItem value="Salesperson">Salesperson</MenuItem>
              <MenuItem value="Admin">Admin</MenuItem>
            </Select>
          </FormControl>
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ marginTop: 2 }}
          >
            Create User
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

export default CreateUserForm;
