import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const PrivateRoute: React.FC<React.PropsWithChildren> = ({ children }) => {
  const { user } = useAuth();
  return user?.token ? <>{children}</> : <Navigate to="/" replace />;
};

export default PrivateRoute;
