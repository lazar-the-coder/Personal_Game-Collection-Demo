let gladStories = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => gladStories = obj['gladStories']);

const mainBody = document.getElementById('body');

const idsAndClassesFor = {
    'playGame': 'play',
    'gameText': 'game-text',
	'storyChoices': 'story-options',
	'formChoices': 'form-options',
	'formOption': 'form-choice',
	'gladWord': 'glad-word',
	'submitStory': 'submit-story'
};

class StoryTemplate {
	constructor (text, title) {
		this.text = text;
		this.title = title;
		this.carved = this.text.split('$');
		let carvedWords = [];
		for (let word of this.carved) {
			if (word.charAt(0) === '%') {
				carvedWords.push(word);
			}
		}
		this.words = [...new Set(carvedWords)];
	}
	
	giveStory(dic) {
		let storyFull = this.carved.join('');
		for (let word of this.words) {
			storyFull = storyFull.replaceAll(word, `<span>${dic[word]}</span>`);
		}
		return storyFull;
	}
}

let newStory;
let wordDic = {};

export function start() {
	wordDic = {};
	mainBody.innerHTML = '';
	const storyoptions = document.createElement('div');
	storyoptions.setAttribute('id', idsAndClassesFor['storyChoices'])
	for (let i = 0; i < gladStories.length; i++) {
		storyoptions.innerHTML += (`<li><a id='num-${i}'>${gladStories[i].title}</a></li>`);
	}
	mainBody.append(storyoptions);
	storyoptions.addEventListener("click", (event) => {
		if (event.target.tagName === 'A') {
			let id = event.target.getAttribute('id').slice(-1);
			newStory = new StoryTemplate(gladStories[id].text, gladStories[id].title);
			printForm();
		}
	});
}

function printForm() {
	mainBody.innerHTML = '';
	const form = document.createElement('form');
	const formoptions = document.createElement('div');
	formoptions.setAttribute('id', idsAndClassesFor['formChoices']);
	form.innerHTML = '<p>Verbs are past tense by default</p>';
	form.append(formoptions);
	mainBody.append(form);
	for (let word of newStory.words) {
		formoptions.innerHTML +=    `<section class=${idsAndClassesFor['formOption']}>
										<label for="${word}">${word.slice(1, -1)}</label><br />
										<input type="text" name="word" class=${idsAndClassesFor['gladWord']} id=${word}>
									</section>`;
	}
	form.innerHTML += `<input type="submit" id=${idsAndClassesFor['submitStory']} value="Get Glad!">`;
	form.addEventListener("click", (event) => {
		if (event.target.id === idsAndClassesFor['submitStory']) {
			submitInfo();
		}
	});
}
    
function submitInfo() {
	const fieldData = document.getElementsByClassName(idsAndClassesFor['gladWord']);
	const storyWords = newStory.words;
	for (let num in storyWords) {
		wordDic[storyWords[num]] = fieldData[num].value;
	}
	printStory();
}

function printStory() {
	const theStory = newStory.giveStory(wordDic);
	mainBody.innerHTML = `<p id=${idsAndClassesFor['game-text']}>${theStory}</p>`;
	mainBody.innerHTML += `<button id=${idsAndClassesFor['playGame']}>Play Again!</button>`;
}