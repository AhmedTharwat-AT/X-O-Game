const boxes = document.querySelectorAll(".box");
const boxContainer = document.querySelector(".boxes");
const resetBtn = document.querySelector(".modal-btn");
const modal = document.querySelector(".modal");
const main = document.querySelector(".main");
const player = document.querySelector(".modal p");
const xBlock = document.querySelector(".score-1");
const oBlock = document.querySelector(".score-2");
const newGameBlock = document.querySelector(".new-game");
const startBtn = document.querySelector(".start");
const goalInput = document.querySelector("#goal");
const gameOver = document.querySelector(".new-game--container h1");

let swap = false;
let boxValue = {};
let winner = false;
let rounds = 1;
let lastClicked;
let xScore = 0;
let oScore = 0;
let goal = 1;

boxes.forEach((box, i) => {
  box.setAttribute("data-box", i + 1);
  boxValue[i + 1] = i + 1;
});

// check for matching horizontally , vertivally and diagonally boxes

const checkGame = () => {
  for (let i = 1; i < 4; i++) {
    if (
      boxValue[i + 2 * (i - 1)] == boxValue[2 * i + (i - 1)] &&
      boxValue[2 * i + (i - 1)] == boxValue[3 * i]
    )
      winner = true;
    else if (
      boxValue[1 + i - 1] == boxValue[4 + i - 1] &&
      boxValue[4 + i - 1] == boxValue[7 + i - 1]
    )
      winner = true;
  }

  if (
    (boxValue[1] == boxValue[5] && boxValue[5] == boxValue[9]) ||
    (boxValue[3] == boxValue[5] && boxValue[5] == boxValue[7])
  )
    winner = true;
};

// check if round ended
const checkWinner = () => {
  // won round
  if (winner) {
    lastClicked == "cross" ? xScore++ : oScore++;
    main.classList.add("overlay");
    // check if last round
    if (xScore == goal || oScore == goal) {
      newGameBlock.classList.remove("hidden");
      gameOver.innerHTML = `GAME OVER <br> ${
        lastClicked == "cross" ? "X" : "O"
      } wins the GAME !`;
    } else {
      modal.classList.remove("hidden");
      player.textContent = `${
        lastClicked == "cross" ? "X" : "O"
      } wins this ROUND !`;
    }
  } else {
    main.classList.remove("overlay");
    modal.classList.add("hidden");
  }
  xBlock.textContent = `X : ${xScore}`;
  oBlock.textContent = `O : ${oScore}`;
};

//swap x / o classes
const swapClass = (e) => {
  let Target = e.target;
  if (
    !(
      Target.classList.contains("circle") || Target.classList.contains("cross")
    ) &&
    Target.classList.contains("box")
  ) {
    if (!swap) {
      Target.classList.add("cross");
      boxValue[Target.dataset.box] = lastClicked = "cross";
    } else {
      Target.classList.add("circle");
      boxValue[Target.dataset.box] = lastClicked = "circle";
    }
    swap = !swap;
    rounds >= 5 && checkGame();
    checkWinner();
    rounds++;
    if (rounds == 10 && winner == false) {
      main.classList.add("overlay");
      modal.classList.remove("hidden");
      player.textContent = `No Winners , DRAW !`;
    }
  }
};

// start new round
const reset = () => {
  boxes.forEach((box, i) => {
    box.classList.remove("cross");
    box.classList.remove("circle");
    boxValue[i + 1] = i + 1;
  });
  main.classList.remove("overlay");
  modal.classList.add("hidden");
  newGameBlock.classList.add("hidden");
  winner = false;
  rounds = 1;
};

//new game

const setGoal = (e) => {
  goal = e.target.value;
  if (goal > 5) e.target.value = goal = 5;
  else if (goal < 1) e.target.value = goal = 1;
};

const startNewGame = (e) => {
  xScore = 0;
  oScore = 0;
  xBlock.textContent = `X : ${xScore}`;
  oBlock.textContent = `O : ${oScore}`;
  reset();
};

startBtn.addEventListener("click", startNewGame);
goalInput.addEventListener("change", setGoal);
boxContainer.addEventListener("click", swapClass);
resetBtn.addEventListener("click", reset);
