const cells = document.querySelectorAll('.cell');
const statusText = document.querySelector('.status');
const restartBtn = document.querySelector('.restart');
const boardElement = document.querySelector('.board');

// Create audio elements for win and draw
const winAudio = new Audio('victory.mp3'); // Replace with your victory sound file
const drawAudio = new Audio('draw.mp3');  // Replace with your draw sound file
winAudio.volume = 0.5; // Adjust volume if needed
drawAudio.volume = 0.5;

let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningCombinations = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

const checkWin = () => {
  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (board[a] && board[a] === board[b] && board[a] === board[c]) {
      combo.forEach(index => cells[index].classList.add('winning-cell'));
      return true;
    }
  }
  return false;
};

const checkDraw = () => board.every(cell => cell !== '');

const handleCellClick = (e) => {
  const cell = e.target;
  const index = cell.dataset.index;

  if (board[index] !== '' || !gameActive) return;

  board[index] = currentPlayer;
  cell.textContent = currentPlayer;
  cell.classList.add('taken');

  if (checkWin()) {
    boardElement.classList.add('win-animation');
    statusText.textContent = `Player ${currentPlayer} wins! 🎉`;
    gameActive = false;
    winAudio.play(); // Play win sound
  } else if (checkDraw()) {
    boardElement.classList.add('draw-animation');
    statusText.textContent = 'It\'s a draw! 🤝';
    gameActive = false;
    drawAudio.play(); // Play draw sound
  } else {
    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
  }
};

const restartGame = () => {
  board = ['', '', '', '', '', '', '', '', ''];
  gameActive = true;
  currentPlayer = 'X';
  statusText.textContent = `Player X's turn`;
  boardElement.classList.remove('win-animation', 'draw-animation');
  cells.forEach(cell => {
    cell.textContent = '';
    cell.classList.remove('taken', 'winning-cell');
  });
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);
