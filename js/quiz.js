localStorage.setItem("quizStartTime", Date.now());
localStorage.removeItem("resultSaved");

const selectedCategory = localStorage.getItem("selectedCategory");

let quizQuestions = questions[selectedCategory];

if (!quizQuestions || quizQuestions.length === 0) {
  alert("No questions available");
  location.href = "index.html";
}

quizQuestions = quizQuestions.sort(() => Math.random() - 0.5);
localStorage.setItem("shuffledQuestions", JSON.stringify(quizQuestions));

let index = 0;
let answers = [];
let feedbackShown = false;

const questionEl = document.getElementById("question");
const optionsEl  = document.getElementById("options");
const progressEl = document.getElementById("progress");
const nextBtn    = document.getElementById("nextBtn");

function loadQuestion() {
  feedbackShown = false;
  nextBtn.innerText = "Next";

  const q = quizQuestions[index];
  questionEl.innerText = q.question;
  optionsEl.innerHTML  = "";
  progressEl.innerText = `Question ${index + 1} of ${quizQuestions.length}`;

  q.options.forEach((opt, i) => {
    const li = document.createElement("li");
    li.innerText = opt;
    li.onclick = () => selectOption(i, li);
    optionsEl.appendChild(li);
  });
}

function selectOption(i, li) {
  // Don't allow changing answer after feedback shown
  if (feedbackShown) return;

  document.querySelectorAll("li").forEach(el =>
    el.classList.remove("selected")
  );
  li.classList.add("selected");
  answers[index] = i;
}

function nextQuestion() {
  if (answers[index] == null) {
    alert("Select an option");
    return;
  }
  showFeedback();
}

function showFeedback() {
  feedbackShown = true;
  nextBtn.disabled = true;
  nextBtn.innerText = "Next";

  const correctIndex = quizQuestions[index].answer;
  const items = document.querySelectorAll("li");

  items.forEach((li, i) => {
    li.onclick = null;
    if (i === correctIndex) {
      li.classList.add("correct");
    } else if (i === answers[index] && i !== correctIndex) {
      li.classList.add("wrong");
    }
  });

  // Auto advance after 1.5 seconds
  setTimeout(() => {
    nextBtn.disabled = false;
    index++;
    if (index < quizQuestions.length) {
      loadQuestion();
    } else {
      localStorage.setItem("answers", JSON.stringify(answers));
      location.href = "result.html";
    }
  }, 2000);
}

loadQuestion();