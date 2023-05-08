// Gladlibs
let needed
let story =     `It was $noun1 day at school, 
                and $propNoun1 was super $adj1 for lunch. 
                But when she went outside to eat, 
                a $noun2 stole her $noun1! 
                $propNoun1 chased the $noun2 all over school. 
                She $verb1, $verb2, and $verb3 through the playground. 
                Then she tripped on her $noun2 and the $noun2 escaped! 
                Luckily, $propNoun1’s friends were willing to share their ${ noun1 } with her.`;
const word = {
    text: 
};

function replaceAll()
story = story.replace('burger', 'sock');

const $storyElem = $(`<p>${story}</p>`);
$('main .wrapper').html($storyElem);