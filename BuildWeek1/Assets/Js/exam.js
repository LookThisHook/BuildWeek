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
const radius = 90; // Raggio del cerchio
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
  const interval = 50; // Intervallo di aggiornamento (50 ms)
  const totalSteps = (fullTime * 1000) / interval; // Numero totale di aggiornamenti
  let step = 0;

  const timer = setInterval(() => {
    step++;
    remainingTime = Math.max(0, fullTime - (step * interval) / 1000); // Calcolo del tempo rimanente
    const progress = remainingTime / fullTime; // Progresso percentuale
    drawCircle(progress); // Aggiornamento del cerchio

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
