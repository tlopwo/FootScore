import React, { useEffect, useState } from "react";

const NewsSection = () => {
  const [news, setNews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const matchesPerPage = 10;

  useEffect(() => {
    const fetchNews = async () => {
      try {
        const apiKey = process.env.REACT_APP_FOOTBALL_API_KEY;
        console.log("Używany klucz API:", apiKey);
        if (!apiKey) {
          throw new Error("Brak klucza API w zmiennych środowiskowych");
        }

        const response = await fetch(
          `https://v3.football.api-sports.io/fixtures?season=2023&league=39`,
          {
            method: "GET",
            headers: {
              "x-rapidapi-key": apiKey,
              "x-rapidapi-host": "v3.football.api-sports.io",
            },
          }
        );

        if (!response.ok) {
          throw new Error(`Błąd pobierania danych: ${response.status}`);
        }

        const data = await response.json();
        console.log("Dane z API:", data);

        const fetchedNews = data.response.map((match) => ({
          id: match.fixture.id,
          title: `${match.teams.home.name} ${match.goals.home ?? "X"} - ${
            match.goals.away ?? "X"
          } ${match.teams.away.name}`,
          date: new Date(match.fixture.date).toLocaleString("pl-PL"),
        }));

        setNews(fetchedNews.reverse());
      } catch (err) {
        console.error("Błąd:", err.message);
        setError("Nie udało się pobrać aktualności: " + err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchNews();
  }, []);

  const totalMatches = news.length;
  const totalPages = Math.ceil(totalMatches / matchesPerPage);
  const startIndex = (currentPage - 1) * matchesPerPage;
  const currentMatches = news.slice(startIndex, startIndex + matchesPerPage);

  const handleNextPage = () => {
    if (currentPage < totalPages) setCurrentPage(currentPage + 1);
  };

  const handlePrevPage = () => {
    if (currentPage > 1) setCurrentPage(currentPage - 1);
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4 text-center">Aktualności piłkarskie:</h2>
      {loading && <p className="text-gray-500 text-center">Ładowanie...</p>}
      {error && <p className="text-red-500 text-center">{error}</p>}
      {!loading && !error && (
        <>
          <ul className="space-y-4 max-w-md mx-auto">
            {currentMatches.length > 0 ? (
              currentMatches.map((item) => (
                <li
                  key={item.id}
                  className="border p-3 rounded shadow-sm text-center text-sm"
                >
                  <h3 className="text-blue-600 font-bold">{item.title}</h3>
                  <p className="text-gray-500">{item.date}</p>
                </li>
              ))
            ) : (
              <p className="text-gray-500 text-center">Brak meczów do wyświetlenia.</p>
            )}
          </ul>
          {totalMatches > matchesPerPage && (
            <div className="mt-4 flex justify-center gap-4">
              <button
                onClick={handlePrevPage}
                disabled={currentPage === 1}
                className={`px-4 py-2 rounded ${
                  currentPage === 1
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Poprzednia
              </button>
              <span className="self-center">
                Strona {currentPage} z {totalPages}
              </span>
              <button
                onClick={handleNextPage}
                disabled={currentPage === totalPages}
                className={`px-4 py-2 rounded ${
                  currentPage === totalPages
                    ? "bg-gray-300 cursor-not-allowed"
                    : "bg-blue-500 text-white hover:bg-blue-600"
                }`}
              >
                Następna
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default NewsSection;