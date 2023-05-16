let gladStories = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => gladStories = obj['gladStories']);

const mainBody = document.getElementById('body');


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

export function selector() {
	wordDic = {};
	mainBody.innerHTML = '<div class="story-options"></div>';
	const storyoptions = document.getElementsByClassName('story-options')[0];
	for (let i = 0; i < gladStories.length; i++) {
		storyoptions.innerHTML += (`<li><a id='num-${i}'>${gladStories[i].title}</a></li>`);
	}
	storyoptions.addEventListener("click", (event) => {
		if (event.target.tagName === 'A') {
			let id = event.target.getAttribute('id').slice(-1);
			newStory = new StoryTemplate(gladStories[id].text, gladStories[id].title);
			printForm();
		}
	});
}

function printForm() {
	mainBody.innerHTML = '<form><p>Verbs are past tense by default</p><div class="form-options"></div></form>';
	const form = document.getElementsByTagName('form')[0];
	const formoptions = document.getElementsByClassName('form-options')[0];
	for (let word of newStory.words) {
		formoptions.innerHTML +=    `<div class="form-choice>
										<label for="${word}">${word.slice(1, -1)}</label><br />
										<input type="text" name="word" class="glad-word" id="${word}">
									</div>`;
	}
	form.innerHTML += `<input type="submit" id="submit-story" value="Get Glad!"></input>`;
	form.addEventListener("click", (event) => {
		if (event.target.id === 'submit-story') {
			submitInfo();
		}
	});
}
    
function submitInfo() {
	const fieldData = document.getElementsByClassName('glad-word');
	const storyWords = newStory.words;
	for (let num in storyWords) {
		wordDic[storyWords[num]] = fieldData[num].value;
	}
	printStory();
}

function printStory() {
	const theStory = newStory.giveStory(wordDic);
	mainBody.innerHTML = `<p class="glad-text">${theStory}</p>`;
	mainBody.innerHTML += `<input id="play" value="Play Again?"></input>`;
}