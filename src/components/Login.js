import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const Login = () => {
  const [username, setUsername] = useState("");
  const { login } = useAuth();

  const handleLogin = (e) => {
    e.preventDefault();
    login(username);
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <form
        onSubmit={handleLogin}
        className="p-6 bg-white rounded shadow-lg max-w-sm w-full"
      >
        <h2 className="text-2xl font-semibold mb-4">Logowanie</h2>
        <input
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
          className="w-full p-2 border rounded mb-4"
        />
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 rounded hover:bg-blue-700"
        >
          Zaloguj
        </button>
      </form>
    </div>
  );
};

export default Login;
