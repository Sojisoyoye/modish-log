import React from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { useUser } from '../context/user.context';

interface ProtectedRouteProps {
  allowedRoles?: string[];
}

const ProtectedRoute: React.FC<ProtectedRouteProps> = ({ allowedRoles }) => {
  const { user } = useUser();

  if (!user) {
    return <Navigate to="/signin" />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
