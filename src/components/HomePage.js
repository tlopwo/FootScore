import React from "react";
import Header from "./Header";
import TeamList from "./TeamList";
import NewsSection from "./NewsSection";
import Footer from "./Footer";

const HomePage = () => {
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

export default HomePage;
