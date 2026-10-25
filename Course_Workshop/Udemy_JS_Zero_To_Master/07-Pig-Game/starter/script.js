'use strict';

// Selecting Elements
const playerOneScore = document.querySelector('#score--0');
const playerTwoScore = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');

//Base Condition
playerOneScore.textContent = 0;
playerTwoScore.textContent = 0;
diceEl.classList.add('hidden');

//Required Functions
// function rollingDice() {
    
//     //Gen Random Value
//     const min = 1;
//     const max = 6;
//     const dice = Math.floor(Math.random() * (max - min + 1)) + min;

//     //Display dice
//     diceEl.classList.remove('hidden');
//     diceEl.src = `dice-${dice}.png`;

// }

// Rolling Dice functionality
btnRoll.addEventListener('click', function() {
    //Gen Random Value
    const min = 1;
    const max = 6;
    const dice = Math.floor(Math.random() * (max - min + 1)) + min;

    //Display dice
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`
});