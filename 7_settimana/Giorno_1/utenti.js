class User {
  constructor(_firstName, _lastName, _age, _location) {
    this.firstName = _firstName;
    this.lastName = _lastName;
    this.age = _age;
    this.location = _location;
  }
  compareAge(otherUser) {
    if (this.age > otherUser.age) {
        return `${this.firstName} è più vecchio di ${otherUser.firstName}`;
    } else if (this.age < otherUser.age) {
        return `${this.firstName} è più giovane di ${otherUser.firstName}`;
    } else {
        return `${this.firstName} ha la stessa età di ${otherUser.firstName}`;
    }
}
}

const utente1 = new User ("Gigi", "Primis", "34", "Sardegna")
console.log("Utente 1", utente1)
const utente2 = new User ("Lillo", "Secundis", "53", "Antartide")
console.log("Utente 2", utente2)
const utente3 = new User ("Ellie", "Tris", "53", "ISS")

console.log(utente1.compareAge(utente2));
console.log(utente2.compareAge(utente3));


