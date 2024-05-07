        // Verifica se c'è un valore di contatore salvato in sessionStorage
        let counter = sessionStorage.getItem('counter');
        if (!counter) {
            // Se non c'è, inizializza il contatore a 0
            counter = 0;
        }

        // Verifica se la pagina è stata aggiornata utilizzando localStorage
        let pageRefreshed = localStorage.getItem('pageRefreshed');
        if (!pageRefreshed) {
            // Se la pagina non è stata aggiornata, inizia il contatore
            startCounter();
        }

        // Avvia il contatore ogni secondo
        function startCounter() {
            const intervalId = setInterval(() => {
                // Incrementa il contatore di 1 secondo
                counter++;
                // Aggiorna il valore del contatore nel sessionStorage
                sessionStorage.setItem('counter', counter);
                // Aggiorna il contatore sul documento HTML
                document.getElementById('counter').textContent = counter;
            }, 1000);

            // Memorizza che la pagina è stata aggiornata in localStorage
            localStorage.setItem('pageRefreshed', true);

            // Gestisci l'evento beforeunload per resettare il localStorage quando la pagina viene chiusa
            window.addEventListener('beforeunload', () => {
                // Rimuovi il flag di aggiornamento della pagina da localStorage
                localStorage.removeItem('pageRefreshed');
            });
        }