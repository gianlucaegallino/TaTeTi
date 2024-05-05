// Player factory
function createPlayer(name, value) {
  const name = name;
  const value = value;
  return { name, value };
}
// Cell factory
function createCell() {
  let filledBy = 0;
  return { filledBy };
}

// Game IIFE

const Game = function () {
  // Gameboard IIFE
  const Gameboard = function () {
    const size = 3;
    let board = [];

    for (let i = 0; i < size; i++) {
      board[i] = [];
      for (let j = 0; j < size; j++) {
        board[i].push(createCell());
      }
    }
    return board;
  };
};

// TODO: DisplayController IIFE
