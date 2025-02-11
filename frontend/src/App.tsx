import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate, Outlet, Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Container, CssBaseline, Drawer, List, ListItem, ListItemIcon, ListItemText, Button } from '@mui/material';
import HomeIcon from '@mui/icons-material/Home';
import InventoryIcon from '@mui/icons-material/Inventory';
import PointOfSaleIcon from '@mui/icons-material/PointOfSale';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import ProductList from './components/ProductList';
import AddSale from './components/AddSale';
import SalesList from './components/SalesList';
import SignIn from './components/SignIn';
import AddProduct from './components/AddProduct';
import { AddTask } from '@mui/icons-material';

const drawerWidth = 240;

interface ProtectedRouteProps {
  isAuthenticated: boolean;
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ isAuthenticated }) => {
  return isAuthenticated ? <Outlet /> : <Navigate to="/signin" replace />;
};

const App: React.FC = () => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
  }, []);

  const handleSignIn = () => {
    // localStorage.setItem('access_token', 'dummy_token'); // Simulating token storage
    setIsAuthenticated(true);
    navigate('/');
  };

  const handleSignOut = () => {
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <div>
      <CssBaseline />
      <AppBar position="fixed" sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}>
        <Toolbar>
          <Typography variant="h6" noWrap sx={{ flexGrow: 1 }}>
            Modish Standard Sales & Stock Management
          </Typography>
          {isAuthenticated && (
            <Button color="inherit" startIcon={<ExitToAppIcon />} onClick={handleSignOut}>
              Sign Out
            </Button>
          )}
        </Toolbar>
      </AppBar>
      <Drawer
        variant="permanent"
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          [`& .MuiDrawer-paper`]: { width: drawerWidth, boxSizing: 'border-box' },
        }}
      >
        <Toolbar />
        <List>
          <ListItem component={Link} to="/">
            <ListItemIcon><HomeIcon /></ListItemIcon>
            <ListItemText primary="Home" />
          </ListItem>
          <ListItem component={Link} to="/products">
            <ListItemIcon><InventoryIcon /></ListItemIcon>
            <ListItemText primary="Products" />
          </ListItem>
          <ListItem component={Link} to="/sales">
            <ListItemIcon><PointOfSaleIcon /></ListItemIcon>
            <ListItemText primary="Sales" />
          </ListItem>
          <ListItem component={Link} to="/add-sale">
            <ListItemIcon><PointOfSaleIcon /></ListItemIcon>
            <ListItemText primary="Add Sale" />
          </ListItem>
          <ListItem component={Link} to="/add-product">
            <ListItemIcon><AddTask /></ListItemIcon>
            <ListItemText primary="Add Product" />
          </ListItem>
        </List>
      </Drawer>
      <Container component="main" sx={{ flexGrow: 1, p: 3, marginLeft: `${drawerWidth}px` }}>
        <Toolbar />
        <Routes>
          <Route path="/signin" element={<SignIn onSignIn={handleSignIn} />} />
          <Route element={<ProtectedRoute isAuthenticated={isAuthenticated} />}>
            <Route path="/" element={<Typography variant="h4">Welcome to Inventory Management</Typography>} />
            <Route path="/products" element={<ProductList />} />
            <Route path="/sales" element={<SalesList />} />
            <Route path="/add-sale" element={<AddSale />} />
            <Route path="/add-product" element={<AddProduct />} />
          </Route>
        </Routes>
      </Container>
    </div>
  );
};

const AppWrapper: React.FC = () => {
  return (
    <>
      <App />
    </>
  );
};

export default AppWrapper;
