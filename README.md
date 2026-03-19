# Cyber Security Quiz Application
An interactive web-based quiz application to test and improve knowledge of cybersecurity concepts.  
Built using **HTML, CSS, and JavaScript** with **Firebase Firestore** as the cloud backend.

## 🎯 Features
- Multiple-choice questions on Networking and Cyber Law categories
- Instant answer feedback — correct answer highlights green, wrong highlights red
- Score and time tracking with personalized performance message
- Real-time shared leaderboard powered by Firebase Firestore
- Secure admin panel with session-based authentication
- Learning Hub with curated cybersecurity resources
- Clean, responsive UI optimized for both desktop and mobile

## 🚀 Getting Started

### 1. Clone the repository
```
https://github.com/KrishnaaSonar/Cyber-Quiz-Web-Application-v2.git
```

### 2. Open the application
Open the project folder in **VS Code** and launch with **Live Server** extension.  
Direct file opening won't work due to Firebase module imports.

### 🌐 Live Demo
Visit the link to access directly on web:  
https://cyber-quiz-web-application-v2.vercel.app/

---

## 🛠️ Tech Stack
- HTML5 — structure
- CSS3 — styling and responsive layout
- JavaScript (ES6 Modules) — quiz logic and interactivity
- Firebase Firestore — cloud database for shared leaderboard
- Vercel — deployment and hosting

## 📈 How It Works
1. User enters their name and selects a quiz category
2. Questions are loaded from `data.js` in randomized order
3. After each answer, instant feedback is shown
4. Score and time taken are saved to Firebase Firestore on completion
5. Admin can view and manage the shared leaderboard via the admin panel

## 🔐 Admin Panel
- Accessible via the Admin Login link on the home page
- Protected with session-based token authentication
- Allows viewing and resetting the leaderboard

## 🤝 Contributing
Contributions are welcome! You can:
- Add new questions or categories
- Enhance UI/UX
- Improve performance or add new features

To contribute:
1. Fork the repo
2. Create a new branch (`feature-new-idea`)
3. Commit changes
4. Open a pull request

---

### 👤 Author
Krishna Sonar
