    // Impostazioni iniziali
    var canvas = document.getElementById('canvas');
    var ctx = canvas.getContext('2d');
    var centerX = canvas.width / 2;
    var centerY = canvas.height / 2;
    var radius = 120;
    var lineWidth = 40; // Spessore dello stroke
    var cyanPercent = 60; // Modifica questa percentuale per regolare il colore ciano
    var purplePercent = 40; // Modifica questa percentuale per regolare il colore viola
    var cyanAngle = 2 * Math.PI * (cyanPercent / 100);
    var purpleAngle = 2 * Math.PI * (purplePercent / 100);

    // Disegna l'anello 
   
    function drawRing(color, startAngle, endAngle) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, radius, startAngle, endAngle);
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = color;
        ctx.shadowColor = '#000'; // Colore dell'ombra
        ctx.shadowBlur = 5; // Intensità dell'ombra
        ctx.shadowOffsetX = 3; // Spostamento orizzontale dell'ombra
        ctx.shadowOffsetY = 3; // Spostamento verticale dell'ombra
        ctx.stroke();    
    }

    // Calcola gli angoli per i colori ciano e viola
    var startPurpleAngle = -Math.PI / 2;
    var endPurpleAngle = startPurpleAngle + (purpleAngle * (2 * Math.PI / (cyanAngle + purpleAngle)));
    var startCyanAngle = endPurpleAngle;
    var endCyanAngle = startCyanAngle + (cyanAngle * (2 * Math.PI / (cyanAngle + purpleAngle)));

    // Disegna l'anello ciano
    drawRing('cyan', startCyanAngle, endCyanAngle);
    // Disegna l'anello viola
    drawRing('purple', startPurpleAngle, endPurpleAngle);

    // Aggiungi testo al centro del cerchio<br><font color="#01F1F3">You passed the exam</font><br>We'll send you the certificate <br> in few minutes. Check your email (Including <br> promotions / spam folder)
    var text = '';
    if (cyanPercent > purplePercent) {
        text = `Congratulations!`;
    } else {
        text = 'Failed!';
    }
    ctx.fillStyle = '#ffffff'; // Colore del testo bianco
    ctx.font = '14px Arial'; // Imposta il font e la dimensione del testo
    ctx.textAlign = 'center'; // Allinea il testo al centro
    ctx.fillText(text, centerX, centerY); // Disegna il testo al centro del cerchio

 