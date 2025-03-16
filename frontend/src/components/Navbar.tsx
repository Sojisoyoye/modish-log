import React from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  Drawer,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  IconButton,
} from '@mui/material';
import {
  Home as HomeIcon,
  ShoppingCart as SalesIcon,
  Inventory as ProductsIcon,
  Add as AddIcon,
  PersonAdd as CreateUserIcon,
  AddBox as AddProductIcon,
  FormatListNumbered as StockCountIcon,
  Balance as StockBalanceIcon,
  ExitToApp as SignOutIcon,
  Menu as MenuIcon,
} from '@mui/icons-material';
// import { useUser } from './UserContext'; // Adjust the import path as needed
import { useUser } from '../context/user.context';

const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleSignOut = () => {
    if (setUser) {
      setUser(null); // Clear user data
    }
    localStorage.removeItem('access_token');
    navigate('/signin');
  };

  const toggleDrawer = (open: boolean) => () => {
    setDrawerOpen(open);
  };

  const navigationItems = [
    { text: 'Home', path: '/', icon: <HomeIcon /> },
    { text: 'Sales', path: '/sales', icon: <SalesIcon /> },
    { text: 'Products', path: '/products', icon: <ProductsIcon /> },
    { text: 'Add Sale', path: '/add-sale', icon: <AddIcon /> },
  ];

  const adminNavigationItems = [
    { text: 'Create User', path: '/create-user', icon: <CreateUserIcon /> },
    { text: 'Add Product', path: '/add-product', icon: <AddProductIcon /> },
    { text: 'Stock Count', path: '/stock-count', icon: <StockCountIcon /> },
    {
      text: 'Generate Stock Balance',
      path: '/generate-stock-balance',
      icon: <StockBalanceIcon />,
    },
    {
      text: 'Stock Balance',
      path: '/stock-balance',
      icon: <StockBalanceIcon />,
    },
  ];

  return (
    <>
      <AppBar position="static">
        <Toolbar>
          {user && (
            <IconButton
              edge="start"
              color="inherit"
              aria-label="menu"
              onClick={toggleDrawer(true)}
              sx={{ mr: 2 }}
            >
              <MenuIcon />
            </IconButton>
          )}
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Modish Inventory Management
          </Typography>
          {user ? (
            <Button
              color="inherit"
              onClick={handleSignOut}
              startIcon={<SignOutIcon />}
            >
              Sign Out
            </Button>
          ) : (
            <Button color="inherit" component={Link} to="/signin">
              Sign In
            </Button>
          )}
        </Toolbar>
      </AppBar>

      {user && (
        <Drawer anchor="left" open={drawerOpen} onClose={toggleDrawer(false)}>
          <List>
            {navigationItems.map((item) => (
              <ListItem
                button
                key={item.text}
                component={Link}
                to={item.path}
                onClick={toggleDrawer(false)}
              >
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItem>
            ))}
            {user.role === 'Admin' && (
              <>
                <Divider />
                {adminNavigationItems.map((item) => (
                  <ListItem
                    button
                    key={item.text}
                    component={Link}
                    to={item.path}
                    onClick={toggleDrawer(false)}
                  >
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItem>
                ))}
              </>
            )}
          </List>
        </Drawer>
      )}
    </>
  );
};

export default Navbar;
