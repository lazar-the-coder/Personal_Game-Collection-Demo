import * as gladLibsFile from './modules/gladlibs.js'
import * as hangManFile from './modules/hangman.js'
// Document setup

const gameListHolder = document.getElementById('game-list');
const gamesList = ['Glad Libs', 'Wheel of Hanged Men'];

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

// Glad Libs
function gladLibs() {

    gladLibsFile.selector()
}

// Hang Man
function hangedMen() {

    hangManFile.start()
}

// Tic Tac Toe