import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import Navbar from "./components/Navbar.jsx";
import Login from "./pages/auth/Login.jsx";
import Register from "./pages/auth/Register.jsx";

import UserHome from "./pages/user/UserHome.jsx";
import AdminHome from "./pages/admin/AdminHome.jsx";
import DriverHome from "./pages/driver/DriverHome.jsx";
import PartnerHome from "./pages/partner/PartnerHome.jsx";

import Cart from "./pages/user/Cart.jsx";
import Checkout from "./pages/user/Checkout.jsx";
import Orders from "./pages/user/Orders.jsx";

import Partners from "./pages/admin/Partners.jsx";
import Products from "./pages/admin/Products.jsx";
import AddProduct from "./pages/partner/AddProduct.jsx";
import MyProducts from "./pages/partner/MyProducts.jsx";

const App = () => {
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />

        <Route
          path="/"
          element={
            <ProtectedRoute role="user">
              <UserHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner"
          element={
            <ProtectedRoute role="partner">
              <PartnerHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/driver"
          element={
            <ProtectedRoute role="driver">
              <DriverHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <ProtectedRoute role="admin">
              <AdminHome />
            </ProtectedRoute>
          }
        />
        <Route
          path="/cart"
          element={
            <ProtectedRoute role="user">
              <Cart />
            </ProtectedRoute>
          }
        />
        <Route
          path="/checkout"
          element={
            <ProtectedRoute role="user">
              <Checkout />
            </ProtectedRoute>
          }
        />
        <Route
          path="/orders"
          element={
            <ProtectedRoute role="user">
              <Orders />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/partners"
          element={
            <ProtectedRoute role="admin">
              <Partners />
            </ProtectedRoute>
          }
        />
        <Route
          path="/admin/products"
          element={
            <ProtectedRoute role="admin">
              <Products />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/add-product"
          element={
            <ProtectedRoute role="partner">
              <AddProduct />
            </ProtectedRoute>
          }
        />
        <Route
          path="/partner/my-products"
          element={
            <ProtectedRoute role="partner">
              <MyProducts />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </>
  );
};

export default App;
