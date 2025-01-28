import React from 'react';
import { Route, Routes } from 'react-router-dom';
import SignIn from './components/SignIn';

const App: React.FC = () => {
  return (
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/dashboard" element={<h1>Dashboard</h1>} />
      </Routes>
  );
};

export default App;