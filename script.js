'use strict';

// Selecting elements
const player0El = document.querySelector('.player-0');
const player1El = document.querySelector('.player-1');
const score0El = document.querySelector('#score-0');
const score1El = document.querySelector('#score-1');
const messageEl = document.querySelectorAll('.message');
const current0El = document.querySelector('#current-0');
const current1El = document.querySelector('#current-1');
const diceEl = document.querySelectorAll('.dice');
const btnNew = document.querySelector('.btn-new');
const btnRoll = document.querySelector('.btn-roll');
const btnHold = document.querySelector('.btn-hold');

let scores, currentScore, activePlayer, playing;

// Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  current0El.textContent = 0;
  current1El.textContent = 0;
  score0El.textContent = 0;
  score1El.textContent = 0;

  // diceEl.forEach(el => el.classList.add('hidden'));
  // messageEl.forEach(el => el.classList.add('hidden'));
  player0El.classList.remove('player-winner');
  player1El.classList.remove('player-winner');
  player0El.classList.add('player-active');
  player1El.classList.remove('player-active');
};

init();

const setCurScore = function (score) {
  document.getElementById(`current-${activePlayer}`).textContent = score;
};

const setTotalScore = function (score) {
  document.getElementById(`score-${activePlayer}`).textContent = score;
};

const switchPlayer = function () {
  setCurScore(0);
  currentScore = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  document.querySelector(`#message-${activePlayer}`).classList.add('hidden');
  player0El.classList.toggle('player-active');
  player1El.classList.toggle('player-active');
};

// Rolling dice functionality
btnRoll.addEventListener('click', function () {
  if (playing) {
    // 1. Generating a random dice roll
    const dice0 = Math.ceil(Math.random() * 6);
    const dice1 = Math.ceil(Math.random() * 6);
    // const dice0 = 1;
    // const dice1 = 1;

    // 2. Display dice
    diceEl.forEach(el => el.classList.remove('hidden'));
    diceEl[0].src = `dice-${dice0}.png`;
    diceEl[1].src = `dice-${dice1}.png`;

    // 3. Check for rolled 1: if any dice equals 1, switch to next player
    if (dice0 !== 1 && dice1 !== 1) {
      // Add dice to the current score
      const totalRoll = dice0 + dice1;
      currentScore += totalRoll;

      // Render current score of that turn
      setCurScore(currentScore);
    } else if (dice0 === 1 && dice1 === 1) {
      // The player’s entire score is lost
      scores[activePlayer] = 0;

      // Render total score to 0 and display message
      setTotalScore(0);
      document
        .querySelector(`#message-${activePlayer}`)
        .classList.remove('hidden');

      // Switch to next player
      switchPlayer();
    } else {
      switchPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (playing) {
    // 1. Add current score to active player's score
    scores[activePlayer] += currentScore;
    setTotalScore(scores[activePlayer]);

    // 2. Check if player's score is >=200
    if (scores[activePlayer] >= 200) {
      // Finish the game
      playing = false;
      diceEl.forEach(el => el.classList.add('hidden'));
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.add('player-winner');
      document
        .querySelector(`.player-${activePlayer}`)
        .classList.remove('player-active');
    } else {
      // Switch to the next player
      switchPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
