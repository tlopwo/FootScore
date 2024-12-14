import React from "react";
import Header from "./components/Header";
import TeamList from "./components/TeamList";
import NewsSection from "./components/NewsSection";
import Footer from "./components/Footer";

const App = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow">
        <TeamList />
        <NewsSection />
      </main>
      <Footer />
    </div>
  );
};

export default App;