import React from "react";
import { useAuth } from "../AuthContext";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const Header = () => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <header className="bg-blue-600 text-white p-4 flex justify-between items-center">
      <h1 className="text-2xl font-bold">FootScore</h1>
      <nav className="flex gap-4">
        <Link to="/" className="hover:underline">
          Strona Główna
        </Link>
        {user && (
          <>
            <Link to="/profile" className="hover:underline">
              Profil
            </Link>
            <button
              onClick={logout}
              className="hover:underline text-red-500 font-bold"
            >
              Wyloguj
            </button>
          </>
        )}
      </nav>
    </header>
  );
};

export default Header;
