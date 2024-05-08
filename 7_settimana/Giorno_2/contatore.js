let counter = 0;

        // Funzione per aggiornare il contatore ogni secondo
        function updateCounter() {
            counter++;
            document.getElementById('counter').textContent = counter;
            sessionStorage.setItem('counter', counter);
        }

        // Controlla se ci sono dati salvati nella sessione
        const storedCounter = sessionStorage.getItem('counter');
        if (storedCounter !== null) {
            // Se ci sono, imposta il contatore al valore salvato
            counter = parseInt(storedCounter);
            document.getElementById('counter').textContent = counter;
        }

        // Avvia il contatore solo se non è già stato avviato
        let intervalId;
        if (!sessionStorage.getItem('intervalId')) {
            intervalId = setInterval(updateCounter, 1000);
            sessionStorage.setItem('intervalId', intervalId);
        }

        // Azzeramento del contatore e pulizia della sessione quando la pagina viene chiusa
        window.addEventListener('unload', function() {
            clearInterval(intervalId);
            sessionStorage.removeItem('counter');
            sessionStorage.removeItem('intervalId');
        });