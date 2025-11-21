import React from "react";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Login";
import Register from "./pages/Register";
import Home from "./pages/Home";
import PrivateRoute from "./auth/PrivateRoute";
import CustomersList from "./pages/CustomersList";
import ManageCustomers from "./pages/ManageCustomers";
import Navbar from "./components/Navbar";

const App: React.FC = () => {
  return (
  <>
    <Navbar />
    <Routes>
      <Route
        path="/"
        element={
          <PrivateRoute>
            <Home />
          </PrivateRoute>
        }
      />

      <Route
        path="/customers"
        element={
          <PrivateRoute>
            <CustomersList />
          </PrivateRoute>
        }
      />

      <Route
        path="/customers/manage"
        element={
          <PrivateRoute>
            <ManageCustomers />
          </PrivateRoute>
        }
      />

      
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
};

export default App;
