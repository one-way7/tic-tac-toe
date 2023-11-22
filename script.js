const Gameboard = (() => {
  const board = ['', '', '', '', '', '', '', '', ''];

  const getBoard = () => board;

  const render = () => {
    let boardHTML = '';

    for (let i = 0; i < 9; i++) {
      boardHTML += `<div class='cell' id='${i}'></div>`;
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
  let isWin = false;
  const board = Gameboard.getBoard();
  const winConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
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

  const putMarkInCell = (cell, index) => {
    const activePlayerClass = activePlayer.mark === 'X' ? 'cross' : 'circle';

    board[index] = activePlayer.mark;
    cell.classList.add(activePlayerClass);
  };

  const playRound = (e) => {
    const cell = e.target;
    const cellIndex = e.target.getAttribute('id');

    if (isWin) return;
    if (board[cellIndex] !== '') return;

    putMarkInCell(cell, cellIndex);

    if (checkWinner()) {
      DisplayController.setWinner(activePlayer.name);
      isWin = true;
      DisplayController.showRestartBtn();
      return;
    }

    if (!isWin && board.every((item) => item !== '')) {
      DisplayController.setTie();
      DisplayController.showRestartBtn();
      return;
    }

    activePlayer = activePlayer.mark === 'X' ? players[1] : players[0];
    DisplayController.setActivePlayerName(activePlayer.name);
  };

  const checkWinner = () => {
    return winConditions.some((combinations) => {
      return combinations.every((index) => {
        return board[index] === activePlayer.mark;
      });
    });
  };

  const restartGame = () => {
    for (let i = 0; i < board.length; i++) {
      board[i] = '';
    }
    Gameboard.render();
    isWin = false;

    DisplayController.setActivePlayerName(activePlayer.name);
  };

  return {
    start,
    getActivePlayer,
    playRound,
    restartGame,
  };
})();

const DisplayController = (() => {
  const boardDiv = document.querySelector('.board');
  const startBtn = document.querySelector('.start');
  const restartBtn = document.querySelector('.restart');
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

  const setWinner = (name) => {
    subtextDiv.textContent = `${name} WIN the game!`;
  };

  const setTie = () => {
    subtextDiv.textContent = `It's a Tie!`;
  };

  const attachHandlerOnInput = () => {
    const cellsDiv = document.querySelectorAll('.cell');

    cellsDiv.forEach((cell) => {
      cell.addEventListener('click', Game.playRound);
    });
  };

  const showRestartBtn = () => {
    restartBtn.classList.remove('hide');
  };

  return {
    displayBoard,
    getBoardDiv,
    hideStartBtn,
    getPlayersName,
    setActivePlayerName,
    setWinner,
    setTie,
    hideIputs,
    attachHandlerOnInput,
    showRestartBtn,
  };
})();

document.querySelector('.start').addEventListener('click', () => {
  Game.start(DisplayController.getPlayersName());
  DisplayController.displayBoard();
  DisplayController.hideStartBtn();
  DisplayController.hideIputs();
});

document.querySelector('.restart').addEventListener('click', Game.restartGame);
