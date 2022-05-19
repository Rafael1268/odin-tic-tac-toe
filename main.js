const gameBoard = (function() {
  let gameBoard = ["", "", "", "X", "", "", "", "O", ""];
  const gameTiles = document.querySelectorAll('.tile');

  // Renders the board
  function _render() {
    let num = 0;
    gameBoard.forEach(tile => {
      gameTiles[num].innerHTML = gameBoard[num];
      num++
    });
  };

  _render()
})();

const player = (name, identifier) => {
  const getName = () => name;
  const getId = () => identifier;
  return {getName, getId};
};