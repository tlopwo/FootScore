import React, { createContext, useState, useEffect, useContext } from "react";
import { auth, db } from "./firebaseConfig";
import {
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
  signOut,
  sendPasswordResetEmail,
  updatePassword,
} from "firebase/auth";
import { ref, set, get, update } from "firebase/database";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (firebaseUser) => {
      if (firebaseUser) {
        console.log("Użytkownik zalogowany w Firebase:", firebaseUser.uid);
        const userRef = ref(db, `users/${firebaseUser.uid}`);
        const snapshot = await get(userRef);
        const userData = snapshot.val() || {};
        console.log("Dane użytkownika z bazy:", userData);
        setUser({
          uid: firebaseUser.uid,
          email: firebaseUser.email,
          username: userData.username || firebaseUser.email.split("@")[0], // Opcjonalne: username jako fallback
          favoriteTeams: userData.favoriteTeams || [],
        });
      } else {
        console.log("Brak zalogowanego użytkownika");
        setUser(null);
      }
      setLoading(false);
    });
    return () => unsubscribe();
  }, []);

  // Logowanie z email
  const login = async (email, password) => {
    try {
      console.log("Próba logowania z email:", email);
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      console.log("Zalogowano użytkownika:", firebaseUser.email);

      const userRef = ref(db, `users/${firebaseUser.uid}`);
      const userSnapshot = await get(userRef);
      const userData = userSnapshot.val() || {};
      setUser({
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: userData.username || firebaseUser.email.split("@")[0],
        favoriteTeams: userData.favoriteTeams || [],
      });
      return true;
    } catch (error) {
      console.error("Błąd logowania:", error.message);
      return false;
    }
  };

  // Rejestracja z email
  const register = async (username, email, password) => {
    try {
      console.log("Próba rejestracji z email:", email);
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const firebaseUser = userCredential.user;
      const newUser = {
        uid: firebaseUser.uid,
        email: firebaseUser.email,
        username: username || firebaseUser.email.split("@")[0], // Opcjonalne: username
        favoriteTeams: [],
        createdAt: Date.now(),
      };
      await set(ref(db, `users/${firebaseUser.uid}`), {
        email: firebaseUser.email,
        username: username || firebaseUser.email.split("@")[0],
        favoriteTeams: [],
        createdAt: Date.now(),
      });
      setUser(newUser);
      return true;
    } catch (error) {
      console.error("Błąd rejestracji:", error.message);
      if (error.code === "auth/email-already-in-use") {
        return false;
      }
      return false;
    }
  };

  const logout = async () => {
    try {
      await signOut(auth);
      setUser(null);
      return true;
    } catch (error) {
      console.error("Błąd wylogowania:", error);
      return false;
    }
  };

  const resetPassword = async (email) => {
    try {
      await sendPasswordResetEmail(auth, email);
      alert(`Link do resetowania hasła został wysłany na ${email}`);
      return true;
    } catch (error) {
      console.error("Błąd resetowania hasła:", error);
      alert("Nie znaleziono konta z tym adresem e-mail lub wystąpił błąd.");
      return false;
    }
  };

  const updateFavoriteTeams = async (teams) => {
    if (user) {
      try {
        console.log("Aktualizacja favoriteTeams:", teams);
        const updatedUser = { ...user, favoriteTeams: teams };
        await update(ref(db, `users/${user.uid}`), { favoriteTeams: teams });
        setUser(updatedUser);
        console.log("favoriteTeams zaktualizowane w bazie");
        return true;
      } catch (error) {
        console.error("Błąd aktualizacji drużyn:", error);
        return false;
      }
    }
    return false;
  };

  const changePassword = async (oldPassword, newPassword) => {
    if (!user) return false;
    try {
      await signInWithEmailAndPassword(auth, user.email, oldPassword);
      await updatePassword(auth.currentUser, newPassword);
      return true;
    } catch (error) {
      console.error("Błąd zmiany hasła:", error);
      return false;
    }
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
        loading,
      }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);