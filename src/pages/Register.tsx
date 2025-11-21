import React, { useState } from "react";
import { useAuth } from "../auth/AuthContext";
import { Link, useNavigate } from "react-router-dom";
import type { RegisterRequest } from "../auth/types";
import "./Register.css";

const Register: React.FC = () => {
  const { register } = useAuth();
  const nav = useNavigate();

  const [form, setForm] = useState<RegisterRequest>({
    userName: "",
    email: "",
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
      await register(form);
      nav("/home", { replace: true });
    } catch (ex: any) {
      setErr(ex?.response?.data ?? "Register failed");
    }
  };

  return (
    <div className="register">
      <form onSubmit={onSubmit} className="register__card">
        <h2 className="register__title">Create Account</h2>

        <input
          name="userName"
          placeholder="Username"
          value={form.userName}
          onChange={onChange}
          className="register__input"
          required
        />
        <input
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={onChange}
          className="register__input"
          type="email"
          required
        />
        <input
          name="password"
          placeholder="Password"
          value={form.password}
          onChange={onChange}
          className="register__input"
          type="password"
          required
        />

        {err && <p className="register__error">{err}</p>}

        <button className="register__btn">Sign up</button>

        <p className="register__bottom">
          Already have an account? <Link to="/">Login</Link>
        </p>
      </form>
    </div>
  );
};

export default Register;
