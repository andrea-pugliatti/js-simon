/*
Simon Says

Descrizione:
Visualizzare in pagina 5 numeri casuali. Da lì parte un timer di 30 secondi.
Dopo 30 secondi i numeri scompaiono e appaiono invece 5 input in cui l'utente deve inserire i numeri che ha visto precedentemente, nell'ordine che preferisce.

Dopo che sono stati inseriti i 5 numeri, il software dice quanti e quali dei numeri da indovinare sono stati individuati.

NOTA: non è importante l'ordine con cui l'utente inserisce i numeri, basta che ne indovini il più possibile.

BONUS:
Inseriamo la validazione: se l'utente mette due numeri uguali o inserisce cose diverse da numeri lo blocchiamo in qualche modo.
Se l’utente ha inserito qualcosa di non valido, segnaliamolo visivamente nel form.

*/

// Select the elements
const numbersElement = document.getElementById("numbers");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");

/**
 * Returns a random number between a min number and a max number.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomNumber = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

// Generate 5 random numbers
const randomNumbersList = [];
for (let i = 0; i < 5; i++) {
	const randomNumber = getRandomNumber(0, 100);
	randomNumbersList.push(randomNumber);
}

// Show the numbers to the user by printing them on screen

// Add timer

// When the timer runs out
// Remove the numbers
// Add the input boxes/form

// Compare the numbers entered by the user with the generated ones

// Print on screen the score and which numbers were found
