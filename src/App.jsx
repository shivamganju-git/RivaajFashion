import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Storefront from './Storefront';
import AdminLayout from './pages/admin/AdminLayout';
import AdminLogin from './pages/admin/AdminLogin';
import AdminDashboard from './pages/admin/AdminDashboard';
import ProductsManager from './pages/admin/ProductsManager';
import OrdersManager from './pages/admin/OrdersManager';

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Main Public Storefront */}
        <Route path="/*" element={<Storefront />} />
        
        {/* Admin Login */}
        <Route path="/admin/login" element={<AdminLogin />} />
        
        {/* Protected Admin Routes */}
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
          <Route path="products" element={<ProductsManager />} />
          <Route path="orders" element={<OrdersManager />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
