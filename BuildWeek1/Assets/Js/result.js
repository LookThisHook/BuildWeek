document.getElementById('rate').addEventListener('click', function () {
    location.href = 'feedback.html';
  });
  
// Recupera le risposte salvate
const risposteCorrette = JSON.parse(localStorage.getItem("risposteCorrette")) || [];
const risposteSbagliate = JSON.parse(localStorage.getItem("risposteSbagliate")) || [];

// Calcola i totali
const totalCorrect = risposteCorrette.length;
const totalWrong = risposteSbagliate.length;

// Evita di contare le domande duplicate
const totalQuestions = new Set([...risposteCorrette, ...risposteSbagliate]).size;

// Calcola le percentuali
if (totalQuestions === 0) {
  document.getElementById("percentageCorrect").innerText = "0%";
  document.getElementById("questionsCorrect").innerText = "No questions answered";

  document.getElementById("percentageWrong").innerText = "0%";
  document.getElementById("questionsWrong").innerText = "No questions answered";
} else {
  const percentageCorrect = ((totalCorrect / totalQuestions) * 100).toFixed(1);
  const percentageWrong = ((totalWrong / totalQuestions) * 100).toFixed(1);

  document.getElementById("percentageCorrect").innerText = `${percentageCorrect}%`;
  document.getElementById("questionsCorrect").innerText = `${totalCorrect}/${totalQuestions} questions`;

  document.getElementById("percentageWrong").innerText = `${percentageWrong}%`;
  document.getElementById("questionsWrong").innerText = `${totalWrong}/${totalQuestions} questions`;
}

  
  // Configura il grafico
  const ctx = document.getElementById("resultChart").getContext("2d");
  
  new Chart(ctx, {
    type: "doughnut",
    data: {
      labels: ["Correct", "Wrong"],
      datasets: [{
        data: [totalCorrect, totalWrong],
        backgroundColor: ["#4CAF50", "#F44336"], // Colori per corrette e sbagliate
        borderColor: ["#FFFFFF", "#FFFFFF"], // Bordo bianco
        borderWidth: 2
      }]
    },
    options: {
      responsive: true,
      plugins: {
        legend: {
          position: "top"
        }
      }
    }
  });
  