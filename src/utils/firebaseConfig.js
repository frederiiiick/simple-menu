// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getDatabase } from "firebase/database";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAEJBXtbP__wWQ-7qU3OSNmr2EAs3SLRAY",
  authDomain: "simple-menu-list.firebaseapp.com",
  databaseURL: "https://simple-menu-list-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "simple-menu-list",
  storageBucket: "simple-menu-list.appspot.com",
  messagingSenderId: "924314066821",
  appId: "1:924314066821:web:af089fb42f62f79fdc2eec",
  measurementId: "G-VNHZ8G5QL1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const database = getDatabase(app);
export const analytics = getAnalytics(app);