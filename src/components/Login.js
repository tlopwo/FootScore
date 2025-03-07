import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Próba logowania, email:", email);
    const success = await login(email, password);
    console.log("Wynik logowania:", success);

    if (success) {
      console.log("Logowanie udane, przekierowuję...");
      navigate("/");
    } else {
      setError("Nieprawidłowy email lub hasło.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Logowanie</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <input
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

          <button
            type="submit"
            className="w-full bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
          >
            Zaloguj się
          </button>
        </form>

        <p className="mt-4 text-center">
          <Link to="/reset-password" className="text-blue-500 hover:underline">
            Zapomniałeś hasła?
          </Link>
        </p>

        <p className="mt-2 text-center">
          Nie masz konta?{" "}
          <Link to="/register" className="text-blue-500 hover:underline">
            Zarejestruj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Login;