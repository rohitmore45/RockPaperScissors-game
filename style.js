// let userScore = 0;
// let compScore = 0;

// const choices = document.querySelectorAll(".choice");
// const msg = document.querySelector("#msg");

// const userScorePara = document.querySelector("#user-score");
// const compScorePara = document.querySelector("#comp-score");

// const getCompChoice = () => {
//     let options = ["rock", "paper", "scissors"];

//     let randIdx = Math.floor(Math.random() * 3);
//     return options[randIdx];

// }
// const drawGame = () => {
//     console.log("game was draw..");
//     msg.innerText = "Game Draw...play again..";
//     msg.style.backgroundColor = "#081b31";
// }

// const showWinner = (userWin, userChoice, compChoice) => {
//     if (userWin == true) {
//         // console.log("You win");
//         userScore++;
//         userScorePara.innerText = userScore;
//         msg.innerText = `You Win !! Your ${userChoice} beats ${compChoice}`;
//         msg.style.backgroundColor = "green"
//     }
//     else {
//         // console.log("you lostt");
//         compScore++;
//         compScorePara.innerText = compScore;
//         msg.innerText = `You Lose.  ${compChoice} beats your ${userChoice}`;
//         msg.style.backgroundColor = "red"
//     }
// }

// const playGame = (userChoice) => {
//     // console.log("userChoice =", userChoice);

//     // generate computer choice
//     const compChoice = getCompChoice();
//     // console.log("compchoice =", compChoice);

//     if (userChoice === compChoice) {
//         //draw game
//         drawGame();
//     }
//     else {
//         let userWin = true;
//         if (userChoice === "rock") {
//             //scissors , paper
//             userWin = compChoice === "paper" ? false : true;
//         }
//         else if (userChoice === "paper") {
//             //rock , scissors
//             userWin = compChoice === "scissors" ? false : true;
//         }
//         else {
//             //rock , paper
//             userWin = compChoice === "rock" ? false : true;
//         }
//         showWinner(userWin, userChoice, compChoice);
//     }
// }
// choices.forEach((choice) => {
//     // console.log(choice);
//     const userChoice = choice.getAttribute("id");
//     choice.addEventListener('click', () => {
//         // console.log("choice was clicked", userChoice);
//         playGame(userChoice)
//     })
// })

let userScore = 0;
let compScore = 0;
let drawScore = 0;
let setUserScore = [];
let setCompScore = [];
let setDrawScore = [];

const choices = document.querySelectorAll(".choice");
const msg = document.querySelector("#msg");
const userScorePara = document.querySelector("#user-score");
const compScorePara = document.querySelector("#comp-score");
const drawScorePara = document.querySelector("#draw-score");
const clearBtn = document.querySelector("#clr-btn");

onLoad();

function onLoad() {
  let userscoreStr = localStorage.getItem("setUserScore");
  setUserScore = userscoreStr ? JSON.parse(userscoreStr) : [];
  userScorePara.innerText = setUserScore.length;

  let drawscoreStr = localStorage.getItem("setDrawScore");
  setDrawScore = drawscoreStr ? JSON.parse(drawscoreStr) : [];
  drawScorePara.innerText = setDrawScore.length;

  let compscoreStr = localStorage.getItem("setCompScore");
  setCompScore = compscoreStr ? JSON.parse(compscoreStr) : [];
  compScorePara.innerText = setCompScore.length;
}

(function clearScore() {
  clearBtn.addEventListener("click", () => {
    localStorage.removeItem("setUserScore");
    localStorage.removeItem("setCompScore");
    localStorage.removeItem("setDrawScore");
    setUserScore = [];
    setCompScore = [];
    setDrawScore = [];
    userScorePara.innerText = "0";
    drawScorePara.innerText = "0";
    compScorePara.innerText = "0";
    msg.innerText = " Play Your Move ";
    msg.style.backgroundColor = "#fbc531";
  });
})();

const getCompChoice = () => {
  const options = ["rock", "paper", "scissors"];
  let randIdx = Math.floor(Math.random() * 3);
  return options[randIdx];
};
const drawGame = (userChoice, compChoice) => {
  drawScore++;
  setDrawScore.push(drawScore);
  localStorage.setItem("setDrawScore", JSON.stringify(setDrawScore));
  drawScorePara.innerText = setDrawScore.length;
  msg.innerHTML = `Game Draw!! ${userChoice} VS ${compChoice}`;
  msg.style.backgroundColor = "#00a8ff";
};

const showWinner = (userWin, userChoice, compChoice) => {
  if (userWin == true) {
    userScore++;
    setUserScore.push(userScore);
    localStorage.setItem("setUserScore", JSON.stringify(setUserScore));
    // console.log(setUserScore);
    userScorePara.innerText = setUserScore.length;
    msg.style.backgroundColor = "#4cd137";
    msg.innerHTML = `You Won !! your ${userChoice} beats ${compChoice}`;
  } else {
    compScore++;
    setCompScore.push(compScore);
    localStorage.setItem("setCompScore", JSON.stringify(setCompScore));
    // console.log(setCompScore);
    compScorePara.innerText = setCompScore.length;
    msg.style.backgroundColor = "#e84118";
    msg.innerHTML = `You Lose. ${compChoice} beats your ${userChoice}`;
  }
};
const playGame = (userChoice) => {
  // console.log("userchoice = ", userChoice);

  // generate computer choice
  const compChoice = getCompChoice();
  // console.log("compchoice =", compChoice);

  if (userChoice === compChoice) {
    // console.log("Match is draw..")
    drawGame(userChoice, compChoice);
  } else {
    let userWin = true;

    if (userChoice === "rock") {
      //paper, scissors
      userWin = compChoice === "paper" ? false : true;
    } else if (userChoice === "paper") {
      //rock, scissors
      userWin = compChoice === "scissors" ? false : true;
    } else {
      //rock, paper
      userWin = compChoice === "rock" ? false : true;
    }
    showWinner(userWin, userChoice, compChoice);
  }
};

choices.forEach((choice) => {
  const userChoice = choice.getAttribute("id");
  choice.addEventListener("click", () => {
    playGame(userChoice);
  });
});
