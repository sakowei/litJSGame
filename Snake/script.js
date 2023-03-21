let timer, grassEl, snakeEl, foodEl;
const snakeBody = [];
let dir = 'left', flag = true;

function $(args) {return document.querySelector(args)}

function createGrass() {
  for (let i = 0; i < 25; i++) {
    for (let j = 0; j < 25; j++) {
      grassEl = document.createElement('div');
      grassEl.classList.add('block');
      $('#ground').appendChild(grassEl);
    }
  }
}

function createSnake() {
  for (let i = 0; i < 3; i++) {
    snakeEl = document.createElement('div');
    snakeEl.classList.add('snake-body');
    snakeEl.style.left = (i+20)*20 + 'px';
    snakeEl.style.top = '60px';
    $('#ground').appendChild(snakeEl);
    snakeBody.push(snakeEl);
  }
}

function createFood() {
  let snakeLength = snakeBody.length;
  let foodLeft, foodTop;
  foodEl = document.createElement('div');
  foodEl.classList.add('food');
  foodLeft = parseInt(Math.random() * 24)*20;
  foodTop = parseInt(Math.random() * 24)*20;
  for (let i = 0;i < snakeLength; i++) {
    if (snakeBody[i].offsetLeft == foodLeft
      && snakeBody[i].offsetTop == foodTop) {
      flag = false;
      break;
    }
  }

  if(flag == true) {
    foodEl.style.left = foodLeft + 'px';
    foodEl.style.top = foodTop + 'px';
    $('#ground').appendChild(foodEl);
  } else {
    createFood();
  }
}

function snakeMove(orientation) {
  let snakeHead = snakeBody[0];
  dir = orientation;
  for(let i = snakeBody.length - 1; i > 0; i--) {
    snakeBody[i].style.left = snakeBody[i-1].offsetLeft + 'px';
    snakeBody[i].style.top = snakeBody[i-1].offsetTop + 'px';
  }

  switch (orientation) {
    case 'left': snakeHead.style.left = snakeHead.offsetLeft - 20 + 'px'; break;
    case 'right': snakeHead.style.left = snakeHead.offsetLeft + 20 + 'px'; break;
    case 'up': snakeHead.style.top = snakeHead.offsetTop - 20 + 'px'; break;
    case 'down': snakeHead.style.top = snakeHead.offsetTop + 20 + 'px'; break;
  }


  if (snakeHead.offsetLeft == -20 ||
    snakeHead.offsetLeft == 500 ||
    snakeHead.offsetTop == -20 ||
    snakeHead.offsetTop == 500) {
    clearInterval(timer);
    if(confirm('もう一度?')) window.location.reload();
  }

  for (let j = 1; j < snakeBody.length; j++) {
    if(snakeHead.offsetLeft == snakeBody[j].offsetLeft &&
      snakeHead.offsetTop == snakeBody[j].offsetTop) {
      clearInterval(timer);
      if(confirm('もう一度?')) window.location.reload();
    }
  }

  if(snakeHead.offsetLeft == foodEl.offsetLeft &&
    snakeHead.offsetTop == foodEl.offsetTop) {
    foodEl.classList.remove('food');
    foodEl.classList.add('snake-body');
    switch(orientation) {
      case 'left':foodEl.style.left = snakeBody[snakeBody.length -1].offsetLeft + 'px'; break;
      case 'right':foodEl.style.left = snakeBody[snakeBody.length -1].offsetLeft + 'px'; break;
      case 'up':foodEl.style.top = snakeBody[snakeBody.length -1].offsetTop + 'px'; break;
      case 'down':foodEl.style.top = snakeBody[snakeBody.length -1].offsetTop + 'px'; break;
    }
    snakeBody.push(foodEl);
    createFood();
    console.log(snakeBody);
  }
}

window.onkeydown = (e) => {
  let event = e || window.event;
  event.preventDefault();
  let orientation = event.key || event.keyIdentifier;
  switch (orientation) {
    case 'ArrowLeft': if(dir != 'right') snakeMove('left'); break;
    case 'ArrowUp': if(dir != 'down') snakeMove('up'); break;
    case 'ArrowRight': if(dir != 'left') snakeMove('right'); break
    case 'ArrowDown': if(dir != 'up') snakeMove('down'); break;
  }
}

function init() {
  $('#play').onclick = () => {
    clearInterval(timer);
    timer = setInterval(() => {
      snakeMove(dir);
    },200);
    snakeMove(dir);
  }

  $('#pause').onclick = () => clearInterval(timer);

  createGrass();
  createSnake();
  createFood();
}

// window.onload = () => init();
window.onload = function () {
  init();
  // console.log(dir);
}
