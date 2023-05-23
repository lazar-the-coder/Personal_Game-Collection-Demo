let gladWords = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => gladWords = obj['gladWords']);

const idsAndClassesFor = {
	'playGame': 'play',
	'display': 'story-display',
	'inputBox': 'sentence-adder',
	'wordType': 'word-type-choice',
	'lineEnter': 'sentence-input',
	'lineSend': 'sentence-btn'
};

const mainBody = document.getElementById('body');

let inputBox;
let display;
let sentences = 0;

let chosenWord = '';
let allWords;

export function start() {
	sentences = 0;
	allWords = JSON.parse(JSON.stringify(gladWords));
	mainBody.innerHTML = `<section id=${idsAndClassesFor['display']}></section><section id=${idsAndClassesFor['inputBox']}></section>`;
	inputBox = document.getElementById(idsAndClassesFor['inputBox']);
	display = document.getElementById(idsAndClassesFor['display']);
	inputBox.addEventListener("click", (event) => {
		if (event.target.className === idsAndClassesFor['wordType']) {
			getWord(event.target.id);
		} else if (event.target.id === idsAndClassesFor['lineSend']) {
			getSentence(document.getElementById(idsAndClassesFor['lineEnter']).value)
		}
	});
	askForWord();
}

function askForWord() {
	if (sentences >= 8) {
		end();
	} else {
		inputBox.innerHTML = `<p>Choose a Word Type</p>`;
		for (let type in allWords[0]) {
			inputBox.innerHTML += `<button class=${idsAndClassesFor['wordType']} id=${type}>${type}</button>`
		}
	}
}

function getWord(type) {
	let number = Math.floor(Math.random() * allWords[0][type].length);
	let word = allWords[0][type].splice(number, 1);
	chosenWord = word;
	inputBox.innerHTML = `<p>Use <span>${word}</span> in a sentence.</p>`;
	inputBox.innerHTML += `<input type="text" name="word" id=${idsAndClassesFor['lineEnter']}></input><button id=${idsAndClassesFor['lineSend']}>Send</button>`;
}

function getSentence(sentence) {
	if (sentence.toLowerCase().includes(chosenWord)) {
		display.innerHTML += `<p>${sentence.replace(chosenWord, `<span>${chosenWord}</span>`)}</p>`;
		sentences++;
		askForWord();
	} else {
		inputBox.innerHTML = `<p>That sentence doesn't have the word <span>${chosenWord}</span></p>`;
		inputBox.innerHTML += `<input type="text" name="word" id=${idsAndClassesFor['lineEnter']}></input><button id=${idsAndClassesFor['lineSend']}>Send</button>`;
	}
}

function end() {
	inputBox.innerHTML = `<p>You did it! You're an author now!</p>`;
	mainBody.innerHTML += `<button id=${idsAndClassesFor['playGame']}>Play Again!</button>`;
}
