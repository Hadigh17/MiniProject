import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Navbar.css";

const Navbar: React.FC = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <nav className="navbar">
      <div className="navbar__left">
        <h2 className="navbar__logo" onClick={() => nav("/")}>
          MiniProject
        </h2>

        {user && (
          <>
            <Link className="navbar__link" to="/customers">
              View Customers
            </Link>

            <Link className="navbar__link" to="/customers/manage">
              Manage Customers
            </Link>
          </>
        )}
      </div>

      <div className="navbar__right">
        {user ? (
          <>
            <span className="navbar__user">👋 {user.userName}</span>
            <button className="navbar__logout" onClick={logout}>
              Logout
            </button>
          </>
        ) : (
          <>
            <Link className="navbar__link" to="/login">
              Login
            </Link>
            <Link className="navbar__link" to="/register">
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
