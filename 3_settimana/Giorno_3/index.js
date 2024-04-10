const handleSubmit = function (e) {
    e.preventDefault();
    generaNuovaTask();
}

function generaNuovaTask(){
    const testoInserito = document.getElementById('inputField').value;
    const nuovoCompito = document.createElement('li');
    const cestino = document.createElement('i');
    cestino.classList.add('far', 'fa-trash-alt');
    nuovoCompito.textContent = `${testoInserito}`;

    cestino.addEventListener('click', function() {
        nuovoCompito.remove();
        cestino.remove();
    });

    nuovoCompito.addEventListener('click', function() {
        nuovoCompito.classList.toggle('completed');
    });

    document.getElementById('tasks').appendChild(nuovoCompito);
    document.getElementById('tasks').appendChild(cestino);
    document.getElementById('inputField').value = '';
}

window.onload = function () {
    let form = document.querySelector('form')
    form.addEventListener('submit', handleSubmit)
}