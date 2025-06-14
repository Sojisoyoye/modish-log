import React from 'react';
import { useUser } from '../context/user.context';
import { ArrowRightOnRectangleIcon } from '@heroicons/react/24/outline';
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
    <button
      className="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
      onClick={handleSignOut}
    >
      <ArrowRightOnRectangleIcon className="h-5 w-5 mr-2" />
      Sign Out
    </button>
  );
};

export default SignOutButton;
