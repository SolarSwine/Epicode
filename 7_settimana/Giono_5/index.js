const generateFruitCards = function (fruitsArray) {
  const row = document.getElementById('events-row')
  fruitsArray.forEach((fruit) => {
    const newCol = document.createElement('div')
    newCol.classList.add('col')
    newCol.innerHTML = `
      <div class="card h-100 d-flex flex-column">
        <img src="${fruit.imageUrl}" class="card-img-top" style="max-height:300px" alt="...">
        <div class="card-body d-flex flex-column justify-content-around">
          <h5 class="card-title">${fruit.name}</h5>
          <p class="card-text">${fruit.description}</p>
          <p class="card-text">${fruit.brand}</p>
          <p class="card-text">${fruit.price}€</p>
          <div class="d-flex justify-content-between">
            <button class="btn btn-warning open-backoffice-modal" data-fruit-id="${fruit._id}">
              MODIFICA
            </button>
            <a href="details.html?fruitId=${fruit._id}" class="btn btn-info">INFO</a>
          </div>
        </div>
      </div>
    `
    row.appendChild(newCol)
  })
}

// Funzione per aprire il modale del backoffice
const openBackofficeModal = function (fruitId) {
  
  // Mostra il modale
  const backofficeModal = new bootstrap.Modal(document.getElementById('backofficeModal'));
  backofficeModal.show();
  
  // Imposta l'URL dell'iframe
  const iframe = document.querySelector('#backofficeModal iframe');
  iframe.src = `backoffice.html?fruitId=${fruitId}&modal=true`;
  // Nascondi la navbar
  const navbar = document.querySelector('.navbar-main');
  navbar.style.display = 'none';
}

// Funzione per ottenere gli eventi (frutta)
const getFruits = function () {
  document.getElementById('loading-indicator').style.display = 'block';
  fetch('https://striveschool-api.herokuapp.com/api/product/', {
    method: 'GET', // specify the HTTP method
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkYzg5NTgxODQ0MjAwMTUzNzU4NzAiLCJpYXQiOjE3MTUzMjUwNzcsImV4cCI6MTcxNjUzNDY3N30.WNknMhRDue1stBHi0lmZjOT9PR2EfzdnqR9dP_dwrjM'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error('Errore nella risposta del server')
      }
    })
    .then((array) => {
      
      document.getElementById('loading-indicator').style.display = 'none';
      generateFruitCards(array);

      // Aggiungiamo un listener per il click sui bottoni "MODIFICA"
      const editButtons = document.querySelectorAll('.open-backoffice-modal');
      editButtons.forEach(button => {
        button.addEventListener('click', function() {
          const fruitId = button.getAttribute('data-fruit-id');
          openBackofficeModal(fruitId);
        });
      });
    })
    .catch((err) => {
      console.log('ERRORE!', err)
    })
}

// Eseguiamo la funzione per ottenere gli eventi al caricamento della pagina
getFruits();