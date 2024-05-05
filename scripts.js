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
  while (isRunning) {
    // Make game work!
  }
};

//Function for name request
function askForName(playerNo) {
  console.log("Enter player " + playerNo + "'s name: ");
  return console.readLine();
}

// TODO: DisplayController IIFE
