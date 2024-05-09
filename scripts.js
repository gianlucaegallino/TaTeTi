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

// DisplayController Module

const DisplayController = (function () {
  function updateVisualGrid(num, value) {
    const toModify = document.querySelector(`[data-square='${num}']`);
    toModify.innerHTML = `<p>${value}</p>`;
  }

  function updateInfoBanner(input) {
    const banner = document.querySelector(".gameInfo");
    banner.textContent = `${input}`;
  }

  function showForm() {
    let gameDiv = document.querySelector(".gameDiv");
    gameDiv.innerHTML = `<form method="post" action="" class="myForm">
    <label for="Player1">Enter player 1's name:</label>
    <input required placeholder="Player1" type="text" class="Player1">
    <label for="Player2">Enter player 2's name:</label>
    <input required placeholder="Player2" type="text" class="Player2">
    <button type="submit" class="startGameBtn">Start Game!</button>
</form> `;
    updateInfoBanner("Enter player names to start the game:");
  }

  function showPlayingGrid() {
    let gameDiv = document.querySelector(".gameDiv");
    gameDiv.innerHTML = `<div id="gameGrid">
    <div class="gridSquare" data-square = "1"> </div>
    <div class="gridSquare" data-square = "2"> </div>
    <div class="gridSquare" data-square = "3"> </div>
    <div class="gridSquare" data-square = "4"> </div>
    <div class="gridSquare" data-square = "5"> </div>
    <div class="gridSquare" data-square = "6"> </div>
    <div class="gridSquare" data-square = "7"> </div>
    <div class="gridSquare" data-square = "8"> </div>
    <div class="gridSquare" data-square = "9"> </div>
    </div>`;
  }

  //Internal function used for adding and removing listeners
  function clickHandler() {
    const squareNumber = this.dataset.square;
    Game.handlePlay(squareNumber);
  }

  function addCellListeners() {
    const cells = document.querySelectorAll(".gridSquare");
    cells.forEach((cell) => {
      cell.addEventListener("click", clickHandler);
    });
  }

  function removeCellListeners() {
    const cells = document.querySelectorAll(".gridSquare");
    cells.forEach((cell) => {
      cell.removeEventListener("click", clickHandler);
    });
  }

  function addFormListener() {
    const formBtn = document.querySelector(".startGameBtn");
    formBtn.addEventListener("click", (event) => {
      event.preventDefault();
      const player1 = document.querySelector(".Player1");
      const player2 = document.querySelector(".Player2");
      let name1 = player1.value;
      let name2 = player2.value;
      Game.startGame(name1, name2);
    });
  }

  return {
    updateVisualGrid,
    updateInfoBanner,
    showPlayingGrid,
    showForm,
    addCellListeners,
    removeCellListeners,
    addFormListener
  };
})();

// Game board Module
const Gameboard = (function () {
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

  //Sets the board up
  resetBoard();

  return { getBoard, resetBoard };
})();

// Game Module

const Game = (function () {
  let name1, player1, name2, player2;
  let turnCount = 1;

  const getCurrentPlayer = function () {
    return turnCount % 2 == 0 ? player2 : player1;
  };

  const getOtherPlayer = function () {
    return turnCount % 2 == 0 ? player1 : player2;
  };

  const increaseTurnCount = function () {
    turnCount++;
  };

  const getTurnCount = () => turnCount;

  const getInfo = function(){
    DisplayController.showForm();
    DisplayController.addFormListener();
  }

  const startGame = function (n1, n2) {
    name1 = n1;
    name2 = n2;
    turnCount = 1;
    player1 = createPlayer(n1, "X");
    player2 = createPlayer(n2, "O");

    //Sets playScreen and adds listeners to the grid
    Gameboard.resetBoard();
    DisplayController.updateInfoBanner("Turn 1, " + n1 + "'s turn.");
    DisplayController.showPlayingGrid();
    DisplayController.addCellListeners();
  };

  const handlePlay = function (squareNum) {
    //Converts to int
    squareNum = parseInt(squareNum);

    //Gets coordinate positions
    const row = squareNum <= 3 ? 0 : squareNum <= 6 ? 1 : 2;
    const col = [1, 4, 7].includes(squareNum)
      ? 0
      : [2, 5, 8].includes(squareNum)
      ? 1
      : 2;

    //Gets other necessary values
    const board = Gameboard.getBoard();
    const val = Game.getCurrentPlayer().value;
    const otherName = Game.getOtherPlayer().name;

    //Checks if the place isnt filled.
    if (board[row][col].getCellStatus() == 0) {
      //Sets users input in the array
      board[row][col].setCellStatus(val);
      DisplayController.updateVisualGrid(squareNum, val);

      //Checks for victory
      if (checkForWin(val) == true) {
        handleEnding(Game.getCurrentPlayer(), true);
      } else {
        Game.increaseTurnCount();
        if (Game.getTurnCount() == 10) {
          //Checks for stalemate
          handleEnding(Game.getCurrentPlayer(), false);
        } else {
          DisplayController.updateInfoBanner(
            "Turn " + Game.getTurnCount() + ", " + otherName + "'s turn."
          );
        }
      }
    } else {
      DisplayController.updateInfoBanner("That spot is already filled.");
    }
  };

  const handleEnding = function (player, isVictory) {
    isVictory
      ? DisplayController.updateInfoBanner(player.name + " has won!")
      : DisplayController.updateInfoBanner("Its a tie!");
    DisplayController.removeCellListeners();

    //Add button for resetting
    let section = document.querySelector(".extraContent");
    section.innerHTML = `<button class="resetButton" type="button">Play Again!</button>`;
    //Add corresponding listener
    let resetBtn = document.querySelector(".resetButton");
    resetBtn.addEventListener("click", resetGame);
  };

  const resetGame = function () {
    //removes reset button from DOM
    let section = document.querySelector(".extraContent");
    section.innerHTML = "";
    Game.getInfo();
  };

  const checkForWin = function (value) {
    const board = Gameboard.getBoard();
    let hasWon = false;

    //Loads cell statuses for easy checking
    let statArray = [];
    for (let i = 0; i < 3; i++) {
      for (let j = 0; j < 3; j++) {
        statArray.push(board[i][j].getCellStatus());
      }
    }

    //Check for rows
    let n = 0;
    for (let i = 0; i < 3; i++) {
      if (
        statArray[n] == statArray[n + 1] &&
        statArray[n] == statArray[n + 2] &&
        statArray[n] == value
      ) {
        hasWon = true;
      }
      n += 3;
    }
    //Check for columns
    n = 0;
    for (let i = 0; i < 3; i++) {
      if (
        statArray[n] == statArray[n + 3] &&
        statArray[n] == statArray[n + 6] &&
        statArray[n] == value
      ) {
        hasWon = true;
      }
      n += 1;
    }
    //Check for diagonals
    if (
      (statArray[0] == statArray[4] &&
        statArray[0] == statArray[8] &&
        statArray[0] == value) ||
      (statArray[2] == statArray[4] &&
        statArray[2] == statArray[6] &&
        statArray[2] == value)
    ) {
      hasWon = true;
    }

    return hasWon;
  };

  return {
    getCurrentPlayer,
    getOtherPlayer,
    increaseTurnCount,
    startGame,
    getTurnCount,
    handlePlay,
    getInfo
  };
})();

Game.getInfo();
