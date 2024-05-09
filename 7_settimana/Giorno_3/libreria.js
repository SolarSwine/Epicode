// creo la funzione per generare la lista
const generateCard = function (books) {
    const shelf = document.getElementById('shelf')
    shelf.innerHTML = '';
    books.forEach((book) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
        <div class="card">
        <img src="${book.img}" class="card-img-top" alt="...">
        <div class="card-body">
          <h5 class="card-title">${book.title}</h5>
          <p class="card-text">${book.price}</p>
          <a href="#" class="btn btn-primary" id="scarta">Scarta</a>
          <a href="#" class="btn btn-primary" id="compra-ora">Compra Ora</a>
        </div>
      </div>
        `;
        shelf.appendChild(newDiv);
    })
}

document.addEventListener('click', function(event) {
    if (event.target.id === 'scarta') {
      // Trova l'elemento genitore della card e rimuovilo
      event.target.closest('.card').remove();
    }
  });
  
  

  const getBooks = function () {
    fetch('https://striveschool-api.herokuapp.com/books', {
    })
      .then((response) => {
        if (response.ok) {
          console.log('LIETO FINE!', response)
          
          return response.json(); // "jsonifizza" la response, tornandone il body dentro una Promise
               } else {
          if (response.status === 404) {
            throw new Error('La risorsa richiesta non è stata trovata')
          } else if (response.status === 500) {
            throw new Error('La risposta del server è stata negativa') // creo un errore e sollevo un'eccezione
          }
        }
      })
      .then((arrayOfBooks) => {
        console.log(
          'Ho estratto il body dalla Response! Ecco il risultato:',
          arrayOfBooks
        )
        
        generateCard(arrayOfBooks) 
      })
      .catch((err) => {
       
        console.log('ERRORE', err)
      })
  }

  getBooks()

  
document.addEventListener('click', function(event) {
    if (event.target.id === 'compra-ora') {
      const card = event.target.closest('.card');
      const title = card.querySelector('.card-title').textContent;
      const price = card.querySelector('.card-text').textContent;
      addToCart({ title, price });
      updateCart();
    }
  });
  
  
  // Funzione per aggiungere un libro al carrello
  const addToCart = function(item) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.push(item);
      localStorage.setItem('cart', JSON.stringify(cart));
  };
  
  // Funzione per rimuovere un libro dal carrello
  const removeFromCart = function(item) {
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      const updatedCart = cart.filter((cartItem) => cartItem.title !== item.title);
      localStorage.setItem('cart', JSON.stringify(updatedCart));
  };
  
  // Funzione per aggiornare il carrello nella pagina
  const updateCart = function() {
      const cartContainer = document.getElementById('cart');
      cartContainer.innerHTML = '';
      const cart = JSON.parse(localStorage.getItem('cart')) || [];
      cart.forEach(item => {
          const cartItem = document.createElement('li');
          cartItem.textContent = `${item.title} - ${item.price}`;
          const removeButton = document.createElement('button');
          removeButton.classList.add('btn', 'btn-danger', 'btn-sm', 'ms-2');
          removeButton.innerText = 'Rimuovi dal carrello';
          removeButton.addEventListener('click', function() {
              removeFromCart(item);
              cartItem.remove();
              updateCart();
          });
          cartItem.appendChild(removeButton);
          cartContainer.appendChild(cartItem);
      });
  };
  
  // Inizializza il carrello dal localStorage al caricamento della pagina
  window.addEventListener('DOMContentLoaded', updateCart);