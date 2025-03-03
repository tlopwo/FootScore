import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const ResetPassword = () => {
  const { resetPassword } = useAuth();
  const [email, setEmail] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    resetPassword(email);
  };

  return (
    <div className="p-6 max-w-md mx-auto">
      <h2 className="text-2xl font-bold mb-4">Resetowanie Hasła</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="email"
          placeholder="Podaj swój email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="w-full p-2 border rounded"
          required
        />
        <button type="submit" className="w-full bg-blue-500 text-white p-2 rounded">
          Wyślij link resetujący
        </button>
      </form>
    </div>
  );
};

export default ResetPassword;
