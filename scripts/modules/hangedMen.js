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
	'guessBtn': 'guess-btn',
	'lives': 'life-counter',
	'letter': 'letter-print',
	'shown': 'shown',
	'hintBtn': 'hint-btn'
};

class Phrase {
	constructor (phrase) {
		this.spacedPhrase = phrase;
		this.fullPhrase = phrase.replace(' ', '');
		this.spacedList = [...this.spacedPhrase];
		this.letterList = [...new Set(this.fullPhrase)];
	}
}

let phrase = '';
let rightGuessArray = [];
const livesAmount = 8;
let lives = 0;

export function start() {
	let newPhrase = hangingPhrases[Math.floor(Math.random() * hangingPhrases.length)];
	phrase = new Phrase(newPhrase);
	rightGuessArray = [];
	wrongGuessArray = [];
	lives = livesAmount;
	mainBody.innerHTML = `<p id=${idsAndClassesFor['lives']}>${lives}</p><section id=${idsAndClassesFor['display']}></section><section id=${idsAndClassesFor['keys']}></section>`;
	const letterKeys = document.getElementById(idsAndClassesFor['keys']);
	for (let letter of alphabet) {
		letterKeys.innerHTML += (`<button class=${idsAndClassesFor['letterKey']}>${letter}</button>`);
	}
	letterKeys.innerHTML += (`<input type="text" id=${idsAndClassesFor['guessInput']}>`);
	letterKeys.innerHTML += (`<button id=${idsAndClassesFor['guessBtn']}>Guess</button>`);
	letterKeys.innerHTML += (`<button id=${idsAndClassesFor['hintBtn']}>Hint</button>`);
	const textGuesser = document.getElementById(idsAndClassesFor['guessInput'])
	letterKeys.addEventListener("click", (event) => {
		if (event.target.id === idsAndClassesFor['hintBtn']) {
			hint();
		} else if (event.target.id === idsAndClassesFor['guessBtn']) {
			checkGuess(textGuesser.value);
		} else if (event.target.className === idsAndClassesFor['letterKey']) {
			checkLetter(event.target.textContent.toLowerCase());
			event.target.disabled = true;
		}
	});
	printPhrase();
}

function hint() {
	const allSet = new Set(phrase.letterList);
	const chosenSet = new Set(rightGuessArray);
	for (let letter of chosenSet) {
		allSet.delete(letter);
	}
	const hintList = [...allSet];
	const hintLetter = hintList[Math.floor(Math.random() * hintList.length)]
	lives--;
	checkLetter(hintLetter);
}

function printPhrase() {
	const display = document.getElementById(idsAndClassesFor['display']);
	for (let letter of phrase.spacedList){
		display.innerHTML += `<li class=${idsAndClassesFor['letter']}><p>${letter}</p></li>`
	}
}

function checkLetter(letter) {
	if (phrase.letterList.includes(letter)) {
		if (!(rightGuessArray.includes(letter))) {
			rightGuessArray.push(letter);
			const letters = document.getElementsByClassName(idsAndClassesFor['letter']);
			for (let letterCont of letters) {
				if (letterCont.children[0].textContent === letter) {
					letterCont.classList.add('shown')
				}
			}
		}
	} else {
		lives--;
		checkLives();
	}
	checkLives();
}

let setEqual = (sa, sb) => (sa.size === sb.size && [...sa].every(value => sb.has(value)));

function checkGuess(guess) {
	if (phrase.fullPhrase.includes(guess)) {
		for (let letter of ([...new Set(guess)])) {
			checkLetter(letter);
		}
	} else {
		lives -= 2;
		checkLives();
	}
}

function checkLives() {
	const livesCounter = document.getElementById(idsAndClassesFor['lives']);
	livesCounter.textContent = lives;
	let phraseLetters = new Set(phrase.letterList);
	let guessLetters = new Set(rightGuessArray);
	if (setEqual(phraseLetters, guessLetters)) {
		endGame('win');
	} else if (lives <= 0) {
		endGame('lose');
	}
}

function endGame(end) {
	mainBody.innerHTML = `<p>You ${end}</p><br /><p><span>${phrase.spacedPhrase}</span></p>`;
	mainBody.innerHTML += `<button id=${idsAndClassesFor['playGame']}>Play Again!</button>`;
}

