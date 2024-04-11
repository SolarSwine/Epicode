const generateMainBoard = function () {
    const tabellaDiv = document.createElement('div');
    tabellaDiv.id = 'Tabella';
    document.getElementById('contenitore').appendChild(tabellaDiv);
    return tabellaDiv; 
}

const fillArray = function (tabellaDiv, numeri) {
    for (let i = 1; i <= numeri; i++) {
        const nuovoDiv = document.createElement('div');
        nuovoDiv.textContent = i;
        tabellaDiv.appendChild(nuovoDiv);
    }
    
}

let numeriEstratti = [];

const getRandomNum = function () {
    let numeroCasuale;
    do {
        numeroCasuale = Math.floor(Math.random() * 76) + 1;
    } while (numeriEstratti.includes(numeroCasuale)); 
    numeriEstratti.push(numeroCasuale); 
    return numeroCasuale;
}

const generateRandNumber = function () {
    const bottone = document.createElement('button');
    bottone.textContent = 'Fai uscire un numero';
    bottone.id = 'eseguiButton';
    document.getElementById('contenitore').appendChild(bottone);
    const bottoneEsegui = document.getElementById('eseguiButton');
    bottoneEsegui.addEventListener('click', function() {
        const numeroCasuale = getRandomNum();
        const cellaCorrispondente = document.querySelector(`#Tabella div:nth-child(${numeroCasuale})`);
        cellaCorrispondente.style.backgroundColor = 'red';
        cellaCorrispondente.style.color = 'white';
    });
}

const generateUserBoards = function () {
    const form = document.createElement('form');
    const inputField = document.createElement('input');
    inputField.type = 'number';
    inputField.placeholder = 'Numero di cartelle';
    inputField.required = true;
    
    const submitButton = document.createElement('button');
    submitButton.textContent = 'Crea cartelline';
    
    form.appendChild(inputField);
    form.appendChild(submitButton);
    document.getElementById('contenitore').appendChild(form);
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const numCartelline = inputField.value;
        
        for (let i = 0; i < numCartelline; i++) {
            const cartellina = generateMainBoard();
            fillArray(cartellina, 24);
        }
    });
}

const tabellaDiv = generateMainBoard();
fillArray(tabellaDiv, 76);
generateRandNumber();
generateUserBoards();