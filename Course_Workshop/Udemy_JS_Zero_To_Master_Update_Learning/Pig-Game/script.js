'use strict';

const min = 1;
const max = 6;
const score0El = document.getElementById('score--0');
const score1El = document.getElementById('score--1');
const current0El = document.getElementById('current--0');
const current1El = document.getElementById('current--1');

const player0El = document.querySelector('.player--0');
const player1El = document.querySelector('.player--1');
const diceEL = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

let scores, currentScore, activePlayer, playerScore, isPlaying;

const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playerScore = [current0El, current1El];
  isPlaying = true;
  activePlayer = 0;

  score0El.textContent = 0;
  score1El.textContent = 0;

  diceEL.classList.add('hidden');

  scores.map(() => 0);
  currentScore = 0;

  diceEL.classList.add('hidden');
  player0El.classList.remove('player--winner');
  player1El.classList.remove('player--winner');
  document.querySelector(`.player--0`).classList.add('player--active');

  playerScore.forEach(score => {
    score.textContent = currentScore;
  });

  score0El.textContent = 0;
  score1El.textContent = 0;
};

init();

const diceRoll = function (min, max) {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomDecimal = randomBuffer[0] / (0xffffffff + 1);
  return Math.floor(randomDecimal * range) + min;
};

const swtichPlayer = function () {
  playerScore[activePlayer].textContent = 0;
  activePlayer = activePlayer === 0 ? 1 : 0;
  currentScore = 0;
  player0El.classList.toggle('player--active');
  player1El.classList.toggle('player--active');
};

btnRoll.addEventListener('click', function () {
  if (isPlaying) {
    diceEL.classList.remove('hidden');

    const dice = diceRoll(min, max);
    diceEL.src = `dice-${dice}.png`;

    if (dice !== 1) {
      currentScore += dice;
      playerScore[activePlayer].textContent = currentScore;
    } else {
      swtichPlayer();
    }
  }
});

btnHold.addEventListener('click', function () {
  if (isPlaying) {
    scores[activePlayer] += currentScore;

    document.getElementById(`score--${activePlayer}`).textContent =
      scores[activePlayer];

    if (scores[activePlayer] >= 10) {
      isPlaying = false;
      diceEL.classList.add('hidden');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player-active');
    } else {
      swtichPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
