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

// Global values
const gameTimer = 3000;
const howManyNumbers = 5;

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
for (let i = 0; i < howManyNumbers; i++) {
	const randomNumber = getRandomNumber(0, 100);
	randomNumbersList.push(randomNumber);
}

// Print the numbers on screen
for (let i = 0; i < howManyNumbers; i++) {
	const thisNumber = randomNumbersList[i];
	const span = document.createElement("span");
	span.append(`${thisNumber} `);
	console.log(span);
	numbersElement.append(span);
}

/**
 * Creates a list of input elements, prints them and returns the list.
 * @returns {Array}
 */
const buildForm = () => {
	const list = [];
	for (let i = 0; i < howManyNumbers; i++) {
		const thisInput = document.createElement("input");
		list.push(thisInput);
	}
	return list;
};

const buildButton = () => {
	const buttonElement = document.createElement("button");
	buttonElement.textContent = "Conferma";
	return buttonElement;
};

/**
 * Receives a list and a button and appends them to inputElement
 * @param {Array} list
 * @param {HTMLButtonElement} list
 */
const showForm = (list, button) => {
	for (let i = 0; i < howManyNumbers; i++) {
		const thisInput = list[i];
		inputElement.append(thisInput);
	}
	inputElement.append(button);
};

// Build inputs
const inputElementList = buildForm();
const buttonElement = buildButton();

// Add timer
setTimeout(() => {
	// When the timer runs out
	// Remove the numbers
	numbersElement.style.display = "none";
	// Add the input boxes/form
	showForm(inputElementList, buttonElement);
	inputElement.style.display = "block";
}, gameTimer);

// On button click take the numbers from the inputs and save them
buttonElement.addEventListener("click", (event) => {
	event.preventDefault();

	const valuesList = [];
	for (let i = 0; i < howManyNumbers; i++) {
		const thisValue = Number(inputElementList[i].value);
		valuesList.push(thisValue);
	}
	// Compare the numbers entered by the user with the generated ones
	// const score = compareLists();
	// Hide form
	inputElement.style.display = "none";
	// Print on screen the score and which numbers were found
	// buildScore();
	// showScore();
	scoreElement.style.display = "block";
});
