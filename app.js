/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

var scores, roundScore, activePlayer, dice, gameEnded;

// Initializes game
init();

// When 'roll dice' is clicked
document.querySelector('.btn-roll').addEventListener('click', function(){
    if(!gameEnded) {
        // Gets random dice number
        var dice = Math.floor(Math.random() * 6) + 1;

        // Displays dice image
        document.querySelector('.dice').style.display = 'block';

        // Changes dice image based on number rolled
        document.querySelector('.dice').setAttribute('src', 'dice-' + dice + '.png');

        // If number rolled is 1, resets round score and ends turn
        if (dice === 1){
            roundScore = 0;
            endTurn();
        // Else, updates round score
        } else {
            roundScore += dice;
            document.querySelector('#current-' + activePlayer).textContent = roundScore;
        }
    }
});

// When 'hold' is clicked
document.querySelector('.btn-hold').addEventListener('click', function(){
    if(!gameEnded){ 
        // Updates current player score
        scores[activePlayer] += roundScore;

        // Updates current score on UI
        document.getElementById('score-' + activePlayer).textContent = scores[activePlayer];

        // If no input from user, then winningScore is set to 100
        var winningScore = document.querySelector('.winning-score').value ? document.querySelector('.winning-score').value : '100';

        // Checks if player has won
        if(scores[activePlayer] >= winningScore) {
            document.getElementById('name-' + activePlayer).textContent = 'Winner!';
            document.querySelector('.player-' + activePlayer + '-panel').classList.add('winner');
            document.querySelector('.dice').style.display = 'none';
            gameEnded = true;
        } else {
            endTurn();
        }
    }
});

// When 'new game' is clicked
document.querySelector('.btn-new').addEventListener('click', function(){
    for(var i = 0; i < 2; i++){
        // Resets UI global and current scores to zero
        document.getElementById('current-' + i).textContent = '0';
        document.getElementById('score-' + i).textContent = '0';
        // Resets winner styles
        document.querySelector('.player-' + i + '-panel').classList.remove('winner');
    }
    
    // Sets active player to be player 1 on the UI
    document.querySelector('.player-0-panel').classList.add('active');
    document.querySelector('.player-1-panel').classList.remove('active');

    // Resets player names
    document.getElementById('name-0').textContent = 'Player 1';
    document.getElementById('name-1').textContent = 'Player 2';

    init();
});

// Initializes game, sets the game scores to zero and hides dice from UI
function init() {
    scores = [0, 0];
    roundScore = 0;
    activePlayer = 0; //0 or 1
    gameEnded = false;
    document.querySelector('.dice').style.display = 'none';
}

// Ends current player's turn
function endTurn () {
    // Resets current score to 0
    document.getElementById('current-' + activePlayer).textContent = '0';

    // Toggles current active player
    activePlayer = activePlayer === 0 ? 1 : 0;
    document.querySelector('.player-0-panel').classList.toggle('active');
    document.querySelector('.player-1-panel').classList.toggle('active');

    // Resets round score
    roundScore = 0;
}
