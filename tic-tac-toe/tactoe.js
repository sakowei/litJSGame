function $(args) {return document.querySelector(args)}

function GameUI() {
  let Control, blocks, playerSide, AISide;

  let init = () => blocks = document.querySelectorAll('.block');
  let start = function () {
    clean();
    new startModal();
  }

  class startModal {
    constructor() {
      let selectO = $('#selectO'), 
        selectX = $('#selectX');

      $('#start').style['display'] = 'block';

      selectO.onmouseover = function () {
        selectX.className = 'choose';
        this.className = 'choose now';
      };

      selectX.onmouseover = function () {
        selectO.className = 'choose';
        this.className = 'choose now';
      };

      selectO.onclick = () => {
        playerSide = 'o';
        AISide = 'x';
        $('#start').style['display'] = 'none';
        setupListener();
      };

      selectX.onclick = () => {
        playerSide = 'x';
        AISide = 'o';
        $('#start').style['display'] = 'none';
        setupListener();
      };
    }
  }

  let setupListener = () => {
    for (let i = blocks.length-1; i>=0; i--) {
      ((index)=>{
        blocks[index].onclick = () => {
          if(blocks[index].innerHTML !== '') return;
          draw('player', index);
          Control.setBoard(index, -1);
          Control.nextStep();
        }
      })(i);
    }
  }

  let end = () => endModal();

  let endModal = () => {
    switch (Control.getWinner()) {
      case 'AI': $('#end-info').innerText = 'LOST'; break;
      case 'player': $('#end-info').innerText = 'WIN'; break;
      case 'no': $('#end-info').innerText = 'TIE'; break;
    }
    $('#end').style['display'] = 'block';
    $('#btn-restart').onclick = () => {
      $('#end').style['display'] = 'none';
      Control.start();
    }
  }

  let draw = (role, index) => {
    let obj = blocks[index];
    switch (role) {
      case 'AI':
        obj.innerHTML = `<div class="${AISide}"></div>`;
        break;
      
      case 'player':
        obj.innerHTML = `<div class="${playerSide}"></div>`;
        break;
    
      default: break;
    }
  }

  let clean = () => {
    for (let i = blocks.length - 1; i >= 0; i--) {
      blocks[i].innerHTML = '';
    }
  }

  init();

  return {
    setCtrl: (_Control) => Control = _Control,
    start: () => start(),
    end: () => end(),
    draw: (role, obj) => draw(role, obj)
  }
}

function GameController(_UI) {
  let UI, winner, board, winWay;
  let init = () => {
    UI = _UI;
    board = [0, 0 ,0 ,0 ,0 ,0 ,0 ,0 , 0];
    winWay = [[0, 1, 2], [3, 4, 5], [6, 7, 8], [0, 3, 6], [1, 4, 7], [2, 5, 8], [0, 4, 8], [2, 4, 6]];
  }

  let checkOver = () => {
    for(let i = winWay.length - 1; i >= 0; i--) {
      if (board[winWay[i][0]] +
        board[winWay[i][1]] +
        board[winWay[i][2]] == 3) {
          winner = 'AI';
          UI.end();
          return true;
      }

      if(board[winWay[i][0]] +
        board[winWay[i][1]] +
        board[winWay[i][2]] == -3) {
          winner = 'player';
          UI.end();
          return true;
      }
    }

    let count = 0;

    for (let i= winWay.length - 1; i>=0; i--) {
      if(board[i] !== 0) count++;
    }

    if (count == 8) {
      winner = 'no';
      UI.end();
      return true;
    }

    return false;
  }

  let nextStep = () => {
    if(!checkOver()) {
      let max = null, maxSub;
      for (let i = 8; i >=0; i--) {
        for (let j = 8; j >= 0; j--) {
          if(board[j] !== 0) continue;
          board[j] = 1;

          for (let k = winWay.length - 1; k >= 0; k--) {
            if(board[winWay[k][0]] +
              board[winWay[k][1]] +
              board[winWay[k][2]] == 3) {
                console.log(j);
                UI.draw('AI', j);
                checkOver();
                return;
            }
          }
          board[j] = 0;
        }

        if(board[i] !== 0) continue;

        board[i] = 1;

        let tempBoard = board.concat();
        let min = null;
        let tempBoards = new Array();

        for (let j=8; j>=0; j--) {
          if(tempBoard[j] !== 0) continue;

          tempBoard[j] = -1;

          for(let k = winWay.length-1; k>=0; k--) {
            if (tempBoard[winWay[k][0]] +
              tempBoard[winWay[k][1]] +
              tempBoard[winWay[k][2]] == -3) {
                board[i] = 0;
                board[j] = 1;
                UI.draw('AI', j);
                checkOver();
                return;
            }
          }

          let max2 = 0, min2 = 0,
            tempBoardMax = tempBoard.concat(),
            tempBoardMin = tempBoard.concat();

          for(let l = 8; l>=0; l--) {
            if(tempBoardMax[l] == 0) tempBoardMax = 1;
            if(tempBoardMin[l] == 0) tempBoardMin = -1;
          }

          for (let m = winWay.length - 1; m >= 0; m--) {
            if(tempBoardMax[winWay[m][0]]+
              tempBoardMax[winWay[m][1]]+
              tempBoardMax[winWay[m][2]] == 3) max2++;

            if(tempBoardMin[winWay[m][0]]+
              tempBoardMin[winWay[m][1]]+
              tempBoardMin[winWay[m][2]] == -3) min2++;
          }
          let diff = max2 - min2;
          
          if (min == null) {
            min = diff;
          } else {
            min = min > diff ? diff : min;
          }
          tempBoard[j] = 0;
        }
        if (max == null) {
          max = min;
          maxSub = i;
        } else {
          if (max < min) {
            max = min;
            maxSub = i;
          }
        }
        board[maxSub] = 0;
      }
      board[maxSub] = 1;
        UI.draw('AI', maxSub);
        checkOver();
    }
  }
  init();

  return {
    start: () => {
      board = [0,0,0,0,0,0,0,0,0];
      UI.start();
    },
    nextStep: (playerStep) => nextStep(),
    setBoard: (index, val) => board[index] = val,
    getWinner: () => {return winner}
  }
}

window.onload = function () {
  const UI = new GameUI();
  let control = new GameController(UI);
  UI.setCtrl(control);
  control.start();
}
