import { initializeApp } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyCTlvVMMzcLEcNLnqb1FC98y4lGNIid3ZA",
  authDomain: "quiz-92e6f.firebaseapp.com",
  projectId: "quiz-92e6f",
  storageBucket: "quiz-92e6f.firebasestorage.app",
  messagingSenderId: "56768864767",
  appId: "1:56768864767:web:d47c5552dac92e318847ca"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
