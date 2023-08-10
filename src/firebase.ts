// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const FIREBASE_API_KEY = process.env.REACT_APP_FIREBASE_API_KEY;
const FIREBASE_DB_URL = process.env.REACT_APP_FIREBASE_DB_URL;

const firebaseConfig = {
  apiKey: `${FIREBASE_API_KEY}`,
  authDomain: "commerce-project-e0f98.firebaseapp.com",
  databaseURL: `${FIREBASE_DB_URL}`,
  projectId: "commerce-project-e0f98",
  storageBucket: "commerce-project-e0f98.appspot.com",
  messagingSenderId: "961205975969",
  appId: "1:961205975969:web:9841a1f7e1a7261598a9e0",
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const firebaseDB = getDatabase(firebaseApp);
