let hangingPhrases = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => hangingPhrases = obj['hangingPhrases']);

const mainBody = document.getElementById('body');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];

const idsAndClassesFor = {
    'playGame': 'play',
	'display': 'phrase-display',
	'keys': 'letter-keys',
	'letterKey': 'letter',
	'guessInput': 'guess-input',
	'guessBtn': 'guess-btn'
};

class Phrase {
	constructor (phrase) {
		this.fullPhrase = phrase.replace(' ', '');
		this.letterList = [...new Set(this.fullPhrase)];
	}
}

let phrase = '';
let rightGuessArray = [];
let wrongGuessArray = [];
const livesAmount = 5;
let lives = 5;

export function start() {
	mainBody.innerHTML = `<div id=${idsAndClassesFor['display']}></div><div id=${idsAndClassesFor['keys']}></div>`;
	const letterKeys = document.getElementById(idsAndClassesFor['keys']);
	let newPhrase = hangingPhrases[Math.floor(Math.random() * hangingPhrases.length)];
	phrase = new Phrase(newPhrase);
	rightGuessArray = [];
	wrongGuessArray = [];
	lives = livesAmount;
	for (let letter of alphabet) {
		letterKeys.innerHTML += (`<button class=${idsAndClassesFor['letterKey']}>${letter}</button>`);
	}
	letterKeys.innerHTML += (`<input type="text" id=${idsAndClassesFor['guessInput']}>`);
	letterKeys.innerHTML += (`<button id=${idsAndClassesFor['guessBtn']}>Guess Text</button>`);
	const textGuesser = document.getElementById(idsAndClassesFor['guessInput'])
	letterKeys.addEventListener("click", (event) => {
		if (event.target.id === idsAndClassesFor['guessBtn']) {
			checkGuess(textGuesser.value);
		} else if (event.target.className === idsAndClassesFor['letterKey']) {
			checkLetter(event.target.textContent.toLowerCase());
		}
	});
	printPhrase();
}

function printPhrase() {
	const display = document.getElementById(idsAndClassesFor['display']);
	display.innerHTML = `<p>${phrase.fullPhrase}</p><br /><p>${lives}</p>`;
}

function checkLetter(letter) {
	if (phrase.letterList.includes(letter)) {
		if ((rightGuessArray.includes(letter))) {
			console.log('already in');
		} else {
			rightGuessArray.push(letter);
		}
	} else {
		lives--;
	}
	printPhrase()
	let phraseLetters = new Set(phrase.letterList);
	let guessLetters = new Set(rightGuessArray);
	if (setEqual(phraseLetters, guessLetters)) {
		endGame('win');
	} else if (lives <= 0) {
		endGame('lose');
	}
}

let setEqual = (sa, sb) => (sa.size === sb.size && [...sa].every(value => sb.has(value)));

function checkGuess(guess) {
	console.log(guess);
}

function endGame(end) {
	const display = document.getElementById(idsAndClassesFor['display']);
	const letterKeys = document.getElementById(idsAndClassesFor['keys']);
	display.innerHTML = `<p>You ${end}</p>`;
	letterKeys.innerHTML = `<button id=${idsAndClassesFor['playGame']}>Play Again!</button>`;
}

