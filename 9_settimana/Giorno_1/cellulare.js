"use strict";
// Definizione della classe User
class User {
    constructor(nome, cognome, credito = 0, minutiChiamata = 0) {
        this.costoPerMinuto = 0.20;
        this.nome = nome;
        this.cognome = cognome;
        this.credito = credito;
        this.minutiChiamata = minutiChiamata;
    }
    // Metodo per aggiungere credito
    ricarica(amount) {
        this.credito += amount;
    }
    // Metodo per effettuare una chiamata
    chiamata(minuti) {
        const costoChiamata = minuti * this.costoPerMinuto;
        if (this.credito >= costoChiamata) {
            this.credito -= costoChiamata;
            this.minutiChiamata += minuti;
        }
        else {
            console.log(`Credito insufficiente per effettuare una chiamata di ${minuti} minuti.`);
        }
    }
    // Metodo per ottenere il credito residuo
    chiama404() {
        return this.credito;
    }
    // Metodo per ottenere il numero di minuti di chiamata effettuati
    getminutiChiamata() {
        return this.minutiChiamata;
    }
    // Metodo per azzerare il numero di chiamate
    azzeraChiamate() {
        this.minutiChiamata = 0;
    }
}
// Creazione degli utenti
const user1 = new User('Mario', 'Rossi', 10);
const user2 = new User('Luigi', 'Verdi', 5);
// Esempi di utilizzo
user1.ricarica(5);
console.log(`${user1.nome} ${user1.cognome} - Credito residuo: ${user1.chiama404()}€`);
user1.chiamata(10);
console.log(`${user1.nome} ${user1.cognome} - Credito residuo: ${user1.chiama404()}€ - Minuti di chiamata: ${user1.getminutiChiamata()}`);
user2.chiamata(30); // Tentativo di chiamata che supera il credito disponibile
console.log(`${user2.nome} ${user2.cognome} - Credito residuo: ${user2.chiama404()}€ - Minuti di chiamata: ${user2.getminutiChiamata()}`);
// Azzeramento delle chiamate
user1.azzeraChiamate();
console.log(`${user1.nome} ${user1.cognome} - Minuti di chiamata dopo azzeramento: ${user1.getminutiChiamata()}`);
