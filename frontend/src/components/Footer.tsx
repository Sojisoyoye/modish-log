import React from 'react';
import { Typography, Container } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Container component="footer" sx={{ marginTop: 4, padding: 4, textAlign: 'center' }}>
      <Typography variant="body2" color="textSecondary">
        © 2025 Inventory Management. All rights reserved.
      </Typography>
    </Container>
  );
};

export default Footer;