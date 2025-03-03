// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCHgZsgPCLkDwsqb8NpNgbTUQoYPz-5Vn0",
  authDomain: "footscore-a75ba.firebaseapp.com",
  projectId: "footscore-a75ba",
  storageBucket: "footscore-a75ba.firebasestorage.app",
  messagingSenderId: "664995531391",
  appId: "1:664995531391:web:69ab3c9621c8f2f854cd4a",
  measurementId: "G-3X46VBBNGK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);