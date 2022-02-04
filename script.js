'use strict';

//selecting emelents
const score0El = document.querySelector('#score--0');
const score1El = document.getElementById('score--1');
const diceEl = document.querySelector('.dice');
const btnNew = document.querySelector('.btn--new');
const btnRoll = document.querySelector('.btn--roll');
const btnHold = document.querySelector('.btn--hold');
const currentEl0 = document.getElementById('current--0');
const currentEl1 = document.getElementById('current--1');
const player00 = document.querySelector('.player--0');
const player01 = document.querySelector('.player--1');

let scores;
let currentScore;
let activePlayer;
let playing;

//Starting conditions
const init = function () {
  scores = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  playing = true;

  player00.classList.add('player--active');
  player01.classList.remove('player--active');
  player01.classList.remove('player--winner');
  player00.classList.remove('player--winner');

  score1El.textContent = 0;
  score0El.textContent = 0;
  currentEl0.textContent = 0;
  currentEl1.textContent = 0;
  diceEl.classList.add('hidden');
};
init();

//function to switch player
const switchingPlayer = function () {
  currentScore = 0;
  document.getElementById(`current--${activePlayer}`).textContent =
    currentScore;

  activePlayer = activePlayer === 0 ? 1 : 0;
  player00.classList.toggle('player--active');
  player01.classList.toggle('player--active');
};

const scoresForActivePrint = function () {
  document.getElementById(`score--${activePlayer}`).textContent =
    scores[activePlayer];
};

//Rolling dice
btnRoll.addEventListener('click', function () {
  if (playing) {
    //generate a dice roll
    const dice = Math.trunc(Math.random() * 6) + 1;

    //diplay it
    diceEl.classList.remove('hidden');
    diceEl.src = `dice-${dice}.png`;

    //check if it's 1
    if (dice !== 1) {
      currentScore += dice;
      document.getElementById(`current--${activePlayer}`).textContent =
        currentScore;
    } else {
      switchingPlayer();
    }
  }
});

btnHold.addEventListener('click', () => {
  if (playing) {
    scores[activePlayer] += currentScore;
    if (scores[activePlayer] >= 100) {
      scoresForActivePrint();
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.add('player--winner');
      document
        .querySelector(`.player--${activePlayer}`)
        .classList.remove('player--active');
      diceEl.classList.add('hidden');
      playing = false;
    } else {
      scoresForActivePrint();
      switchingPlayer();
    }
  }
});

btnNew.addEventListener('click', init);
