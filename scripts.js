// Player factory
function createPlayer(nam, val) {
  const name = nam;
  const value = val;
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

// TODO: DisplayController IIFE
DisplayController = function () {
  const grid = document.querySelector("PlayingGrid");
  
}
// Game IIFE

 Game = function () {
  const name1 = "TestName1";
  const player1 = createPlayer(name1, "X");
  console.log(player1);
  const name2 = "TestName2"
  const player2 = createPlayer(name2, "O");
  console.log(player2);

  let isRunning = true;
  let turnCount = 0;
  let currentPlayer;
  while (isRunning) {
    //Calculates player turn
    currentPlayer = turnCount % 2 == 0 ? player1 : player2;
    getPlay(turnCount, currentPlayer.name, currentPlayer.value);
    turnCount++;
    //Checks for victory
    if (checkForWin()){
      console.log (currentPlayer.name + " has won!")
      isRunning = false;
    }
  }
};

//Function for play input
function getPlay(turn, name, value) {
  let filledCorrectly = false;
  while (!filledCorrectly) {
    //Gets the position in which to insert.
    console.log("Turn " + turn + ", " + name + "'s turn.");
    console.log("Enter row to modify");
    let row = parseInt(prompt());
    console.log("Enter column to modify");
    let col = parseInt(prompt());

    //Checks if the place isnt filled.
    if (Gameboard.getBoard[row][col].getCellStatus() != 0) {
      //Sets users input in the array
      Gameboard.getBoard[row][col].setCellStatus(value);
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

 let myGame = Game();