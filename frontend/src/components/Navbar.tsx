import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useUser } from '../context/user.context';

const Navbar: React.FC = () => {
const navigate = useNavigate();
const { user, setUser } = useUser();
  
const handleSignOut = () => {
    setUser(null); // Clear user data
    localStorage.removeItem('access_token');
    navigate('/signin');
};

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Modish Inventory Management
        </Typography>
        {user ? (
          <>
            <Button color="inherit" component={Link} to="/">
              Home
            </Button>
            <Button color="inherit" component={Link} to="/sales">
              Sales
            </Button>
            <Button color="inherit" component={Link} to="/products">
              Products
            </Button>
            <Button color="inherit" component={Link} to="/add-sale">
              Add Sale
              </Button>
            {user.role === 'Admin' && (
                <>
              <Button color="inherit" component={Link} to="/create-user">
                Create User
              </Button>
              <Button color="inherit" component={Link} to="/add-product">
                Add Product
              </Button>

              <Button color="inherit" component={Link} to="/stock">
                Stock</Button>
              </>
            )}
            <Button color="inherit" onClick={handleSignOut}>
              Sign Out
            </Button>
          </>
        ) : (
          <Button color="inherit" component={Link} to="/signin">
            Sign In
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;