import React, { useState, useEffect } from "react";
import { useAuth } from "../AuthContext";
import { db } from "../firebaseConfig";
import { ref, onValue } from "firebase/database";

const TeamList = () => {
  const { user } = useAuth();
  const [favoriteTeams, setFavoriteTeams] = useState(user?.favoriteTeams || []);

  useEffect(() => {
    if (!user) return;

    const userTeamsRef = ref(db, `users/${user.uid}/favoriteTeams`);
    const unsubscribe = onValue(userTeamsRef, (snapshot) => {
      const data = snapshot.val();
      console.log("Pobrane favoriteTeams z bazy:", data);
      setFavoriteTeams(data || []); 
    });

    return () => unsubscribe();
  }, [user]); 

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