import { db } from "./firebase-config.js";
import { collection, addDoc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

const name     = localStorage.getItem("currentUser");
const category = localStorage.getItem("selectedCategory");

const quizQuestions = JSON.parse(localStorage.getItem("shuffledQuestions"));
const answers = JSON.parse(localStorage.getItem("answers")) || [];

let score = 0;
answers.forEach((a, i) => {
  if (a === quizQuestions[i].answer) score++;
});

document.getElementById("score").innerText =
  `You scored ${score} out of ${quizQuestions.length}`;

const startTime       = parseInt(localStorage.getItem("quizStartTime"), 10);
const endTime         = Date.now();
const timeTakenSeconds = Math.floor((endTime - startTime) / 1000);
const minutes         = Math.floor(timeTakenSeconds / 60);
const seconds         = timeTakenSeconds % 60;
const timeTakenText   = minutes > 0
  ? `${minutes} min ${seconds} sec`
  : `${seconds} sec`;

document.getElementById("timeTaken").innerText =
  `Time taken: ${timeTakenText}`;

// Save to Firestore
async function saveResult() {
  // Fix 3: Prevent duplicate saves if user refreshes result page
  if (localStorage.getItem("resultSaved") === "true") {
    console.log("Result already saved, skipping duplicate.");
    return;
  }
  try {
    await addDoc(collection(db, "participants"), {
      name,
      category,
      score,
      total:       quizQuestions.length,
      timeTaken:   timeTakenSeconds,
      timeText:    timeTakenText,
      completedAt: new Date().toLocaleString()
    });
    // Mark as saved so refresh won't duplicate
    localStorage.setItem("resultSaved", "true");
    console.log("Result saved to Firebase ✅");
  } catch (e) {
    console.error("Error saving result:", e);
  }
}

saveResult();

// Result message
const percentage = Math.round((score / quizQuestions.length) * 100);
let message = "";

if (percentage >= 80) {
  message = "Excellent work! You have a strong understanding of this topic.";
} else if (percentage >= 50) {
  message = "Good effort! You're on the right track, keep improving.";
} else {
  message = "Don't worry. Review the basics and try again!";
}

document.getElementById("message").innerText = message;
