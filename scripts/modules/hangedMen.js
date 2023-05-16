let hangingPhrases = '';

fetch('../../data.json')
	.then(response => response.json())
	.then(obj => hangingPhrases = obj['hangingPhrases']);

const mainBody = document.getElementById('body');