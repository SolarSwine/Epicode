class Fruit {
  constructor(_name, _description, _brand, _imageUrl, _price) {
    this.name = _name;
    this.description = _description;
    this.brand = _brand;
    this.imageUrl = _imageUrl;
    this.price = _price;
  }
}

const addressBarContent = new URLSearchParams(location.search);
const fruitId = addressBarContent.get('fruitId');
console.log('FRUITID?', fruitId);

let fruitToModify;

const getFruitData = function () {
  fetch(`https://striveschool-api.herokuapp.com/api/product/${fruitId}`, {
    method: 'GET',
    headers: {
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkYzg5NTgxODQ0MjAwMTUzNzU4NzAiLCJpYXQiOjE3MTUzMjUwNzcsImV4cCI6MTcxNjUzNDY3N30.WNknMhRDue1stBHi0lmZjOT9PR2EfzdnqR9dP_dwrjM'
    }
  })
  .then((response) => {
    if (response.ok) {
      return response.json();
    } else {
      throw new Error("Errore nel recupero dei dettagli del frutto");
    }
  })
    .then((fruit) => {
      console.log('DETTAGLI RECUPERATI', fruit);
      
      if (fruit && fruit.name && fruit.description && fruit.brand && fruit.imageUrl && fruit.price) {
        document.getElementById('name').value = fruit.name;
        document.getElementById('description').value = fruit.description;
        document.getElementById('brand').value = fruit.brand;
        document.getElementById('price').value = fruit.price;
        document.getElementById('imageUrl').value = fruit.imageUrl;

        fruitToModify = fruit;
      } else {
        throw new Error("Dati frutto mancanti o non validi");
      }
    })
    .catch((err) => {
      console.log('ERRORE', err);
    });
};

if (fruitId) {
  getFruitData();
  document.getElementsByClassName('btn-primary')[0].innerText = 'MODIFICA!';
}

const submitFruit = function (e) {
  e.preventDefault();

  const nameInput = document.getElementById('name');
  const descriptionInput = document.getElementById('description');
  const brandInput = document.getElementById('brand');
  const imageUrlInput = document.getElementById('imageUrl');
  const priceInput = document.getElementById('price');

  const fruitFromForm = new Fruit(
    nameInput.value,
    descriptionInput.value,
    brandInput.value,
    imageUrlInput.value,
    priceInput.value
  );

  console.log('FRUTTO DA INVIARE ALLE API', fruitFromForm);

  let URL = 'https://striveschool-api.herokuapp.com/api/product/';
  let methodToUse = 'POST';

  if (fruitId) {
    URL = `https://striveschool-api.herokuapp.com/api/product/${fruitToModify._id}`;
    methodToUse = 'PUT';
  } 

  fetch(URL, {
    method: methodToUse,
    body: JSON.stringify(fruitFromForm), 
    headers: {
      'Content-type': 'application/json', 
      'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2NjNkYzg5NTgxODQ0MjAwMTUzNzU4NzAiLCJpYXQiOjE3MTUzMjUwNzcsImV4cCI6MTcxNjUzNDY3N30.WNknMhRDue1stBHi0lmZjOT9PR2EfzdnqR9dP_dwrjM'
    },
  })
    .then((response) => {
      if (response.ok) {
        alert(`Frutto creato!`);
      } else {
        throw new Error('Errore nel salvataggio della risorsa');
      }
    })
    .catch((err) => {
      console.log('ERRORE', err);
      alert(err);
    });
};

document.getElementById('fruit-form').addEventListener('submit', submitFruit);


// funzione ELIMINA
const deleteEvent = function () {
  if (confirm("Sei sicuro di voler cancellare questo elemento?")) {
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
}}

document.getElementById('reset-button').addEventListener('click', function() {
  if (confirm("Sei sicuro di voler resettare il form?")) {
    document.getElementById('fruit-form').reset();
  }
});

const urlParams = new URLSearchParams(window.location.search);
        const isInModal = urlParams.get('modal');

        // Se la pagina è caricata all'interno del modale, nascondi la navbar
        if (isInModal) {
            document.getElementById('navbar').style.display = 'none';
        }
