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
function setDiceFace(diceElem, value) {
  diceElem.style.transform = diceTransforms[value];
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
function animateDiceRoll3D(diceElem, finalValue) {
  diceElem.classList.add('rolling');
  let frames = 18;
  let i = 0;
  const rollInterval = setInterval(() => {
    const rand = Math.floor(Math.random() * 6) + 1;
    setDiceFace(diceElem, rand);
    i++;
    if (i >= frames) {
      clearInterval(rollInterval);
      setTimeout(() => {
        setDiceFace(diceElem, finalValue);
        diceElem.classList.remove('rolling');
      }, 200);
    }
  }, 35);
}

// --- Event Handlers ---
rollBtn.addEventListener('click', () => {
  rollBtn.disabled = true;
  playSound('roll');
  const playerRoll = rollDice();
  const computerRoll = rollDice();
  animateDiceRoll3D(playerDice, playerRoll);
  animateDiceRoll3D(computerDice, computerRoll);
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
  }, 900);
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