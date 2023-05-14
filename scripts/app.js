import * as gladLibsFile from './modules/gladlibs.js'
// Document setup

const gameListHolder = document.getElementById('game-list');
const gamesList = ['Glad Libs', 'Wheel of Hanged Men'];
const mainBody = document.getElementById('body');

gameListHolder.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        runGames(event.target.textContent)
    }
});

for (let game of gamesList) {
    gameListHolder.innerHTML += (`<li><a>${game}</a></li>`);
}

function runGames(game) {
    switch (game) {
        case 'Glad Libs':
            gladLibs();
            break;
        case 'Wheel of Hanged Men':
            hangedMen();
            break;
        default:
            break;
    }
}

// Glad Libs Start
//Make the form to enter the words.

let newStory
let story

const wordDic = {}

function gladLibs() {


    story = gladLibsFile.gladStory;
    printForm()
}

class StoryTemplate {
    constructor (text) {
        this.text = text;
    }

    getWords() {
        let carved = this.text.split('$');
        let carvedWords = [];
        for (let word of carved) {
            if (word.charAt(0) === '%') {
                carvedWords.push(word);
            }
        }
        let allWords = [...new Set(carvedWords)];
        return [carved, allWords];
    }

    giveStory(dic) {
        let storyParts = this.getWords();
        let storyFull = storyParts[0].join('');
        let words = storyParts[1];
        let endStory = storyFull;
        for (let word of words) {
            endStory = endStory.replaceAll(word, dic[word]);
        }
        return endStory;
    }
}

function printForm() {
    newStory = new StoryTemplate(story);
    const theStory = newStory.getWords();
    mainBody.innerHTML = '<form><div class="form-options"></div></form>';
    const form = document.getElementsByTagName('form')[0];
    const formoptions = document.getElementsByClassName('form-options')[0];
    for (let word of theStory[1]) {
        formoptions.innerHTML +=    `<div class="form-choice>
                                        <label for="${word}">${word.slice(1, -1)}</label><br />
                                        <input type="text" name="noun" id="${word}">
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
    const fieldKey = newStory.getWords();
    for (let i = 0; i < fieldKey[1].length; i++) {
        wordDic[fieldKey[1][i]] = fieldData[i].value;
    }
    console.log(wordDic);
    printStory()
}

function printStory() {
    const theStory = newStory.giveStory(wordDic);
    mainBody.innerHTML = `<p>${theStory}</p>`;
}
// Glad Libs End

// Tic Tac Toe