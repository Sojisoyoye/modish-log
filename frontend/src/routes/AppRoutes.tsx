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
import UpdateProduct from '../components/UpdateProduct';
import UpdateSale from '../components/UpdateSale';
import StockCount from '../pages/StockCount';
import GenerateStockBalance from '../pages/Stock';
import StockBalance from '../pages/StockBalance';

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
        <Route path="/edit-sale/:id" element={<UpdateSale />} />
      </Route>

      {/* Admin-Only Routes */}
      <Route element={<ProtectedRoute allowedRoles={['Admin']} />}>
        <Route path="/create-user" element={<CreateUser />} />
        <Route path="/add-product" element={<AddProduct />} />
        <Route path="/update-product/:id" element={<UpdateProduct />} />
        <Route path="/generate-stock-balance" element={<GenerateStockBalance />} />
        <Route path="/stock-count" element={<StockCount />} />
        <Route path="/stock-balance" element={<StockBalance />} />
      </Route>

      {/* Fallback Route */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
};

export default AppRoutes;