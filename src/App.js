import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Login from "./components/Login";
import HomePage from "./components/HomePage";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <Routes>
        <Route path="/" element={user ? <HomePage /> : <Login />} />
      </Routes>
    </Router>
  );
};

export default App;
