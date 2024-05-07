const nameInput = document.getElementById("name");
const ownerInput = document.getElementById("proprietario");
const speciesInput = document.getElementById("specie");
const breedInput = document.getElementById("razza");
const formTag = document.getElementsByTagName('form')[0]

const pets = [];

class Pet {
  constructor(_name, _owner, _species, _breed) {
    this.name = _name;
    this.owner = _owner;
    this.species = _species;
    this.breed = _breed;
  }
}

const updatePets = function () {
  // prendo un riferimento alla riga dove sono contenute le colonne
  const petsRow = document.getElementById("pets-row");
  // prima della creazione delle cards dovrà svuotare i contenuti esistenti
  petsRow.innerHTML = "";
  // adesso, per ogni elemento di contacts, creo una colonna con dentro il contatto
  pets.forEach((pet) => {
    // cosa faccio con ogni contatto?
    // creo un div vuoto
    const newDiv = document.createElement("div"); // <div></div>
    // rendiamo questo div una col di bootstrap
    newDiv.classList.add("col");
    // riempio newDiv con una card
    newDiv.innerHTML = `
          <div class="card">
              <div class="card-body">
                  <h5 class="card-title">${pet.name}</h5>
                  <h5 class="card-title">${pet.owner}</h5>
                  <h5 class="card-title">${pet.species}</h5>
                  <h5 class="card-title">${pet.breed}</h5>
              </div>
          </div>
      `;
    // appendo ora la col alla row
    petsRow.appendChild(newDiv);
  });
};

// ora occupiamoci dell'evento di submit del form
formTag.addEventListener("submit", function (e) {
  e.preventDefault(); // NON aggiornare la pagina e perdere i dati
  // ora posso scrivere le mie istruzioni
  // voglio creare un oggetto a partire da una classe
  // con i dati provenienti dal form
  const petFromFormValues = new Pet(
    nameInput.value,
    ownerInput.value,
    speciesInput.value,
    breedInput.value
  );

  // aggiungere contactFromFormValues ai contatti correnti
  pets.push(petFromFormValues);

  console.log("PET CREATO", petFromFormValues);
  // azzeriamo il form
  nameInput.value = "";
  ownerInput.value = "";
  speciesInput.value = "";
  breedInput.value = "";

  // aggiorniamo la riga con le colonne con un nuovo elemento per il mio nuovo contatto
  updatePets();
});
