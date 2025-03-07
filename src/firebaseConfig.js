// src/firebaseConfig.js
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getDatabase } from "firebase/database";


const firebaseConfig = {
  apiKey: "AIzaSyCHgZsgPCLkDwsqb8NpNgbTUQoYPz-5Vn0",
  authDomain: "footscore-a75ba.firebaseapp.com",
  projectId: "footscore-a75ba",
  storageBucket: "footscore-a75ba.firebasestorage.app",
  messagingSenderId: "664995531391",
  appId: "1:664995531391:web:69ab3c9621c8f2f854cd4a",
  measurementId: "G-3X46VBBNGK",
  databaseURL: "https://footscore-a75ba-default-rtdb.europe-west1.firebasedatabase.app",
};


const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getDatabase(app);


export { app, auth, db };