import React from 'react';
import { useUser } from '../context/user.context';

const Home: React.FC = () => {
  const { user } = useUser();

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
      <h1 className="text-2xl font-bold text-gray-900 mb-4">
        One solution to manage sales and inventory.
      </h1>
      {user && (
        <p className="text-base text-gray-700">
          Logged in as <span className="font-medium">{user.username}</span>{' '}
          (Role: <span className="font-medium">{user.role}</span>)
        </p>
      )}
    </div>
  );
};

export default Home;
