import * as gladLibsFile from './modules/gladLibs.js';
import * as hangManFile from './modules/hangedMen.js';

let descriptions = '';

fetch('../../data.json')
    .then(response => response.json())
    .then(obj => descriptions = obj['descriptions']);

const mainBody = document.getElementById('body');
const gameListHolder = document.getElementById('game-list');

const gamesList = ['Glad Libs', 'Glad Scribe', 'Wheel of Hanged Men'];

const idsAndClassesFor = {
    'playGame': 'play',
    'showButton': 'toggle-games',
    'gameDesc': 'game-desc'
};

let playedGame = '';

startGameBar();

mainBody.addEventListener("click", (event) => {
    if (event.target.id === "play") {
        runGames(playedGame);
    }
});

gameListHolder.addEventListener("click", (event) => {
    if (event.target.nodeName === "A") {
        if (event.target.id === idsAndClassesFor['showButton']) {
            if (event.target.textContent === "Show All") {
                event.target.textContent = "Hide All";
                for (let game of gamesList) {
                    gameListHolder.innerHTML += (`<li><a>${game}</a></li>`);
                }
            } else if (event.target.textContent === "Hide All") {
                startGameBar();
            }
        } else if (mainBody.children.length > 0) {
            if (window.confirm("Do you want to play a different playing?")) {
                printDesc(event.target.textContent);
            }
        } else {
            printDesc(event.target.textContent);
        }
    }
});

function startGameBar(){
    gameListHolder.innerHTML = (`<li><a id=${idsAndClassesFor['showButton']}>Show All</a></li>`);
}

function printDesc(game) {
	mainBody.innerHTML = `<p id=${idsAndClassesFor['gameDesc']}>${descriptions[0][`${game}`]}</p>`
	mainBody.innerHTML += `<button id=${idsAndClassesFor['playGame']}>Play!</button>`
    playedGame = game;
}

function runGames(game) {
    switch (game) {
        case 'Glad Libs':
            gladLibs();
            break;
        case 'Glad Scribe':
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