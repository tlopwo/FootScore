import React from "react";
import { useAuth } from "../AuthContext";

const UserProfile = () => {
  const { user, logout } = useAuth();

  return (
    <div>
      <h1>Cześć, {user ? user.username : "Gość"}!</h1>
      {user && (
        <button onClick={logout}>
          Wyloguj
        </button>
      )}
    </div>
  );
};

export default UserProfile;