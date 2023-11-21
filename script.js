const Gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const render = () => {
    let boardHTML = '';

    for (let i = 0; i < 9; i++) {
      boardHTML += `<div class='cell' id='${i}'>${board[i]}</div>`;
    }

    DisplayController.getBoardDiv().innerHTML = boardHTML;
  };

  return {
    render,
    getBoard,
  };
})();

const Game = (() => {
  const start = () => {
    Gameboard.render();
  };

  return {
    start,
  };
})();

const DisplayController = (() => {
  const boardDiv = document.querySelector('.board');
  const startBtn = document.querySelector('.start');

  const displayBoard = () => {
    boardDiv.classList.remove('hide');
  };

  const getBoardDiv = () => boardDiv;

  const hideStartBtn = () => {
    startBtn.classList.add('hide');
  };

  return {
    displayBoard,
    getBoardDiv,
    hideStartBtn,
  };
})();

document.querySelector('.start').addEventListener('click', () => {
  Game.start();
  DisplayController.displayBoard();
  DisplayController.hideStartBtn();
});
