'use strict';

//establihing variables and links to html/DOM
const newGame = document.querySelector('.btn--new');
const roll = document.querySelector('.btn--roll');
const hold = document.querySelector('.btn--hold');

const dice = {
  html: document.querySelector('.dice'),
  img: [
    'dice-1.png',
    'dice-2.png',
    'dice-3.png',
    'dice-4.png',
    'dice-5.png',
    'dice-6.png',
  ],
};

// Player objects
const player1 = {
  playerName: 'Player 1',
  EL: document.querySelector('.player--0'),
  turnScore: 0,
  heldScore: 0,
  hasTurn: true,
  hasWon: false,
};

const player2 = {
  playerName: 'Player 2',
  EL: document.querySelector('.player--1'),
  turnScore: 0,
  heldScore: 0,
  hasWon: true,
};

let activePlayer;

const endTurn = function () {
  console.log(
    `${activePlayer.playerName}'s turn has ended; ${activePlayer.turnScore} has been added to their score`
  );
  activePlayer.turnScore = 0;
  player1.hasTurn = player1.hasTurn ? false : true;
  dice.html.classList.add('hidden');
};

const rollDice = function () {
  //if 'hidden' class in on dice, remove it.
  if (dice.html.classList.contains('hidden'));
  {
    dice.html.classList.remove('hidden');
  }
  const random = Math.trunc(Math.random() * 6);
  console.log(`${activePlayer.playerName} rolls: ${random + 1}`);
  dice.html.src = dice.img[random];
  if (random === 0) {
    activePlayer.turnScore = 0;
    endTurn();
  } else {
    activePlayer.turnScore += random + 1;
  }
};

const holdScore = function () {
  activePlayer.heldScore += activePlayer.turnScore;

  if (activePlayer.heldScore > 100) {
    displayWinner(activePlayer);
    console.log(`${activePlayer.playerName} wins!! Well Done!`);
  }

  endTurn();
};

const displayWinner = function (winningPlayer) {
  console.log(
    winningPlayer.playerName + '  has won! displayWinner has been called'
  );
  winningPlayer.hasWon = true;
  render();
};

//initital state
const resetAll = function () {
  console.log('newGame');

  player1.turnScore = 0;
  player1.heldScore = 0;
  player1.hasTurn = true;
  player1.hasWon = false;
  if (player1.EL.classList.contains('player--winner')) {
    player1.EL.classList.remove('player--winner');
  }

  player2.turnScore = 0;
  player2.heldScore = 0;
  player2.hasWon = false;
  if (player2.EL.classList.contains('player--winner')) {
    player2.EL.classList.remove('player--winner');
  }
};

const render = function () {
  //update active player
  activePlayer = player1.hasTurn ? player1 : player2;
  //display active player by updating css classes
  if (player1.hasTurn) {
    player1.EL.classList.add('player--active');
    player2.EL.classList.remove('player--active');
  } else {
    player1.EL.classList.remove('player--active');
    player2.EL.classList.add('player--active');
  }
  //display scores, both turn and held, for both players
  document.getElementById('current--0').textContent = player1.turnScore;
  document.getElementById('current--1').textContent = player2.turnScore;
  document.getElementById('score--0').textContent = player1.heldScore;
  document.getElementById('score--1').textContent = player2.heldScore;

  //display something to show who won
  if (player1.hasWon === true) {
    document.getElementById('score--0').textContent = 'Wins';
    player1.EL.classList.add('player--winner');
  }
  if (player2.hasWon === true) {
    document.getElementById('score--1').textContent = 'Wins';
    player2.EL.classList.add('player--winner');
  }
};

resetAll();
render();

roll.addEventListener('click', function () {
  if (player1.hasWon === false && player2.hasWon === false) {
    rollDice();
  }
  render();
});

hold.addEventListener('click', function () {
  if (player1.hasWon === false && player2.hasWon === false) {
    holdScore();
  }
  render();
});

newGame.addEventListener('click', function () {
  resetAll();
  //   displayWinner(player1);
  render();
});
