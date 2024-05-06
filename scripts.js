// Player factory
function createPlayer(name, value) {
  const name = name;
  const value = value;
  return { name, value };
}

// Cell factory
function createCell() {
  let filledBy = 0;

  const getCellStatus = () => filledBy;
  const setCellStatus = function (id) {
    filledBy = id;
  };
  return { getCellStatus, setCellStatus };
}

// Game IIFE

const Game = function () {
  const player1 = createPlayer(askForName(1), 1);
  const player2 = createPlayer(askForName(2), 2);
  // Gameboard IIFE
  const Gameboard = function () {
    const size = 3;
    let board = [];

    const getBoard = () => board;

    const resetBoard = function () {
      board = [];
      for (let i = 0; i < size; i++) {
        board[i] = [];
        for (let j = 0; j < size; j++) {
          board[i].push(createCell());
        }
      }
    };
    return { getBoard, resetBoard };
  };

  let isRunning = true;
  let turnCount = 0;
  let currentPlayer;
  while (isRunning) {
    //Calculates player turn
    currentPlayer = turncount % 2 == 0 ? player1 : player2;
    getPlay(turnCount, currentPlayer.name);
    turnCount++;
    //Checks for victory
    if (checkForWin()){
      console.log (currentPlayer.name + " has won!")
      isRunning = false;
    }
  }
};

//Function for name request
function askForName(playerNo) {
  console.log("Enter player " + playerNo + "'s name: ");
  return console.readLine();
}

//Function for play input
function getPlay(turn, name) {
  let filledCorrectly = false;
  while (!filledCorrectly) {
    //Gets the position in which to insert.
    console.log("Turn " + turn + ", " + name + "'s turn.");
    console.log("Enter row to modify");
    let row = console.readLine();
    console.log("Enter column to modify");
    let col = console.readLine();

    //Checks if the place isnt filled.
    if (Gameboard.getBoard[row][col].getCellStatus != 0) {
      //Sets users input in the array
      Gameboard.getBoard[row][col].setCellStatus(currentPlayer.value);
      filledCorrectly = true;
    } else console.log("That spot is already filled.");
  }
}

function checkForWin(){
  const board = Gameboard.getBoard();
  let hasWon = false;
  //Check for rows
  for (let i = 0; i<3; i++){
    if (board[i][0].value == board[i][1].value == board[i][2].value) hasWon = true;
  }
  //Check for columns
  for (let i = 0; i<3; i++){
    if (board[0][i].value == board[1][i].value == board[2][i].value) hasWon = true;
  }
  //Check for diagonals 
  if (board[0][0].value == board[1][1] == board[2][2] || board[0][2].value == board[1][1].value == board[2][0].value) hasWon = true;
  return hasWon;
}

// TODO: DisplayController IIFE
