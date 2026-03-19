import { db } from "./firebase-config.js";
import { collection, getDocs, deleteDoc, doc } from "https://www.gstatic.com/firebasejs/12.10.0/firebase-firestore.js";

// Auth check handled by admin-auth.js loaded in HTML

const list = document.getElementById("participants");
const tabs = document.getElementById("tabs");

let participants = [];

async function loadLeaderboard() {
  list.innerHTML = "<li>Loading...</li>";

  try {
    const snapshot = await getDocs(collection(db, "participants"));
    participants = [];
    snapshot.forEach(d => participants.push({ id: d.id, ...d.data() }));

    if (participants.length === 0) {
      list.innerHTML = "<li>No records yet</li>";
      return;
    }

    const categories = [...new Set(participants.map(p => p.category))];

    tabs.innerHTML = "";
    categories.forEach(cat => {
      const btn = document.createElement("button");
      btn.innerText = cat;
      btn.onclick = () => render(cat);
      tabs.appendChild(btn);
    });

    render(categories[0]);

  } catch (e) {
    list.innerHTML = "<li>Error loading leaderboard</li>";
    console.error(e);
  }
}

function render(category) {
  list.innerHTML = "";

  let filtered = participants.filter(p => p.category === category);

  filtered.sort((a, b) => {
    if (b.score !== a.score) return b.score - a.score;
    return a.timeTaken - b.timeTaken;
  });

  filtered.forEach((p, i) => {
    const li = document.createElement("li");
    li.innerHTML = `
    <div class="rank">#${i + 1}</div>
    <div class="player">${p.name}</div>
    <div class="score">${p.score}/${p.total}</div>
    <div class="time">${p.timeText}</div>
    `;
    list.appendChild(li);
  });
}

async function resetLeaderboard() {
  if (!confirm("Reset all leaderboard data?")) return;

  try {
    const snapshot = await getDocs(collection(db, "participants"));
    const deletes  = snapshot.docs.map(d => deleteDoc(doc(db, "participants", d.id)));
    await Promise.all(deletes);

    list.innerHTML  = "<li>Leaderboard cleared</li>";
    tabs.innerHTML  = "";
    participants    = [];
    console.log("Leaderboard reset ✅");
  } catch (e) {
    alert("Error resetting leaderboard");
    console.error(e);
  }
}

// Expose to HTML onclick
window.resetLeaderboard = resetLeaderboard;

loadLeaderboard();
