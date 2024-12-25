import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Header from "./components/Header";
import Footer from "./components/Footer";
import TeamList from "./components/TeamList";
import NewsSection from "./components/NewsSection";
import Login from "./components/Login";
import Register from "./components/Register";
import UserProfile from "./components/UserProfile";

const App = () => {
  const { user } = useAuth();

  return (
    <Router>
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-grow">
          <Routes>
            <Route
              path="/"
              element={
                user ? (
                  <>
                    <TeamList />
                    <NewsSection />
                  </>
                ) : (
                  <Login />
                )
              }
            />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/profile" element={<UserProfile />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </Router>
  );
};

export default App;
