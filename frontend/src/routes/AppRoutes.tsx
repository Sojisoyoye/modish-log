import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import Home from '../pages/Home';
import CreateUser from '../pages/CreateUser';
import ProtectedRoute from '../components/ProtectedRoute';
import SignIn from '../pages/SignIn';
import ProductList from '../pages/ProductList';
import SalesList from '../pages/SalesList';
import AddProduct from '../pages/AddProduct';
import AddSale from '../pages/AddSale';

const AppRoutes: React.FC = () => {
  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/signin" element={<SignIn />} />

      {/* Protected Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Admin', 'Manager', 'Salesperson']} />}>
        <Route path="/" element={<Home />} />
        <Route path="/sales" element={<SalesList />} />
        <Route path="/products" element={<ProductList />} />
        <Route path="/add-sale" element={<AddSale />} />
      </Route>

      {/* Admin-Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/add-product" element={<AddProduct />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;