import React from "react";
import { useAuth } from "../AuthContext";

const TeamList = () => {
  const { user } = useAuth();

  const favoriteTeams = user?.favoriteTeams || [];

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-2xl font-bold mb-4">Ulubione Drużyny</h1>
      {favoriteTeams.length > 0 ? (
        <ul className="list-disc pl-5">
          {favoriteTeams.map((team, index) => (
            <li key={index} className="text-lg mb-2">
              {team}
            </li>
          ))}
        </ul>
      ) : (
        <p className="text-gray-500">Nie dodałeś jeszcze ulubionych drużyn.</p>
      )}
    </div>
  );
};

export default TeamList;