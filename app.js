/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice;

scores = [0, 0];
roundScore = 0;
activePlayer = 0; //0 or 1

diceDOM = document.querySelector('.dice');
diceDOM.style.display = 'none';

document.querySelector('.btn-roll').onclick = function(){
    // Gets random dice number
    var dice = Math.floor(Math.random() * 6) + 1;

    // Displays dice image
    diceDOM.style.display = 'block';

    // Changes dice image based on number rolled
    diceDOM.setAttribute('src', 'dice-' + dice + '.png');

    // If number rolled is 1, resets round score and changes turn
    if (dice === 1){
        roundScore = 0;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
        activePlayer = activePlayer === 0 ? 1 : 0;
        document.querySelector('.player-0-panel').classList.toggle('active');
        document.querySelector('.player-1-panel').classList.toggle('active');
    // Else, updates current round score element in the DOM
    } else {
        roundScore += dice;
        document.querySelector('#current-' + activePlayer).textContent = roundScore;
    }
};
