/*
let myChart;
let indexTime = 60;

function drawPieChart(value, maxValue) {
  const ctx = document.getElementById('countdown').getContext('2d');
  myChart = new Chart(ctx, {
    type: 'doughnut',
    text:indexTime,
    data: {
      datasets: [
        {
          data: [value, maxValue - value],
          backgroundColor: ['#00ffff', 'white'],
        },
      ],
    },
    options: {
      tooltips: {
        enabled: false,
      },
      subtitle: {
        display: true,
        text: indexTime,
        color: 'white',
        font: {
          size: 22,
          family: 'Roboto',
          weight: 'normal',
        },
        padding: {
          bottom: 10
        },
      plugins: {
        datalabels: {
          backgroundColor: function (context) {
            return context.dataset.backgroundColor;
          },
          display: function (context) {
            //let dataset = context.dataset;
            //let value = dataset.data[context.dataIndex];
            return value > 0;
          },
          color: 'white',
        },
      },
    },
  },
  });
}

function updateChart(chart, counter) {
  chart.data.datasets[0].data[1] = counter;
  chart.update();
}

const init = () => {
  drawPieChart(60 *150 /360, 60);

  let counter = 0;
  setInterval(() => {
    counter = counter + 1;

    updateChart(myChart, counter);
  }, 1000);
};

const timer = () => {
  indexTime--;
  document.getElementById("timer-right").innerText = indexTime;
  return indexTime;
}
init();
*/

// Selezione del canvas e configurazione del contesto
const canvas = document.getElementById("countdown");
const ctx = canvas.getContext("2d");

// Configurazione del cerchio
const radius = 60; // Raggio del cerchio
const fullTime = 60;
let remainingTime = fullTime;

// Funzione per disegnare il cerchio
function drawCircle(progress) {
  // Pulizia del canvas
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

  ctx.strokeStyle = "#3498db";
  ctx.lineWidth = 10;
  ctx.stroke();
}

// Funzione per far partire il timer
function startTimer() {
  const interval = 1000; // Intervallo di aggiornamento (50 ms)
  const totalSteps = (fullTime * 1000) / interval; // Numero totale di aggiornamenti
  let step = 0;

  const timer = setInterval(() => {
    step++;
    remainingTime = Math.max(0, fullTime - (step * interval) / 1000); // Calcolo del tempo rimanente
    const progress = remainingTime / fullTime; // Progresso percentuale
    drawCircle(progress); // Aggiornamento del cerchio

    ctx.font = "normal 10px Outfit";
    ctx.fillStyle = "white";
    ctx.textAlign = "center";
    ctx.fillText("SECONDS", 100, 78);
    ctx.font = "normal 45px Outfit";
    ctx.fillText(remainingTime, 100, 118);
    ctx.font = "normal 10px Outfit";
    ctx.fillText('REMAINING', 100, 135)

    // Fine del timer
    if (remainingTime <= 0) {
      clearInterval(timer);
      console.log("Timer completato!");
    }
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

let flagStateRandom = true;
let randomNumber = 0;
let numberQuestion = 1;

function randomQuestion() {
  flagStateRandom = flagStateRandom
    ? (randomNumber = Math.floor(Math.random() * questions.length))
    : false;
  flagStateRandom = randomNumber;
  return flagStateRandom;
}

const theQuestion = () => {
  flagStateRandom = false;
  const questionRand = randomNumber;
  const questionContaier = document.getElementById("quiz-container");
  const incorrect_answers = questions[questionRand].incorrect_answers;
  const correct_answer = questions[questionRand].correct_answer;
  incorrect_answers.push(correct_answer);
  incorrect_answers.sort(() =>
    Math.floor(Math.random() * incorrect_answers.length)
  );
  console.log(incorrect_answers);

  for (let i = 0; i < incorrect_answers.length; i++) {
    console.log(i);
    const answer = document.createElement("button");
    answer.innerText = incorrect_answers[i];
    answer.classList.add("option");
    answer.setAttribute("onclick", `isCorrect(${i})`);
    questionContaier.appendChild(answer);
    console.log(answer);
  }
};

theQuestion();

let incorrect_answers_number = 0;
let correct_answer_number = 0;

const isCorrect = (i) => {
  const btnAnswers = document.querySelectorAll("button:not(#answerConfirm)")[i];
  btnAnswers.classList.add("selected");
  console.log(btnAnswers);
  if (questions[i].incorrect_answers[i] === btnAnswers.innerText) {
    incorrect_answers_number++;
    console.log(incorrect_answers_number);
    localStorage.setItem(incorrect_answers_number, "Risposta sbagliata");
  } else if (questions[i].correct_answer === btnAnswers.innerText) {
    correct_answer_number++;
    console.log(correct_answers_number);
    localStorage.setItem(correct_answers_number, "Risposta Corretta");
  }
};

const whichAnswer = () => {
  let questionHTML = document.getElementById("question");
  const questionRand = randomQuestion();
  questionHTML.innerText = questions[questionRand].question;
};

const nextQuestions = () => {
  flagStateRandom = true;
  whichAnswer();
  theQuestion();
};

whichAnswer();

const resetAllAnswers = () => {
  document.querySelectorAll("button:not(#answerConfirm)").forEach((element) => {
    element.remove();
  });
};

document
  .getElementById("answerConfirm")
  .addEventListener("click", function (e) {
    e.preventDefault();
    resetAllAnswers();
    nextQuestions();
    numberQuestion++;
    document.getElementById("numberQuestion").innerText = numberQuestion;
  });
