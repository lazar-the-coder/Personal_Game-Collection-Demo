let hangingPhrases = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => hangingPhrases = obj['hangingPhrases']);

const mainBody = document.getElementById('body');
const alphabet = [...'abcdefghijklmnopqrstuvwxyz']
let phrase = '';

export function start() {
	mainBody.innerHTML = '<div id="phrase-display"></div><div id="keys"></div>';
	const display = document.getElementById('phrase-display');
	const letterKeys = document.getElementById('keys');
	phrase = hangingPhrases[Math.floor(Math.random() * hangingPhrases.length)];
	for (let letter of alphabet) {
		letterKeys.innerHTML += (`<button class="letter">${letter}</button>`);
	}
	letterKeys.innerHTML += (`<input type="text" id="guess-input">`);
	letterKeys.innerHTML += (`<button id="guess-btn">Guess Text</button>`);
	const textGuesser = document.getElementById('guess-input')
	letterKeys.addEventListener("click", (event) => {
		if (event.target.id === 'guess-btn') {
			checkGuess(textGuesser.value);
		} else if (event.target.className === 'letter') {
			checkLetter(event.target.textContent);
		}
	});
}

function checkLetter(letter) {
	
}

function checkGuess(guess) {
	
}