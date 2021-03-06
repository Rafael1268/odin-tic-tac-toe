const player = (name, marker) => {
  const getName = () => name;
  const getMarker = () => marker;
  return {getName, getMarker};
};

const gameBoard = (function() {
  let gameBoard = ["", "", "", "", "", "", "", "", ""];
  const gameTiles = document.querySelectorAll('.tile');

  // Renders the board
  function render() {
    let num = 0;
    gameBoard.forEach(tile => {
      gameTiles[num].innerHTML = gameBoard[num];
      num++
    });
  };

  // Add a click listener to each tile
  function addClickListeners() {
    gameTiles.forEach(tile => {
      tile.addEventListener('click', _clickListener);
    })
  };

  // Removes click listeners from all tiles
  function removeClickListeners() {
    gameTiles.forEach(tile => {
      tile.removeEventListener('click', _clickListener);
    });
  };

  // Changes the tile to show the players marker
  function _clickListener(e) {
    const turnCheckResult = game.turnCheck(e);
    if (turnCheckResult === false) return;
    if (turnCheckResult === 'X') {
      gameBoard[e.target.id] = 'X';
    } else {
      gameBoard[e.target.id] = 'O';
    };
    render();
    game.switchTurn();
    game.checkGameOver()
  };

  // Checks if X won
  function checkXWin() {
    const g = gameBoard;
    if (g[0] === 'X' && g[1] === 'X' && g[2] === 'X') {
      return true;
    } else if (g[3] === 'X' && g[4] === 'X' && g[5] === 'X') {
      return true;
    } else if (g[6] === 'X' && g[7] === 'X' && g[8] === 'X') {
      return true;
    } else if (g[0] === 'X' && g[3] === 'X' && g[6] === 'X') {
      return true;
    } else if (g[1] === 'X' && g[4] === 'X' && g[7] === 'X') {
      return true;
    } else if (g[2] === 'X' && g[5] === 'X' && g[8] === 'X') {
      return true;
    } else if (g[0] === 'X' && g[4] === 'X' && g[8] === 'X') {
      return true;
    } else if (g[2] === 'X' && g[4] === 'X' && g[6] === 'X') {
      return true;
    };
  };

  // Checks if O won
  function checkOWin() {
    const g = gameBoard;
    if (g[0] === 'O' && g[1] === 'O' && g[2] === 'O') {
      return true;
    } else if (g[3] === 'O' && g[4] === 'O' && g[5] === 'O') {
      return true;
    } else if (g[6] === 'O' && g[7] === 'O' && g[8] === 'O') {
      return true;
    } else if (g[0] === 'O' && g[3] === 'O' && g[6] === 'O') {
      return true;
    } else if (g[1] === 'O' && g[4] === 'O' && g[7] === 'O') {
      return true;
    } else if (g[2] === 'O' && g[5] === 'O' && g[8] === 'O') {
      return true;
    } else if (g[0] === 'O' && g[4] === 'O' && g[8] === 'O') {
      return true;
    } else if (g[2] === 'O' && g[4] === 'O' && g[6] === 'O') {
      return true;
    };
  };

  // Checks if the game has ended in a tie
  function checkForTie() {
    let num = 0;
    gameBoard.forEach(tile => {
      if (tile === 'X' || tile === 'O') {
        return num++;
      } else {
        return;
      };
    });
    if (num === 9) {
      return true;
    };
  };

  // Clears the board
  function clearBoard() {
    gameBoard = ["", "", "", "", "", "", "", "", ""];
    render();
  };

  return {
    gameBoard,
    render,
    checkXWin,
    checkOWin,
    checkForTie,
    addClickListeners,
    removeClickListeners,
    clearBoard
  };
})();

const game = (function() {
  const gameInfoText = document.querySelector('#gameInfo');
  const startGameBtn = document.querySelector('#startGame');
  const gameDialog = document.querySelector('#dialog');
  const submitForm = document.querySelector('#submitForm');
  const playerOneName = document.querySelector('#playerOneName');
  const playerTwoName = document.querySelector('#playerTwoName');

  startGameBtn.addEventListener('click', () => startGame());
  submitForm.addEventListener('click', () => firstGame());

  gameDialog.show();

  // Generate 2 players
  let player1;
  let player2;
  let turn = 'player1';

  // Check which players turn it is and return their marker
  function turnCheck(e) {
    if (e.target.innerHTML === 'X' || e.target.innerHTML === 'O') {
      return false;
    } else if (turn === 'player1') {
        return player1.getMarker();
    } else {
      return player2.getMarker();
    };
  };

  // Switch whos turn it is
  function switchTurn() {
    if (turn === 'player1') {
      turn = 'player2';
      gameInfoText.innerHTML = `${player2.getName()}'s Turn`;
    } else {
      turn = 'player1';
      gameInfoText.innerHTML = `${player1.getName()}'s Turn`;
    };
  }

  // Checks if the game is over
  function checkGameOver() {
    const checkX = gameBoard.checkXWin();
    const checkO = gameBoard.checkOWin();
    const checkTie = gameBoard.checkForTie();
    if (checkX === true) {
      gameBoard.removeClickListeners();
      gameInfoText.innerHTML = `${player1.getName()} won!`;
      return true;
    } else if (checkO === true) {
      gameBoard.removeClickListeners();
      gameInfoText.innerHTML = `${player2.getName()} won!`;
      return true;
    } else if (checkTie === true) {
      gameBoard.removeClickListeners();
      gameInfoText.innerHTML = "It's a tie!";
      return true;
    };
  };

  // Clears the board and starts the game
  function startGame() {
    turn = 'player1';
    gameBoard.clearBoard();
    gameBoard.addClickListeners();
    gameInfoText.innerHTML = `${player1.getName()}'s Turn`;
  };

  // Starts the first game when names are chosen
  function firstGame() {
    if (playerOneName.value.length < 1 || playerTwoName.value.length < 1) return alert('Please fill in all the fields');
    if (playerOneName.value.length > 20 || playerTwoName.value.length > 20) return alert('Those names are too long! Max of 20 characers');
    player1 = player(playerOneName.value, 'X');
    player2 = player(playerTwoName.value, 'O');
    gameDialog.remove();
    startGame();
  };

  return {
    player1,
    player2,
    turn,
    turnCheck,
    switchTurn,
    checkGameOver
  };
})();