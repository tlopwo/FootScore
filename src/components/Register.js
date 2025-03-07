import React, { useState } from "react";
import { useAuth } from "../AuthContext";
import { Link, useNavigate } from "react-router-dom";

const Register = () => {
  const { register } = useAuth();
  const navigate = useNavigate();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");

    console.log("Próba rejestracji, username:", username, "email:", email);
    const success = await register(username, email, password);
    console.log("Wynik rejestracji:", success);

    if (success) {
      console.log("Rejestracja udana, przekierowuję...");
      navigate("/");
    } else {
      setError("Rejestracja nie powiodła się. Email może być już w użyciu lub dane są nieprawidłowe.");
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-50">
      <div className="p-6 bg-white rounded shadow-lg max-w-md w-full">
        <h2 className="text-2xl font-semibold text-center mb-4">Rejestracja</h2>

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full p-2 border rounded"
            required
          />

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
            Zarejestruj się
          </button>
        </form>

        <p className="mt-2 text-center">
          Masz już konto?{" "}
          <Link to="/login" className="text-blue-500 hover:underline">
            Zaloguj się
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;