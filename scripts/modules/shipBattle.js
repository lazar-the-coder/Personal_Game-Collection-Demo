let battleShips = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => battleShips = obj['ships2D']);

const idsAndClassesFor = {
	'playGame': 'play',
	'display': 'grid-display',
	'displayHolder': 'grid-holder',
	'inputZone': 'targeting-input',
	'keys': 'letter',
	'letters': 'coor-letters',
	'numbers': 'coor-numbers',
	'gridSpace': 'grid-space'
};

const mainBody = document.getElementById('body');

const alphabet = [...'abcdefghijklmnopqrstuvwxyz'];


let display;
let inputZone;

class GridSpace {
	constructor (name) {
		this.space = 'empty';
        this.name = name;
	}
}

const gridSize = 8;
let grid = [];
let shipsList = [];

export function start() {
	mainBody.innerHTML = `<section id=${idsAndClassesFor['displayHolder']}><div id=${idsAndClassesFor['display']}>`;
	display = document.getElementById(idsAndClassesFor['display']);
    generateKeysAndGrid();
}

function generateKeysAndGrid() {
    for (let column = 0; column < gridSize; column++) {
        grid[column] = [];
        for (let row = 0; row < gridSize; row++) {
            grid[column][row] = new GridSpace(`${alphabet[column]}${row+1}`);
            display.innerHTML += `<button class=${idsAndClassesFor['gridSpace']}><span>${alphabet[column]}${row+1}<span></button>`
        }
    }
}