/*
GAME RULES:

- The game has 2 players, playing in rounds
- In each turn, a player rolls a dice as many times as he whishes. Each result get added to his ROUND score
- BUT, if the player rolls a 1, all his ROUND score gets lost. After that, it's the next player's turn
- The player can choose to 'Hold', which means that his ROUND score gets added to his GLBAL score. After that, it's the next player's turn
- The first player to reach 100 points on GLOBAL score wins the game

*/

let scorePanel,
  currentScore,
  playerScore,
  currentPlayer,
  newDice,
  newDice2,
  number,
  setNum;
let init = () => {
  scorePanel = [0, 0];
  currentScore = 0;
  activePlayer = 0;
  currentPlayer = true;
  document.querySelector("#score-0").textContent = 0;
  document.querySelector("#score-1").textContent = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".dice").style.display = "none";
  document.querySelector(".dice2").style.display = "none";

  document.querySelector(".player-0-panel").classList.remove("active");
  document.querySelector(".player-1-panel").classList.remove("active");
  document.querySelector(".player-0-panel").classList.remove("winner");
  document.querySelector(".player-1-panel").classList.remove("winner");
  document.getElementById("name-0").textContent = "Player 1";
  document.getElementById("name-1").textContent = "Player 2";
  document.querySelector(".player-0-panel").classList.add("active");
};
init();

document.querySelector(".btn-roll").addEventListener("click", () => {
  //Roll the Dices
  if (currentPlayer) {
    let dice = Math.floor(Math.random() * 6) + 1;
    let dice2 = Math.floor(Math.random() * 6) + 1;

    // let dice = 6;
    console.log(dice);
    console.log(dice2);

    if ((newDice === 6 && dice === 6) || (newDice2 === 6 && dice2 === 6)) {
      dice = 0;
      dice2 = 0;
      nextPlayer();
    }
    newDice = dice;
    newDice2 = dice2;

    number = document.getElementById("number").value;

    let docDom = document.querySelector(".dice");
    docDom.style.display = "block";
    let docDom2 = document.querySelector(".dice2");
    docDom2.style.display = "block";
    docDom.src = "dice-" + dice + ".png";
    docDom2.src = "dice-" + dice2 + ".png";

    //Add to current Score
    if (dice !== 1 && dice2 !== 1) {
      currentScore += dice + dice2;
      document.querySelector(
        "#current-" + activePlayer
      ).textContent = currentScore;
    } else {
      nextPlayer();
    }
  }
});
document.querySelector(".btn-hold").addEventListener("click", () => {
  if (currentPlayer) {
    scorePanel[activePlayer] += currentScore;
    document.querySelector("#score-" + activePlayer).textContent =
      scorePanel[activePlayer];
    if (number === "") {
      setNum = 30;
    } else {
      setNum = number;
    }
    if (scorePanel[activePlayer] >= setNum) {
      document.getElementById("name-" + activePlayer).textContent = "winner!!!";
      document.querySelector(".dice").style.display = "none";
      document.querySelector(".dice2").style.display = "none";
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.add("winner");
      document
        .querySelector(".player-" + activePlayer + "-panel")
        .classList.remove("active");
      currentPlayer = false;
    } else {
      nextPlayer();
    }
  }
});

//Next Player Shift
let nextPlayer = () => {
  document.querySelector(".dice").src = "dice-0.png";
  document.querySelector(".dice2").src = "dice-0.png";

  activePlayer === 0 ? (activePlayer = 1) : (activePlayer = 0);
  currentScore = 0;
  document.querySelector("#current-0").textContent = 0;
  document.querySelector("#current-1").textContent = 0;
  document.querySelector(".player-0-panel").classList.toggle("active");
  document.querySelector(".player-1-panel").classList.toggle("active");
  //   document.querySelector(".player-1-panel").classList.toggle = "active";
};

document.querySelector(".btn-new").addEventListener("click", init);
