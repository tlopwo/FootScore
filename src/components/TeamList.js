import React, { useState, useEffect } from "react";

const MatchesList = () => {
  const [matches, setMatches] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchMatches = async () => {
      const myHeaders = new Headers();
      myHeaders.append("x-rapidapi-key", "process.env.REACT_APP_RAPIDAPI_KEY");
      myHeaders.append("x-rapidapi-host", "v3.football.api-sports.io");

      const requestOptions = {
        method: "GET",
        headers: myHeaders,
        redirect: "follow",
      };

      try {
        const response = await fetch("https://v3.football.api-sports.io/matches", requestOptions);

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }

        const result = await response.json();
        console.log(result); // Debug: sprawdź strukturę odpowiedzi
        setMatches(result.response); // Zakładam, że dane są w `response`
      } catch (error) {
        console.error("Fetch error:", error);
        setError(error.message);
      }
    };

    fetchMatches();
  }, []);

  return (
    <div>
      <h1>Matches List</h1>
      {error && <p style={{ color: "red" }}>Error: {error}</p>}
      <ul>
        {matches.map((match) => (
          <li key={match.fixture.id}>
            {match.teams.home.name} vs {match.teams.away.name} - {match.fixture.date}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default MatchesList;
