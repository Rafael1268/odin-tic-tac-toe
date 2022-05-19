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
  function _addClickListeners() {
    gameTiles.forEach(tile => {
      tile.addEventListener('click', _clickListener);
    })
  }

  // Changes the tile to show the players marker
  function _clickListener(e) {
    const turnCheckResult = game.turnCheck(e);
    if (turnCheckResult === false) return;
    console.log(turnCheckResult);
    if (turnCheckResult === 'X') {
      gameBoard[e.target.id] = 'X';
    } else {
      gameBoard[e.target.id] = 'O';
    };
    render();
    game.switchTurn();
  };

  _addClickListeners();

  return {
    render
  };
})();

const game = (function() {
  const gameInfoText = document.querySelector('#gameInfo');

  // Generate 2 players
  const player1 = player('player1', 'X')
  const player2 = player('player2', 'O')
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
      gameInfoText.innerHTML = player2.getMarker();
    } else {
      turn = 'player1';
      gameInfoText.innerHTML = player1.getMarker();
    };
  }

  return {
    player1,
    player2,
    turn,
    turnCheck,
    switchTurn
  };
})();