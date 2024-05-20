const addressBarContent = new URLSearchParams(location.search) // isola i parametri nel contenuto della barra degli indirizzi
console.log(addressBarContent)
const fruitId = addressBarContent.get('fruitId')

const getFruitData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${fruitId}`, {
    method: 'GET', 
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkYzg5NTgxODQ0MjAwMTUzNzU4NzAiLCJpYXQiOjE3MTUzMjUwNzcsImV4cCI6MTcxNjUzNDY3N30.WNknMhRDue1stBHi0lmZjOT9PR2EfzdnqR9dP_dwrjM'
    }
  })
    .then((response) => {
      if (response.ok) {
        return response.json()
      } else {
        throw new Error("Errore nel recupero dei dettagli dell'evento")
      }
    })
    .then((fruit) => {
      console.log('DETTAGLI RECUPERATI', fruit)
      // ora manipolo il DOM e riempio la card
    
      document.getElementById('name').innerText = fruit.name;
      document.getElementById('description').innerText = fruit.description;
      document.getElementById('time').innerText = fruit.brand;
      document.getElementById('price').innerText = fruit.price + '€';
      document.getElementById('fruit-image').src = fruit.imageUrl;
    })
    .catch((err) => {
      console.log('ERRORE', err)
    })
}

getFruitData()
/* 
// funzione ELIMINA
const deleteEvent = function () {
  // per ELIMINARE una risorsa da un DB è necessario fare una fetch utilizzando il metodo "DELETE"
  // la chiamata DELETE funziona SOLO con un indirizzo comprendente alla fine l'_id della risorsa
  fetch(`https://striveschool-api.herokuapp.com/api/product/${fruitId}`, {
    method: 'DELETE',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkYzg5NTgxODQ0MjAwMTUzNzU4NzAiLCJpYXQiOjE3MTUzMjUwNzcsImV4cCI6MTcxNjUzNDY3N30.WNknMhRDue1stBHi0lmZjOT9PR2EfzdnqR9dP_dwrjM'
    }
  })
    .then((response) => {
      if (response.ok) {
        // abbiamo eliminato con successo la risorsa!
        alert('RISORSA ELIMINATA')
        location.assign('index.html') // torniamo in home
      } else {
        // l'eliminazione della risorsa NON è andata a buon fine :(
        alert('ERRORE - RISORSA NON ELIMINATA')
      }
    })
    .catch((err) => {
      console.log('ERR', err)
    })
} */

// LOGICA DI MODIFICA
// troviamo il bottone modifica nella pagina dettaglio
const editButton = document.getElementById('edit-button')
editButton.addEventListener('click', function () {
  location.assign(`backoffice.html?fruitId=${fruitId}`)
})
