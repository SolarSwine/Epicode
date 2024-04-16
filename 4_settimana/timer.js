const canvas = document.getElementById('countdownCanvas');
const ctx = canvas.getContext('2d');
const centerX = canvas.width / 2;
const centerY = canvas.height / 2;
const radius = 70;
const lineWidth = 20;
let timerInterval;
let elapsedTime = 0;
let remainingTime = 60;

// Funzione per disegnare il cerchio vuoto
function drawEmptyCircle() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, 1.5 * Math.PI);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#00ffff';
    ctx.stroke();
}

// Funzione per aggiornare l'animazione del cerchio vuoto
function updateCircle() {
    drawEmptyCircle();
    const progress = elapsedTime / 60000; // 60 secondi
    const endAngle = -0.5 * Math.PI + (2 * Math.PI * progress);
    ctx.beginPath();
    ctx.arc(centerX, centerY, radius, -0.5 * Math.PI, endAngle);
    ctx.lineWidth = lineWidth;
    ctx.strokeStyle = '#ccc';
    ctx.stroke();
}

// Funzione per aggiornare il timer
function updateTimer() {
    document.getElementById('timer').innerText = remainingTime;
    remainingTime--;
}

// Funzione per avviare il timer e l'animazione
function startTimer() {
    updateTimer();
    timerInterval = setInterval(function() {
        elapsedTime += 1000;
        if (elapsedTime >= 60000) {
            clearInterval(timerInterval);
        }
        updateCircle();
        updateTimer();
    }, 1000);
}

startTimer();