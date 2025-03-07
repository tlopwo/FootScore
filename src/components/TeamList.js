import React from "react";
import { useAuth } from "../AuthContext";

const TeamList = () => {
  const { user, setUser } = useAuth(); 
  const favoriteTeams = user?.favoriteTeams || [];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Twoje Ulubione Drużyny</h1>
      {favoriteTeams.length > 0 ? (
        <ul className="list-disc">
          {favoriteTeams.map((team, index) => (
            <li key={index} className="flex justify-between items-center">
              {team}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nie obserwujesz jeszcze żadnych drużyn.</p>
      )}
    </div>
  );
};

export default TeamList;
