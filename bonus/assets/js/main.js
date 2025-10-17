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

/**
 * Returns a random number between a min number and a max number.
 * @param {number} min
 * @param {number} max
 * @returns {number}
 */
const getRandomNumber = (min, max) =>
	Math.floor(Math.random() * (max - min + 1)) + min;

/**
 * Generates n random numbers
 * @param {number} n
 * @returns {Array}
 */
const generateNumberList = (n, min, max) => {
	const list = [];
	for (let i = 0; i < n; i++) {
		const randomNumber = getRandomNumber(min, max);
		// Check that the generated number is not repeated
		if (!list.includes(randomNumber)) {
			list.push(randomNumber);
		} else {
			i--;
		}
	}
	return list;
};

/**
 * Show the random numbers to the user
 * @param {Array} list
 */
const showRandomNumbers = (list) => {
	for (let i = 0; i < list.length; i++) {
		const thisNumber = list[i];
		const span = document.createElement("span");
		span.append(`${thisNumber} `);
		console.log(span);
		numbersElement.append(span);
	}
};

/**
 * Creates a list of input elements, prints them and returns the list.
 * @param {number} sizeList Number of inputs to print
 * @returns {Array}
 */
const buildForm = (sizeList) => {
	const list = [];
	for (let i = 0; i < sizeList; i++) {
		const thisInput = document.createElement("input");
		list.push(thisInput);
	}
	return list;
};

/**
 * Builds and returns a button
 * @returns {HTMLButtonElement}
 */
const buildButton = () => {
	const buttonElement = document.createElement("button");
	buttonElement.textContent = "Conferma";
	return buttonElement;
};

/**
 * Receives a list and a button and appends them to inputElement.
 * @param {Array} list
 * @param {HTMLButtonElement} list
 */
const showForm = (list, sizeList, button) => {
	for (let i = 0; i < sizeList; i++) {
		const thisInput = list[i];
		inputElement.append(thisInput);
	}
	inputElement.append(button);
};

/**
 * Builds and shows the final score.
 * @param {Array} score
 */
const showScore = (score) => {
	const span = document.createElement("span");
	const letter = score.length === 1 ? "o" : "i";
	span.append(`Hai trovato ${score.length} numer${letter}!`);
	if (score.length !== 0) {
		span.append(` I numeri sono [ `);
		for (let i = 0; i < score.length; i++) {
			span.append(`${score[i]} `);
		}
		span.append(`]`);
	}
	scoreElement.append(span);
};

/**
 * Returns the intersection between the two given arrays.
 * @param {Array} listA
 * @param {Array} listB
 * @returns {Array}
 */
const compareLists = (listA, listB) => {
	const intersectionList = [];
	for (let i = 0; i < listA.length; i++) {
		const thisValue = listA[i];
		if (listB.includes(thisValue)) {
			intersectionList.push(thisValue);
		}
	}
	return intersectionList;
};

/**
 * Receives an array of numbers.
 * Returns false if every number is an integer and unique.
 * @param {Array} list
 * @returns {boolean}
 */
const validateValues = (list) => {
	const unique = [];

	for (let i = 0; i < list.length; i++) {
		const thisValue = list[i];
		// Check that every value is an integer
		if (!Number.isInteger(thisValue)) {
			return true;
		}
		// Check that every number is unique
		if (unique.includes(thisValue)) {
			return true;
		}
		unique.push(thisValue);
	}

	return false;
};

// Select the elements
const numbersElement = document.getElementById("numbers");
const inputElement = document.getElementById("input");
const scoreElement = document.getElementById("score");
const countdownElement = document.getElementById("countdown");

// Global values
const gameTimer = 3;
const howManyNumbers = 10;

// Generate 5 random numbers
const randomNumbersList = generateNumberList(howManyNumbers, 0, 100);

// Print the numbers on screen
showRandomNumbers(randomNumbersList);

// Build inputs
const inputElementList = buildForm(howManyNumbers);
const buttonElement = buildButton();

// Set countdown
let count = gameTimer;
countdownElement.textContent = `${count}`;
const countdown = setInterval(() => {
	count--;
	countdownElement.textContent = `${count}`;

	// When the timer runs out
	if (count <= 0) {
		// Remove the numbers
		numbersElement.style.display = "none";
		// Add the input boxes/form
		showForm(inputElementList, howManyNumbers, buttonElement);
		inputElement.style.display = "block";

		// Clear countdown
		countdownElement.textContent = "";
		clearInterval(countdown);
	}
}, 1000);

// On button click take the numbers from the inputs and save them
buttonElement.addEventListener("click", (event) => {
	event.preventDefault();

	// Retrieve values
	const valuesList = [];
	for (let i = 0; i < howManyNumbers; i++) {
		const thisValue = Number(inputElementList[i].value);
		valuesList.push(thisValue);
	}

	// Validate the values in the list
	const isBadInput = validateValues(valuesList);

	if (isBadInput) {
		scoreElement.textContent = "Hai inserito dei valori inaspettati, riprova.";
		scoreElement.style.display = "block";
	} else {
		// Remove content if present
		scoreElement.textContent = "";
		// Compare the numbers entered by the user with the generated ones
		const score = compareLists(valuesList, randomNumbersList);
		// Build and show the score in the score element
		showScore(score);

		// Hide form
		inputElement.style.display = "none";
		// Print on screen the score and which numbers were found
		scoreElement.style.display = "block";
	}
});
