let boxes = document.querySelectorAll(".box");
let resetBtn = document.querySelector("#reset-btn");
let newGameBtn = document.querySelector("#new-btn");
let msgContainer = document.querySelector(".msg-container");
let msg = document.querySelector("#msg");

let turnO = true; //playerX, playerO
let count = 0;
let winnerC = false;

const winPatterns = [
  [0, 1, 2],
  [0, 3, 6],
  [0, 4, 8],
  [1, 4, 7],
  [2, 5, 8],
  [2, 4, 6],
  [3, 4, 5],
  [6, 7, 8],
];

const resetGame = () => {
  turnO = true;
  enabledBoxes();
  msgContainer.classList.add("hide");
};

boxes.forEach((box) => {
  box.addEventListener("click", () => {
    if (turnO) {
      box.innerText = "O";
      box.style.color = "red";
      turnO = false;
    } else {
      box.innerText = "X";
      box.style.color = "blue";
      turnO = true;
    }
    box.disabled = true;

    checkWiner();
    ++count;
    console.log(count);
    checkDraw();
  });
});

const disabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = true;
  }
};
const enabledBoxes = () => {
  for (let box of boxes) {
    box.disabled = false;
    box.innerText = "";
    count = 0;
    winnerC = false;
  }
};

const showWinner = (winner) => {
  msg.innerText = `Congratulations, Winner is ${winner}`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
  count = 0;
  winnerC = false;
};
const showDraw = (winner) => {
  msg.innerText = `Draw`;
  msgContainer.classList.remove("hide");
  disabledBoxes();
  count = 0;
  winnerC = false;
};

const checkWiner = () => {
  for (let pattern of winPatterns) {
    let pos1Val = boxes[pattern[0]].innerText;
    let pos2Val = boxes[pattern[1]].innerText;
    let pos3Val = boxes[pattern[2]].innerText;

    if (pos1Val != "" && pos2Val != "" && pos3Val) {
      if (pos1Val === pos2Val && pos2Val === pos3Val) {
        showWinner(pos1Val);
        winnerC = true;
        count = 0;
      }
    }
  }
};
const checkDraw = () => {
  if (count == 9 && winnerC == false) {
    showDraw();
  }
};

newGameBtn.addEventListener("click", resetGame);
resetBtn.addEventListener("click", resetGame);
