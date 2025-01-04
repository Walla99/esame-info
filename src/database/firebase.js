// firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyBjEtGJPLsB7I_SYbJndoY4rd4yxche_hE",
  authDomain: "weathersite-a6810.firebaseapp.com",
  projectId: "weathersite-a6810",
  storageBucket: "weathersite-a6810.firebasestorage.app",
  messagingSenderId: "1068271351522",
  appId: "1:1068271351522:web:dafddee72fb174e26390bb"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
