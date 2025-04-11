/* eslint-disable */
import React from 'react';
import AppRoutes from './routes/AppRoutes';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import { UserProvider } from './context/user.context';

const App: React.FC = () => {
  return (
    <UserProvider>
      <Navbar>
        <AppRoutes />
      </Navbar>
      <Footer />
    </UserProvider>
  );
};

export default App;
