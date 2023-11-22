const Gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const render = () => {
    let boardHTML = '';

    for (let i = 0; i < 9; i++) {
      boardHTML += `<div class='cell' id='${i}'>${board[i]}</div>`;
    }

    DisplayController.getBoardDiv().innerHTML = boardHTML;
    DisplayController.attachHandlerOnInput();
  };

  return {
    render,
    getBoard,
  };
})();

function createPlayer(name, mark) {
  return {
    name,
    mark,
  };
}

const Game = (() => {
  const players = [];
  let activePlayer;
  const winConditions = [
    0, 1, 2, 3, 4, 5, 6, 7, 8, 0, 3, 6, 1, 4, 7, 2, 5, 8, 0, 4, 8, 2, 4, 6,
  ];

  const getActivePlayer = () => activePlayer;

  const start = ({ playerName1, playerName2 }) => {
    const player1 = createPlayer(playerName1, 'X');
    const player2 = createPlayer(playerName2, 'O');

    players.push(player1, player2);
    activePlayer = players[0];
    DisplayController.setActivePlayerName(activePlayer.name);
    Gameboard.render();
  };

  const putMarkInCell = (e) => {
    const cellIndex = e.target.getAttribute('id');

    Gameboard.getBoard()[cellIndex] = activePlayer;
  };

  const playRound = () => {};

  return {
    start,
    getActivePlayer,
    putMarkInCell,
  };
})();

const DisplayController = (() => {
  const boardDiv = document.querySelector('.board');
  const startBtn = document.querySelector('.start');
  const inputContainer = document.querySelector('.input-container');
  const playerInput1 = inputContainer.querySelector('[name="first"]');
  const playerInput2 = inputContainer.querySelector('[name="second"]');
  const subtextDiv = document.querySelector('.subtext');

  const displayBoard = () => {
    boardDiv.classList.remove('hide');
  };

  const getBoardDiv = () => boardDiv;

  const hideStartBtn = () => {
    startBtn.classList.add('hide');
  };

  const getPlayersName = () => {
    return {
      playerName1: playerInput1.value,
      playerName2: playerInput2.value,
    };
  };

  const hideIputs = () => {
    inputContainer.classList.add('hide');
  };

  const setActivePlayerName = (name) => {
    subtextDiv.textContent = `${name}'s turn!`;
  };

  const attachHandlerOnInput = (callback, board, activePlayer) => {
    const cellsDiv = document.querySelectorAll('.cell');

    cellsDiv.forEach((cell) => {
      cell.addEventListener('click', Game.putMarkInCell);
    });
  };

  return {
    displayBoard,
    getBoardDiv,
    hideStartBtn,
    getPlayersName,
    setActivePlayerName,
    hideIputs,
    attachHandlerOnInput,
  };
})();

document.querySelector('.start').addEventListener('click', () => {
  Game.start(DisplayController.getPlayersName());
  DisplayController.displayBoard();
  DisplayController.hideStartBtn();
  DisplayController.hideIputs();
});
