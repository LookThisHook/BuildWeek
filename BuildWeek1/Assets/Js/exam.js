resetQuizData();
// Selezione del canvas e configurazione del contesto
const canvas = document.getElementById("countdown");
const ctx = canvas.getContext("2d");

// Configurazione del cerchio
const radius = 60; // Raggio del cerchio
const fullTime = 60; // Durata del timer
let remainingTime = fullTime;

// Reset delle risposte salvate
function resetQuizData() {
  localStorage.setItem("risposteCorrette", JSON.stringify([]));
  localStorage.setItem("risposteSbagliate", JSON.stringify([]));
}

// Chiama il reset all'inizio
resetQuizData();

// Funzione per disegnare il cerchio
function drawCircle(progress) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  // Cerchio di sfondo
  ctx.beginPath();
  ctx.arc(100, 100, radius, 0, 2 * Math.PI, false);
  ctx.strokeStyle = "#ecf0f1";
  ctx.lineWidth = 10;
  ctx.stroke();

  // Cerchio progressivo
  ctx.beginPath();
  ctx.arc(
    100,
    100,
    radius,
    -Math.PI / 2,
    -Math.PI / 2 + 2 * Math.PI * progress,
    false
  );
  ctx.strokeStyle = "#d20094";
  ctx.lineWidth = 10;
  ctx.stroke();
}

// Funzione per far partire il timer
function startTimer() {
  const interval = 50; // Intervallo di aggiornamento (50 ms)
  const totalSteps = (fullTime * 1000) / interval; // Numero totale di aggiornamenti
  let step = 0;

  const timer = setInterval(() => {
    step++;
    remainingTime = Math.max(0, fullTime - (step * interval) / 1000); // Calcolo del tempo rimanente
    const progress = remainingTime / fullTime; // Progresso percentuale
    drawCircle(progress); // Aggiornamento del cerchio

    // Testo all'interno del cerchio
    ctx.font = "normal 10px Outfit";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SECONDS", 100, 78);
    ctx.font = "normal 45px Outfit";
    ctx.fillText(Math.floor(remainingTime), 100, 118);
    ctx.font = "normal 10px Outfit";
    ctx.fillText("REMAINING", 100, 135);

    // Fine del timer
    if (remainingTime <= 0) {
      clearInterval(timer);
      goToResultPage();
    }

    // Fermare il timer quando viene confermata una risposta
    document.getElementById("answerConfirm").addEventListener("click", function (e) {
      e.preventDefault();
      clearInterval(timer);
    });
  }, interval);
}

// Disegna il cerchio iniziale e avvia il timer
drawCircle(1);
startTimer();


// DOMANDE

const questions = [
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "What does CPU stand for?",
    correct_answer: "Central Processing Unit",
    incorrect_answers: [
      "Central Process Unit",
      "Computer Personal Unit",
      "Central Processor Unit",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "In the programming language Java, which of these keywords would you put on a variable to make sure it doesn&#039;t get modified?",
    correct_answer: "Final",
    incorrect_answers: ["Static", "Private", "Public"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "The logo for Snapchat is a Bell.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question:
      "Pointers were not used in the original C programming language; they were added later on in C++.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the most preferred image format used for logos in the Wikimedia database?",
    correct_answer: ".svg",
    incorrect_answers: [".png", ".jpeg", ".gif"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "In web design, what does CSS stand for?",
    correct_answer: "Cascading Style Sheet",
    incorrect_answers: [
      "Counter Strike: Source",
      "Corrective Style Sheet",
      "Computer Style Sheet",
    ],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "What is the code name for the mobile operating system Android 7.0?",
    correct_answer: "Nougat",
    incorrect_answers: ["Ice Cream Sandwich", "Jelly Bean", "Marshmallow"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question: "On Twitter, what is the character limit for a Tweet?",
    correct_answer: "140",
    incorrect_answers: ["120", "160", "100"],
  },
  {
    category: "Science: Computers",
    type: "boolean",
    difficulty: "easy",
    question: "Linux was first created as an alternative to Windows XP.",
    correct_answer: "False",
    incorrect_answers: ["True"],
  },
  {
    category: "Science: Computers",
    type: "multiple",
    difficulty: "easy",
    question:
      "Which programming language shares its name with an island in Indonesia?",
    correct_answer: "Java",
    incorrect_answers: ["Python", "C", "Jakarta"],
  },
];

function resetQuizData() {
  localStorage.setItem("risposteCorrette", JSON.stringify([]));
  localStorage.setItem("risposteSbagliate", JSON.stringify([]));
}



let randomNumber = 0;
let numberQuestion = 1;
const arraySubmitAnswers = [];

// Mostrare una domanda casuale
function randomQuestion() {
  do {
    randomNumber = Math.floor(Math.random() * questions.length);
  } while (arraySubmitAnswers.includes(randomNumber));
  return randomNumber;
}

const theQuestion = () => {
  const questionHTML = document.getElementById("question");
  questionHTML.innerText = questions[randomNumber].question;
  const questionContainer = document.getElementById("options");
  const incorrect_answers = [...questions[randomNumber].incorrect_answers];
  const correct_answer = questions[randomNumber].correct_answer;

  incorrect_answers.push(correct_answer);
  incorrect_answers.sort(() => Math.random() - 0.5);

  incorrect_answers.forEach((answer, i) => {
    const divOption = document.createElement("label");
    divOption.classList.add("optionContainer");
    const radio = document.createElement("input");
    const option = document.createElement("div");
    option.classList.add("option");

    divOption.appendChild(radio);
    divOption.appendChild(option);
    radio.setAttribute("type", "radio");
    radio.setAttribute("name", "option");
    option.innerText = answer;

    divOption.setAttribute("onclick", `isCorrect('${answer}')`);
    questionContainer.appendChild(divOption);
  });

  arraySubmitAnswers.push(randomNumber);
};

theQuestion();

const isCorrect = (selectedAnswer) => {
  const risposteCorrette = JSON.parse(localStorage.getItem("risposteCorrette")) || [];
  const risposteSbagliate = JSON.parse(localStorage.getItem("risposteSbagliate")) || [];

  if (questions[randomNumber].correct_answer === selectedAnswer) {
    if (!risposteCorrette.includes(questions[randomNumber].question)) {
      risposteCorrette.push(questions[randomNumber].question);
    }
  } else {
    if (!risposteSbagliate.includes(questions[randomNumber].question)) {
      risposteSbagliate.push(questions[randomNumber].question);
    }
  }

  localStorage.setItem("risposteCorrette", JSON.stringify(risposteCorrette));
  localStorage.setItem("risposteSbagliate", JSON.stringify(risposteSbagliate));
};

const goToResultPage = () => {
  location.href = "result.html";
};

document.getElementById("answerConfirm").addEventListener("click", function () {
  resetAllAnswers();
  if (arraySubmitAnswers.length < questions.length) {
    randomQuestion();
    theQuestion();
    startTimer();
    numberQuestion++;
    document.getElementById("numberQuestion").innerText = numberQuestion;
  } else {
    goToResultPage();
  }
});

const resetAllAnswers = () => {
  document.querySelectorAll(".optionContainer").forEach((element) => {
    element.remove();
  });
};