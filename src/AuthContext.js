import React, { createContext, useState, useContext } from "react";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = (username, password) => {
    const storedUser = JSON.parse(localStorage.getItem(username));
    if (storedUser && storedUser.password === password) {
      setUser(storedUser);
      localStorage.setItem("user", JSON.stringify(storedUser));
      return true;
    }
    return false;
  };

  const register = (username, email, password) => {
    const existingUser = Object.keys(localStorage).find((key) => {
      const storedUser = JSON.parse(localStorage.getItem(key));
      return storedUser?.email === email || key === username;
    });

    if (existingUser) return false;

    const newUser = { username, email, password, favoriteTeams: [] };
    localStorage.setItem(username, JSON.stringify(newUser));
    localStorage.setItem("user", JSON.stringify(newUser)); // Zalogowanie po rejestracji
    setUser(newUser);
    return true;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem("user");
  };

  const resetPassword = (email) => {
    const storedUserKey = Object.keys(localStorage).find((key) => {
      const storedUser = JSON.parse(localStorage.getItem(key));
      return storedUser?.email === email;
    });

    if (storedUserKey) {
      alert(`Link do resetowania hasła został wysłany na ${email}`);
    } else {
      alert("Nie znaleziono konta z tym adresem e-mail.");
    }
  };

  const updateFavoriteTeams = (teams) => {
    if (user) {
      const updatedUser = { ...user, favoriteTeams: teams };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem(user.username, JSON.stringify(updatedUser));
    }
  };

  const changePassword = (oldPassword, newPassword) => {
    if (user && user.password === oldPassword) {
      const updatedUser = { ...user, password: newPassword };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      localStorage.setItem(user.username, JSON.stringify(updatedUser));
      return true;
    }
    return false;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        login,
        register,
        logout,
        updateFavoriteTeams,
        changePassword,
        resetPassword,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
