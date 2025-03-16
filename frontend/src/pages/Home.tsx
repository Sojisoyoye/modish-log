import React from 'react';
import { Typography, Container } from '@mui/material';
import { useUser } from '../context/user.context';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <Container>
      <Typography variant="h4" gutterBottom>
        Welcome to the Inventory Management App
      </Typography>
      {user && (
        <Typography variant="body1">
          Logged in as {user.username} (Role: {user.role})
        </Typography>
      )}
    </Container>
  );
};

export default Home;
