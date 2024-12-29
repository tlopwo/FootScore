import React, { useState } from "react";
import { useAuth } from "../AuthContext";

const UserProfile = () => {
  const { user, updateFavoriteTeams, changePassword, logout } = useAuth();
  const [newTeams, setNewTeams] = useState("");
  const [oldPassword, setOldPassword] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleAddTeams = () => {
    if (!newTeams.trim()) {
      setError("Pole drużyn nie może być puste.");
      return;
    }
    const teamsArray = newTeams.split(",").map((team) => team.trim());
    updateFavoriteTeams([...user.favoriteTeams, ...teamsArray]);
    setMessage("Drużyny zostały dodane do ulubionych.");
    setError("");
    setNewTeams(""); 
  };

  const handleRemoveTeam = (teamToRemove) => {
    const updatedTeams = user.favoriteTeams.filter((team) => team !== teamToRemove);
    updateFavoriteTeams(updatedTeams);
    setMessage(`Drużyna "${teamToRemove}" została usunięta z ulubionych.`);
    setError("");
  };

  const handleChangePassword = () => {
    if (!oldPassword || !newPassword) {
      setError("Musisz wypełnić oba pola do zmiany hasła.");
      return;
    }
    const success = changePassword(oldPassword, newPassword);
    if (success) {
      setMessage("Hasło zostało zmienione.");
      setError("");
      setOldPassword("");
      setNewPassword("");
    } else {
      setError("Nieprawidłowe stare hasło.");
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Profil Użytkownika</h1>
      <p>
        <strong>Nazwa:</strong> {user.username}
      </p>
      <p>
        <strong>Email:</strong> {user.email}
      </p>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Ulubione Drużyny</h2>
        <ul className="list-disc pl-5">
          {user.favoriteTeams.map((team, index) => (
            <li key={index} className="flex justify-between items-center">
              {team}
              <button
                onClick={() => handleRemoveTeam(team)}
                className="text-red-500 text-sm ml-4 hover:underline"
              >
                Usuń
              </button>
            </li>
          ))}
        </ul>
        <input
          type="text"
          value={newTeams}
          onChange={(e) => setNewTeams(e.target.value)}
          className="border p-2 w-full mt-2 mb-2"
          placeholder="Dodaj drużyny, oddzielone przecinkami"
        />
        <button
          onClick={handleAddTeams}
          className="bg-blue-500 text-white px-4 py-2 rounded"
        >
          Dodaj Drużyny
        </button>
      </div>

      <div className="mt-6">
        <h2 className="text-xl font-bold mb-2">Zmiana Hasła</h2>
        <input
          type="password"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Stare hasło"
        />
        <input
          type="password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="border p-2 w-full mb-2"
          placeholder="Nowe hasło"
        />
        <button
          onClick={handleChangePassword}
          className="bg-green-500 text-white px-4 py-2 rounded"
        >
          Zmień Hasło
        </button>
      </div>

      {message && <p className="mt-4 text-green-600">{message}</p>}
      {error && <p className="mt-4 text-red-600">{error}</p>}

      <button
        onClick={logout}
        className="bg-red-500 text-white px-4 py-2 rounded mt-6"
      >
        Wyloguj się
      </button>
    </div>
  );
};

export default UserProfile;
