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

    //Gets the position in which to insert.
    console.log("Turn " + turnCount + ", " + currentPlayer.name + "'s turn.");
    console.log("Enter row to modify");
    let row = console.readLine();
    console.log("Enter column to modify");
    let col = console.readLine();
    //Sets users input in the array
    Gameboard.getBoard[row][col].setCellStatus(currentPlayer.value);
    turnCount++;
  }
  // TODO: Check that plays cant be overwritter
  // TODO: Verify inputs
  // TODO: Add Win conditions.
};

//Function for name request
function askForName(playerNo) {
  console.log("Enter player " + playerNo + "'s name: ");
  return console.readLine();
}

// TODO: DisplayController IIFE
