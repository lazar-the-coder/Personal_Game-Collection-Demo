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
		storyFull = storyFull.replaceAll(word, dic[word]);
		}
		return storyFull;
	}
}

let newStory
let wordDic = {}

export function selector() {
	mainBody.innerHTML = '<div class="story-options"></div>';
	const storyoptions = document.getElementsByClassName('story-options')[0];
	for (let i = 0; i < gladStories.length; i++) {
		storyoptions.innerHTML += (`<li><a id='num-${i}'>${gladStories[i].title}</a></li>`);
	}
	storyoptions.addEventListener("click", (event) => {
		if (event.target.tagName === 'A') {
			let id = event.target.getAttribute('id').slice(-1)
			newStory = new StoryTemplate(gladStories[id].text, gladStories[id].title);
			printForm()
		}
	});
}

export function printForm() {
	mainBody.innerHTML = '<form><div class="form-options"></div></form>';
	const form = document.getElementsByTagName('form')[0];
	const formoptions = document.getElementsByClassName('form-options')[0];
	for (let word of newStory.words) {
		formoptions.innerHTML +=    `<div class="form-choice>
										<label for="${word}">${word.slice(1, -1)}</label><br />
										<input type="text" name="word" id="${word}">
									</div>`
	}
	form.innerHTML += `<input type="submit" value="Get Glad!"></input>`
	form.addEventListener("click", (event) => {
		if (event.target.getAttribute('type') === 'submit') {
			submitInfo()
		}
	});
}
    
function submitInfo() {
	const fieldData = document.getElementsByTagName('input');
	const storyWords = newStory.words
	for (let i = 0; i < storyWords.length; i++) {
		wordDic[storyWords[i]] = fieldData[i].value;
	}
	printStory()
}

function printStory() {
	const theStory = newStory.giveStory(wordDic);
	mainBody.innerHTML = `<p>${theStory}</p>`;
}