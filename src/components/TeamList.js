import "./TeamList.css";
import React, { useState, useEffect } from "react";

const TeamList = () => {
  const [teams, setTeams] = useState(() => {
    // Wczytanie drużyn z Local Storage
    const savedTeams = localStorage.getItem("teams");
    return savedTeams ? JSON.parse(savedTeams) : [];
  });
  const [teamName, setTeamName] = useState("");

  useEffect(() => {
    // Zapisanie drużyn do Local Storage
    localStorage.setItem("teams", JSON.stringify(teams));
  }, [teams]);

  const addTeam = (e) => {
    e.preventDefault();
    if (teamName.trim()) {
      setTeams([...teams, teamName.trim()]);
      setTeamName("");
    }
  };
  const removeTeam = (index) => {
    setTeams(teams.filter((_, i) => i !== index)); // Usunięcie drużyny po indeksie
  };

  return (
    <div className="p-4">
      <h2 className="text-lg font-semibold mb-4">Twoje ulubione drużyny:</h2>
      <ul className="list-disc list-inside mb-4">
        {teams.map((team, index) => (
          <li key={index} className="flex justify-between items-center">
            <span>{team}</span>
            <button
              onClick={() => removeTeam(index)}
              className="text-red-600 hover:text-red-800 ml-2"
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>

      <form onSubmit={addTeam} className="flex items-center space-x-2">
        <input
          type="text"
          value={teamName}
          onChange={(e) => setTeamName(e.target.value)}
          placeholder="Dodaj drużynę"
          className="border rounded p-2 flex-grow"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Dodaj
        </button>
      </form>
    </div>
  );
};

export default TeamList;

// import React, { useState } from "react";

// const TeamList = () => {
//   const [teams, setTeams] = useState([]); // Lista drużyn
//   const [teamName, setTeamName] = useState(""); // Wartość w formularzu

//   // Funkcja dodająca drużynę
//   const addTeam = (e) => {
//     e.preventDefault(); // Zapobiegamy odświeżeniu strony
//     if (teamName.trim()) {
//       setTeams([...teams, teamName.trim()]); // Dodajemy drużynę do listy
//       setTeamName(""); // Czyścimy pole tekstowe
//     }
//   };

//   return (
//     <div className="p-4">
//       <h2 className="text-lg font-semibold mb-4">Twoje ulubione drużyny:</h2>
//       <ul className="list-disc list-inside mb-4">
//         {teams.map((team, index) => (
//           <li key={index}>{team}</li>
//         ))}
//       </ul>

//       {/* Formularz dodawania drużyn */}
//       <form onSubmit={addTeam} className="flex items-center space-x-2">
//         <input
//           type="text"
//           value={teamName}
//           onChange={(e) => setTeamName(e.target.value)}
//           placeholder="Dodaj drużynę"
//           className="border rounded p-2 flex-grow"
//         />
//         <button
//           type="submit"
//           className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
//         >
//           Dodaj
//         </button>
//       </form>
//     </div>
//   );
// };

// export default TeamList;
