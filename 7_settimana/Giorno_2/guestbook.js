let contacts = [];

const textAreaTag = document.getElementById('content');
const formTag = document.getElementsByTagName('form')[0];

const save = function () {
    const textAreaContent = textAreaTag.value;
    contacts.push(textAreaContent);
    localStorage.setItem('contacts', JSON.stringify(contacts));
    updateContacts();
};

const updateContacts = function () {
    const contactsRow = document.getElementById('contacts-row');
    contactsRow.innerHTML = '';
    contacts.forEach((contact) => {
        const newDiv = document.createElement('div');
        newDiv.classList.add('col');
        newDiv.innerHTML = `
            <div class="card">
                <div class="card-body">
                    <h5 class="card-title">${contact}</h5>
                    <button class="btn btn-danger" onclick="deleteCard(event)">ELIMINA</button>
                </div>
            </div>
        `;
        contactsRow.appendChild(newDiv);
    });
};

const deleteMemory = function () {
    const contactsRow = document.getElementById('contacts-row');
    contactsRow.innerHTML = '';
    localStorage.removeItem('contacts');
    contacts = [];
};

// Verifica se ci sono dati in localStorage all'avvio dello script
const contactsFromLocalStorage = JSON.parse(localStorage.getItem('contacts'));
if (contactsFromLocalStorage) {
    contacts = contactsFromLocalStorage;
}

// Aggiorna i contatti alla prima esecuzione dello script
updateContacts();