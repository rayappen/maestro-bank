'use strict';

const min = 1;
const max = 20;
let score = 10;
let highscore = 0;

//Score reset
document.querySelector('.score').textContent = score;
document.querySelector('.highscore').textContent = 0;

function randGuess(min, max) {
  const range = max - min + 1;
  const randomBuffer = new Uint32Array(1);
  window.crypto.getRandomValues(randomBuffer);
  const randomDecimal = randomBuffer[0] / (0xffffffff + 1);
  return Math.floor(randomDecimal * range) + min;
}

let guess = randGuess(min, max);
console.log('guess: ', guess);

document.querySelector('.check').addEventListener('click', function () {
  const userGuess = Number(document.querySelector('.guess').value);
  let message = '';
  resetScoreAndBackground();
  if (guess === userGuess) {
    score += 10;
    highscore = Math.max(highscore, score);
    message = '😎 Hooray !!!';

    document.querySelector('.number').textContent = guess;
    document.querySelector('body').style.backgroundColor = '#60b347';
    document.querySelector('.number').style.width = '30rem';
    document.querySelector('.highscore').textContent = score;

    guess = randGuess(min, max);
    console.log('guess: ' + guess);
  } else if (score > 0 && guess !== userGuess) {
    if (guess + 1 === userGuess || guess - 1 === userGuess) {
      score--;
      message = '☀️ Warmer';
    } else {
      score = score <= 2 ? 0 : score - 2;
      message = '🧊 Colder';
    }
  } else {
    message = '😟 You lost the game';
  }
  document.querySelector('.message').textContent = message;
  document.querySelector('.score').textContent = score;
});

document.querySelector('.again').addEventListener('click', function () {
  console.log('Again pressed');
  guess = randGuess(min, max);
  resetScreen();
  console.log('guess: ', guess);
});

function resetScreen() {
  score = 10;
  document.querySelector('.message').textContent = 'Start guessing...';
  document.querySelector('.score').textContent = score;
  document.querySelector('.guess').value = '';
  resetScoreAndBackground();
}

function resetScoreAndBackground() {
  document.querySelector('body').style.backgroundColor = '#222';
  document.querySelector('.number').style.width = '15rem';
  document.querySelector('.number').textContent = '?';
}

document.querySelector('.reset').addEventListener('click', function () {
  highscore = 0;
  score = 10;
  console.log('Reset pressed');
  guess = randGuess(min, max);
  resetScreen();
  document.querySelector('.highscore').textContent = 0;
  console.log('guess: ', guess);
});
