import * as gladLibsFile from './modules/gladLibs.js'
import * as hangManFile from './modules/hangman.js'

let descriptions = '';

fetch('../../data.json')
    .then(response => response.json())
    .then(obj => descriptions = obj['descriptions']);

const mainBody = document.getElementById('body');
const gameListHolder = document.getElementById('game-list');

const gamesList = ['Glad Libs', 'Glad Scribe', 'Wheel of Hanged Men'];

gameListHolder.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        if (event.target.id === "show-games") {
            if (event.target.textContent === "Show All") {
                event.target.textContent = "Hide All";
                for (let game of gamesList) {
                    gameListHolder.innerHTML += (`<li><a>${game}</a></li>`);
                }
            } else if (event.target.textContent === "Hide All") {
                gameListHolder.innerHTML = '';
                gameListHolder.innerHTML += (`<li><a id="show-games">Show All</a></li>`);
            }
        } else if (mainBody.children.length > 0) {
            if (window.confirm("Do you want to play a different playing?")) {
                printDesc(event.target.textContent)
            }
        } else {
            printDesc(event.target.textContent)
        }
    }
});


function printDesc(game) {
	mainBody.innerHTML = `<p class="game-desc">${descriptions[0][`${game}`]}</p>`;
	mainBody.innerHTML += `<input id="play" value="Play!"></input>`
    mainBody.addEventListener("click", (event) => {
        if (event.target.getAttribute('id') === "play") {
            runGames(game)
        }
    });
}

function runGames(game) {
    switch (game) {
        case 'Glad Libs':
            gladLibs();
            break;
        case 'Glad Scribe':
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