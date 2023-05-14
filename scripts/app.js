import * as gladLibsFile from './modules/gladlibs.js'
import * as hangManFile from './modules/hangman.js'

let descriptions = '';

fetch('../../data.json')
.then(response => response.json())
.then(obj => descriptions = obj['descriptions']);

const mainBody = document.getElementById('body');

const gameListHolder = document.getElementById('game-list');
const gamesList = ['Glad Libs', 'Wheel of Hanged Men'];

gameListHolder.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        printDesc(event.target.textContent)
    }
});

for (let game of gamesList) {
    gameListHolder.innerHTML += (`<li><a>${game}</a></li>`);
}
function printDesc(game) {
	mainBody.innerHTML = `<p>${descriptions[0][`${game}`]}</p>`;
	mainBody.innerHTML += `<input value="Play!"></input>`
    mainBody.addEventListener("click", (event) => {
        if (event.target.getAttribute('value') === "Play!") {
            runGames(game)
        }
    });
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

// Glad Libs
function gladLibs() {

    gladLibsFile.selector()
}

// Hang Man
function hangedMen() {

    hangManFile.start()
}

// Tic Tac Toe