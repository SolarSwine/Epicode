document.addEventListener('DOMContentLoaded', function() {
    const loadImagesButton = document.querySelector('.btn-primary');
    const loadSecondaryImagesButton = document.querySelector('.btn-secondary');
  
    const loadImages = function(query) {
        const resetImages = function() {
            const cards = document.querySelectorAll('.card');
            cards.forEach(card => {
              card.querySelector('img').src = ''; // Resetta il campo img delle card
              card.querySelector('.card-text').innerHTML = ''; // Resetta il campo .card-text delle card
            });
          };
        
          // Svuota le immagini esistenti prima di caricare le nuove
          resetImages();

      fetch(`https://api.pexels.com/v1/search?query=${query}`, {
        headers: {
          Authorization: 'aYqM7clbyPnsHY3iG9uWKxXVxfkLeCN3ldhT9oMleVtUZ62FlGjmBalj' 
        }
      })
      .then(response => {
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        return response.json();
      })
      .then(data => {
            // Aggiorna le immagini delle card esistenti con le nuove immagini
            const cardsContainer = document.querySelector('.album .container .row');
            cardsContainer.innerHTML = ''; // Svuota il contenitore delle card
            data.photos.forEach(photo => {
                const card = document.createElement('div');
                card.classList.add('col-md-4');

                const cardHtml = `
                <div class="card mb-4 shadow-sm">
                <a href="dettaglio.html?imageUrl=${photo.src.medium}&artistName=${photo.photographer}&artistPageLink=${photo.photographer_url}">
                    <div class="card-body">
                        <img src="${photo.src.medium}" class="bd-placeholder-img card-img-top" />
                        <h5 class="card-title">${photo.photographer}</h5>
                    </div>
                </a>
                <div class="d-flex justify-content-between align-items-center">
                    <div class="btn-group">
                        <button type="button" class="btn btn-sm btn-outline-secondary onclick="openModal()">View</button>
                        <button type="button" class="btn btn-sm btn-outline-secondary hide-btn" onclick="deleteCard()">Hide</button>
                    </div>
                    <small class="text-muted">ID: ${photo.id}</small>
                </div>
            </div>
                `;
                card.innerHTML = cardHtml;
                cardsContainer.appendChild(card);
            });
        })
      .catch(error => {
        console.error('There was an error fetching the images:', error);
      });
    };

    searchButton.addEventListener('click', function() {
      const searchInput = document.getElementById('searchInput').value;
      loadImages(`${searchInput}`); // Utilizza il valore inserito dall'utente per la ricerca di nuove immagini
    });

    loadImagesButton.addEventListener('click', function() {
        loadImages('Gea Planet'); // Query per il primo bottone
      });
    
      loadSecondaryImagesButton.addEventListener('click', function() {
        loadImages('Volcano'); // Query per il secondo bottone
      });


      function deleteCard(event) {
        const card = event.target.closest('.col-md-4');
        card.style.display = 'none';
    }

    
    function openModal(event) {
        const imageUrl = event.target.closest('.card').querySelector('img').src;
        const modal = document.getElementById('myModal');
        const modalImg = document.getElementById('img01');
        modal.style.display = 'block';
        modalImg.src = imageUrl;
    }

     // Aggiungi event listeners ai bottoni "View" e "Hide"
     const viewButtons = document.querySelectorAll('.btn-view');
     const hideButtons = document.querySelectorAll('.hide-btn');
 
     viewButtons.forEach(button => {
         button.addEventListener('click', openModal);
     });
 
     hideButtons.forEach(button => {
         button.addEventListener('click', deleteCard);
     });
 
     // Chiudi il modale quando si clicca sul simbolo X
     const closeBtn = document.querySelector('.close');
     closeBtn.addEventListener('click', function() {
         const modal = document.getElementById('myModal');
         modal.style.display = 'none';
     });
 
     // Chiudi il modale quando si clicca al di fuori dell'immagine
     window.addEventListener('click', function(event) {
         const modal = document.getElementById('myModal');
         if (event.target === modal) {
             modal.style.display = 'none';
         }
     });
  });

  document.addEventListener('DOMContentLoaded', function() {
    // Ottieni i parametri dall'URL della query
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('imageUrl');
    const artistName = urlParams.get('artistName');
    const artistPageLink = urlParams.get('artistPageLink');

    // Aggiorna l'immagine e il nome dell'artista sulla pagina
    const detailImage = document.getElementById('detail-image');
    detailImage.src = imageUrl;

    const artistNameElement = document.getElementById('artist-name');
    artistNameElement.textContent = artistName;

    const artistLink = document.getElementById('artist-link');
    artistLink.href = artistPageLink;
});

document.addEventListener('DOMContentLoaded', function() {
    // Ottieni i parametri dall'URL della query
    const urlParams = new URLSearchParams(window.location.search);
    const imageUrl = urlParams.get('imageUrl');

    // Aggiorna l'immagine sulla pagina
    const detailImage = document.getElementById('detail-image');
    detailImage.src = imageUrl;

    // Carica l'immagine e calcola il colore medio
    const loadImageAndGetAverageColor = function(imageUrl) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.crossOrigin = "Anonymous"; // Per evitare problemi di sicurezza CORS
            img.onload = function() {
                const canvas = document.createElement('canvas');
                const ctx = canvas.getContext('2d');
                canvas.width = this.width;
                canvas.height = this.height;
                ctx.drawImage(this, 0, 0);
                const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
                const data = imageData.data;
                let r = 0, g = 0, b = 0;

                for (let i = 0; i < data.length; i += 4) {
                    r += data[i];
                    g += data[i + 1];
                    b += data[i + 2];
                }

                r = Math.floor(r / (data.length / 4));
                g = Math.floor(g / (data.length / 4));
                b = Math.floor(b / (data.length / 4));

                const averageColor = `rgb(${r},${g},${b})`;
                resolve(averageColor);
            };
            img.onerror = reject;
            img.src = imageUrl;
        });
    };

    // Imposta il colore medio come sfondo della pagina
    loadImageAndGetAverageColor(imageUrl)
        .then(color => {
            document.body.style.backgroundColor = color;
        })
        .catch(error => {
            console.error('Errore nel caricamento dell\'immagine o nel calcolo del colore medio:', error);
        });
});

