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
  ListItemButton,
  Box,
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
import { useUser } from '../context/user.context';

interface NavbarProps {
  children?: React.ReactNode;
}

const drawerWidth = 240;

const Navbar: React.FC<NavbarProps> = ({ children }) => {
  const navigate = useNavigate();
  const { user, setUser } = useUser();
  const [drawerOpen, setDrawerOpen] = React.useState(false);

  const handleSignOut = () => {
    if (setUser) {
      setUser(null);
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
    <Box sx={{ display: 'flex' }}>
      <AppBar
        position="fixed"
        sx={{ zIndex: (theme) => theme.zIndex.drawer + 1 }}
      >
        <Toolbar>
          <Typography variant="h6" sx={{ flexGrow: 1 }}>
            Modish Log
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
        <Drawer
          variant="permanent"
          sx={{
            width: drawerWidth,
            flexShrink: 0,
            [`& .MuiDrawer-paper`]: {
              width: drawerWidth,
              boxSizing: 'border-box',
            },
          }}
        >
          <Toolbar />
          <Box sx={{ overflow: 'auto' }}>
            <List>
              {navigationItems.map((item, index) => (
                <ListItem
                  key={index}
                  component={Link}
                  to={item.path}
                  disablePadding
                >
                  <ListItemButton>
                    <ListItemIcon>{item.icon}</ListItemIcon>
                    <ListItemText primary={item.text} />
                  </ListItemButton>
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
          </Box>
        </Drawer>
      )}
      <Box component="main" sx={{ flexGrow: 1, p: 3 }}>
        <Toolbar />
        {children}
      </Box>
    </Box>
  );
};

export default Navbar;
