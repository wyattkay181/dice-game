const playerDice = document.getElementById('player-dice');
const computerDice = document.getElementById('computer-dice');
const rollBtn = document.getElementById('roll-btn');
const resetBtn = document.getElementById('reset-btn');
const message = document.getElementById('message');
const winCount = document.getElementById('win-count');
const lossCount = document.getElementById('loss-count');
const tieCount = document.getElementById('tie-count');

const rollSound = document.getElementById('roll-sound');
const winSound = document.getElementById('win-sound');
const loseSound = document.getElementById('lose-sound');

let wins = 0, losses = 0, ties = 0;

function getDiceEmoji(num) {
  // Unicode dice faces 1-6
  return ['⚀','⚁','⚂','⚃','⚄','⚅'][num-1];
}

function rollDice() {
  return Math.floor(Math.random() * 6) + 1;
}

function updateDisplay(player, computer) {
  playerDice.textContent = getDiceEmoji(player);
  computerDice.textContent = getDiceEmoji(computer);
}

function animateDice() {
  playerDice.classList.add('rolling');
  computerDice.classList.add('rolling');
  setTimeout(() => {
    playerDice.classList.remove('rolling');
    computerDice.classList.remove('rolling');
  }, 500);
}

function playSound(type) {
  if (type === 'roll') rollSound.play();
  if (type === 'win') winSound.play();
  if (type === 'lose') loseSound.play();
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

rollBtn.addEventListener('click', () => {
  rollBtn.disabled = true;
  playSound('roll');
  animateDice();
  setTimeout(() => {
    const playerRoll = rollDice();
    const computerRoll = rollDice();
    updateDisplay(playerRoll, computerRoll);
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
    }
    updateCounters();
    rollBtn.disabled = false;
  }, 500);
});

resetBtn.addEventListener('click', () => {
  wins = 0;
  losses = 0;
  ties = 0;
  updateCounters();
  playerDice.textContent = '🎲';
  computerDice.textContent = '🎲';
  message.textContent = '';
});

// Initial state
updateCounters(); 