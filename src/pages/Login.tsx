import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import type { LoginRequest } from "../auth/types";
import "./Login.css";

const Login: React.FC = () => {
  const { login } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState<LoginRequest>({
    userName: "",
    password: "",
  });

  const [err, setErr] = useState<string>("");

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setForm((f) => ({ ...f, [name]: value }));
  };

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setErr("");
    try {
      await login(form);
      nav("/home", { replace: true });
    } catch (ex: any) {
      setErr(ex?.response?.data ?? "Login failed");
    }
  };

  return (
    <div className="login">
      <form onSubmit={onSubmit} className="login__card">
        <h2 className="login__title">Welcome back</h2>

        <input
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={onChange}
          className="login__input"
          required
        />

        <input
          name="password"
          placeholder="Password"
          type="password"
          value={form.password}
          onChange={onChange}
          className="login__input"
          required
        />

        {err && <p className="login__error">{err}</p>}

        <button className="login__btn">Login</button>

        <p className="login__bottom">
          No account? <Link to="/register">Sign up</Link>
        </p>
      </form>
    </div>
  );
};

export default Login;
