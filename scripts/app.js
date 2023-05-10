// Document setup
const gameListHolder = document.getElementById('game-list');
const gamesList = ['Glad Libs', 'Wheel of Hanged Men'];
const mainBody = document.getElementById('body');

gameListHolder.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        runGames(event.target.textContent)
    }
});

for (game of gamesList) {
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

let story = ''

const wordDic = {}

function gladLibs() {


    story =     `It was $%noun1$ day at school, 
                    and $%propNoun1$ was super $%adj1$ for lunch. 
                    But when she went outside to eat, 
                    a $%noun2$ stole her $%noun1$! 
                    $%propNoun1$ chased the $%noun2$ all over school. 
                    She $%verb1$, $%verb2$, and $%verb3$ through the playground. 
                    Then she tripped on her $%noun2$ and the $%noun2$ escaped! 
                    Luckily, $%propNoun1$’s friends were willing to share their $%noun1$ with her.`;
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
    mainBody.innerHTML = '<form></form>';
    const form = document.getElementsByTagName('form')[0];
    for (word of theStory[1]) {
        form.innerHTML +=   `<div>
                                <label for="${word}">${word.slice(1)}</label><br />
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
    fieldData = document.getElementsByTagName('input');
    fieldKey = newStory.getWords();
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