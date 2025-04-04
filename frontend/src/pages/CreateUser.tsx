import React from 'react';
import { Navigate } from 'react-router-dom';
import CreateUserForm from '../components/CreateUserForm';
import { useUser } from '../context/user.context';

const CreateUser: React.FC = () => {
  const { user } = useUser();

  if (user?.role !== 'Admin') {
    return <Navigate to="/" />;
  }

  return <CreateUserForm />;
};

export default CreateUser;
