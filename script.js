// --- DOM Elements ---
const playerDice = document.getElementById('player-dice');
const computerDice = document.getElementById('computer-dice');
const rollBtn = document.getElementById('roll-btn');
const resetBtn = document.getElementById('reset-btn');
const muteBtn = document.getElementById('mute-btn');
const message = document.getElementById('message');
const winCount = document.getElementById('win-count');
const lossCount = document.getElementById('loss-count');
const tieCount = document.getElementById('tie-count');
const rollSound = document.getElementById('roll-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');
const tieSound = document.getElementById('tie-sound');

// --- State ---
let wins = 0, losses = 0, ties = 0;
let isMuted = false;

// --- Dice 3D Transforms (CodePen style) ---
const diceTransforms = [
  '', // placeholder for 0
  'rotateX(0deg) rotateY(0deg)',      // 1: front
  'rotateX(-90deg) rotateY(0deg)',    // 2: top
  'rotateX(0deg) rotateY(-90deg)',    // 3: right
  'rotateX(0deg) rotateY(90deg)',     // 4: left
  'rotateX(90deg) rotateY(0deg)',     // 5: bottom
  'rotateX(0deg) rotateY(180deg)'     // 6: back
];

// --- Utility Functions ---
function setDiceFace(diceElem, value, spins = 0) {
  for (let i = 1; i <= 6; i++) diceElem.classList.remove(`show-${i}`);
  // Add a custom property for extra spins to make the roll dynamic
  diceElem.style.setProperty('--spin-x', spins.x);
  diceElem.style.setProperty('--spin-y', spins.y);
  diceElem.classList.add(`show-${value}`);
}

function getRandomSpins() {
  // Randomize number of full spins for X and Y axes
  return {
    x: 2 + Math.floor(Math.random() * 3), // 2-4 full spins
    y: 2 + Math.floor(Math.random() * 3)
  };
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function playSound(type) {
  if (isMuted) return;
  if (type === 'roll') rollSound.play();
  if (type === 'win') winSound.play();
  if (type === 'lose') loseSound.play();
  if (type === 'tie') tieSound.play();
}

function showMessage(result) {
  if (result === 'win') {
    message.textContent = 'You Win!';
    message.style.color = '#4eeb7f';
  } else if (result === 'lose') {
    message.textContent = 'You Lose!';
    message.style.color = '#ff5c5c';
  } else {
    message.textContent = "It's a Tie!";
    message.style.color = '#ffd966';
  }
}

function updateCounters() {
  winCount.textContent = wins;
  lossCount.textContent = losses;
  tieCount.textContent = ties;
}

// --- Dice Animation ---
function animateDiceRoll3D(diceElem, finalValue, onComplete) {
  const spins = getRandomSpins();
  setDiceFace(diceElem, finalValue, spins);
  setTimeout(() => {
    if (onComplete) onComplete();
  }, 1000); // match CSS transition duration
}

// --- Event Handlers ---
rollBtn.addEventListener('click', () => {
  rollBtn.disabled = true;
  playSound('roll');
  const playerRoll = rollDice();
  const computerRoll = rollDice();
  let finished = 0;
  function checkDone() {
    finished++;
    if (finished === 2) {
      setTimeout(() => {
        if (playerRoll > computerRoll) {
          wins++;
          showMessage('win');
          playSound('win');
        } else if (playerRoll < computerRoll) {
          losses++;
          showMessage('lose');
          playSound('lose');
        } else {
          ties++;
          showMessage('tie');
          playSound('tie');
        }
        updateCounters();
        rollBtn.disabled = false;
      }, 200);
    }
  }
  animateDiceRoll3D(playerDice, playerRoll, checkDone);
  animateDiceRoll3D(computerDice, computerRoll, checkDone);
});

resetBtn.addEventListener('click', () => {
  wins = 0;
  losses = 0;
  ties = 0;
  updateCounters();
  setDiceFace(playerDice, 1);
  setDiceFace(computerDice, 1);
  message.textContent = '';
});

muteBtn.addEventListener('click', () => {
  isMuted = !isMuted;
  muteBtn.textContent = isMuted ? '🔇' : '🔊';
});

// --- Initial State ---
setDiceFace(playerDice, 1);
setDiceFace(computerDice, 1);
updateCounters(); 