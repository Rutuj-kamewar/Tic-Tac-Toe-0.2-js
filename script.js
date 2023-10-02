let currentPlayer = "X";
let gameBoard = ["", "", "", "", "", "", "", "", ""];
let gameActive = true;

var audio = new Audio("ting.mp3");
audio.play();


var gameOver = new Audio("gameover.mp3")
gameOver.play();

function checkWinner() {
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

  for (let combo of winningCombinations) {
    const [a, b, c] = combo;
    if (
      gameBoard[a] &&
      gameBoard[a] === gameBoard[b] &&
      gameBoard[a] === gameBoard[c]
    ) {
      gameActive = false;

      // Show the winning line
     

      return gameBoard[a];
    }
  }

  if (!gameBoard.includes("")) {
    gameActive = false;
    return "Draw";
  }

  return null;
}

function makeMove(cell) {
  const cellIndex = Array.from(cell.parentElement.children).indexOf(cell);

  if (gameBoard[cellIndex] === "" && gameActive) {
    gameBoard[cellIndex] = currentPlayer;
    cell.textContent = currentPlayer;
    cell.classList.add(currentPlayer);
    audio.play();

    const winner = checkWinner();
    if (winner) {
      document.querySelector(".status").textContent =
        winner === "Draw" ? "It's a Draw!" : `${winner} wins!`;

      gameActive = false;
      
      // Add the "winner" class to the game container
      document.querySelector("body").classList.add("winner");
      gameOver.play();
      

      
    }
     else {
      currentPlayer = currentPlayer === "X" ? "O" : "X";
      document.querySelector(".status").textContent = `${currentPlayer}'s Turn`;
    }
  }
}

function showWinningLine(winningCombination) {
  const board = document.querySelector(".board");
  const line = document.querySelector(".winning-line");

  // Calculate the starting and ending positions of the line based on the winning cells
  const [start, end] = winningCombination;

  const startCell = board.children[start];
  const endCell = board.children[end];

  const startRect = startCell.getBoundingClientRect();
  const endRect = endCell.getBoundingClientRect();

  const startX = startRect.left + startRect.width / 2;
  const startY = startRect.top + startRect.height / 2;

  const endX = endRect.left + endRect.width / 2;
  const endY = endRect.top + endRect.height / 2;

  // Set the position and scale of the line
  line.style.left = startX + "px";
  line.style.top = startY + "px";
  line.style.transform = `scaleX(${
    Math.hypot(endX - startX, endY - startY) / line.offsetWidth
  })`;

  // Show the line
  line.style.display = "block";
}

function resetBoard() {
  gameBoard = ["", "", "", "", "", "", "", "", ""];
  currentPlayer = "X";
  gameActive = true;
  document.querySelectorAll(".cell").forEach((cell) => {
    cell.textContent = "";
    cell.classList.remove("X", "O");
  });
  document.querySelector(".status").textContent = "X's Turn";
  document.querySelector("body").classList.remove("winner");
}

resetBoard();
