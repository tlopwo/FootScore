import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../AuthContext";


const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleRegister = (e) => {
    e.preventDefault();
    if (register(username, password)) {
      navigate("/");
    } else {
      setError("Nazwa użytkownika jest już zajęta.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleRegister}
        className="p-6 bg-white rounded shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Rejestracja</h2>
        {error && <p className="text-red-500 mb-4">{error}</p>}
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <input
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700"
        >
          Zarejestruj się
        </button>
        <p className="mt-4 text-center">
          Masz już konto?{" "}
          <button
            type="button"
            onClick={() => navigate("/")}
            className="text-blue-600 hover:underline"
          >
            Zaloguj się
          </button>
        </p>
      </form>
    </div>
  );
};

export default Register;
