import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../auth/AuthContext";
import "./Home.css";

const Home: React.FC = () => {
  const { user, logout } = useAuth();
  const nav = useNavigate();

  return (
    <div className="home">
      <div className="home__card">
        <h1 className="home__title">Welcome, {user?.userName}</h1>

        <button className="home__btn home__btn--primary" onClick={() => nav("/customers")}>
          View All Customers
        </button>

        <button className="home__btn home__btn--secondary" onClick={() => nav("/customers/manage")}>
          Manage Customers
        </button>

        <button className="home__btn home__btn--logout" onClick={logout}>
          Logout
        </button>
      </div>
    </div>
  );
};

export default Home;
