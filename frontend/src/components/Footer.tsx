import React from 'react';
import { Box, Container, Typography } from '@mui/material';

const Footer: React.FC = () => {
  return (
    <Box
      component="footer"
      sx={{
        width: '100%',
        position: 'fixed',
        bottom: 0,
        left: 0,
        bgcolor: 'background.paper',
        py: 2,
        boxShadow: '0 -2px 4px rgba(0,0,0,0.1)',
        zIndex: (theme) => theme.zIndex.drawer + 1,
      }}
    >
      <Container maxWidth="lg">
        <Typography variant="body2" color="text.secondary" align="center">
          © 2025 Modish Log. All rights reserved.
        </Typography>
      </Container>
    </Box>
  );
};

export default Footer;
