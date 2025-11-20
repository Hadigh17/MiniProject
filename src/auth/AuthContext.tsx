import React, { createContext, useContext, useMemo, useState } from "react";
import api from "../api/axios";
import type { AuthResponse, AuthUser, LoginRequest, RegisterRequest } from "./types";

type AuthContextValue = {
  user: AuthUser | null;
  login: (payload: LoginRequest) => Promise<void>;
  register: (payload: RegisterRequest) => Promise<void>;
  logout: () => void;
};

const AuthContext = createContext<AuthContextValue | null>(null);

export const AuthProvider: React.FC<React.PropsWithChildren> = ({ children }) => {
  const [user, setUser] = useState<AuthUser | null>(() => {
    const token = localStorage.getItem("token");
    const userName = localStorage.getItem("userName");
    return token && userName ? { token, userName } : null;
  });

  const login = async (payload: LoginRequest) => {
    const res = await api.post<AuthResponse>("/Users/login", payload);
    const { token, userName } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setUser({ token, userName });
  };

  const register = async (payload: RegisterRequest) => {
    const res = await api.post<AuthResponse>("/Users/register", payload);
    const { token, userName } = res.data;

    localStorage.setItem("token", token);
    localStorage.setItem("userName", userName);
    setUser({ token, userName });
  };

  const logout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("userName");
    setUser(null);
  };

  const value = useMemo(() => ({ user, login, register, logout }), [user]);

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = (): AuthContextValue => {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used inside AuthProvider");
  return ctx;
};
