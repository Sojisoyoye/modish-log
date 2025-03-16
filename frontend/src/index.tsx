import React from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router } from 'react-router-dom'; // For routing
import { ThemeProvider, createTheme } from '@mui/material/styles'; // For Material-UI theme
import CssBaseline from '@mui/material/CssBaseline'; // For resetting CSS
import App from './App'; // Your main App component

// Create a Material-UI theme
const theme = createTheme({
  palette: {
    primary: {
      main: '#1976d2', // Primary color
    },
    secondary: {
      main: '#dc004e', // Secondary color
    },
    background: {
      default: '#f4f6f8', // Default background color
    },
  },
  typography: {
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif', // Default font
  },
});

// Render the app
const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline /> {/* Reset CSS and apply Material-UI baseline styles */}
      <Router>
        {' '}
        {/* Enable routing */}
        <App /> {/* Render the main App component */}
      </Router>
    </ThemeProvider>
  </React.StrictMode>
);
