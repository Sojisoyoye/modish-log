import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/user.context';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/signin" />; // Redirect to sign-in if not authenticated
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />; // Redirect to home if role is not allowed
  }

  return <Outlet />; // Render the child routes if authorized
};

export default ProtectedRoute;
