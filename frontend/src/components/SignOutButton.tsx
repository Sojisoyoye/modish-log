import React from 'react';
import { Button } from '@mui/material';
import { useUser } from '../context/user.context';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';
import { useNavigate } from 'react-router-dom';

interface SignOutButtonProps {
  setIsAuthenticated: (value: boolean) => void;
}

const SignOutButton: React.FC<SignOutButtonProps> = ({
  setIsAuthenticated,
}) => {
  const { setUser } = useUser();
  const navigate = useNavigate();

  const handleSignOut = () => {
    if (setUser) {
      setUser(null);
    }
    localStorage.removeItem('access_token');
    setIsAuthenticated(false);
    navigate('/signin');
  };

  return (
    <Button
      variant="contained"
      color="inherit"
      startIcon={<ExitToAppIcon />}
      onClick={handleSignOut}
    >
      Sign Out
    </Button>
  );
};

export default SignOutButton;
