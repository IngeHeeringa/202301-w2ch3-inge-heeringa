const promptUserName = () => {
  const userName = window.prompt(
    "Bienvenid@ al ISDI Coders Bingo! Cómo te llamas?"
  );
  const player = { name: userName, score: "" };
  if (userName === "" || userName === " ") {
    console.log("Introduce un nombre de usuario válido.");
    return promptUserName();
  } else return player;
};

const promptGameMode = (userName) => {
  console.log(
    `Muy bien, ${userName}! Ahora toca elegir el modo de juego. Tienes dos opciones:\n1. El modo clásico, en el cual ganas al conseguir una línea\n2. El modo pro, que te desafía a llenar toda la carta`
  );
  const gameMode = window.prompt(
    `Escribe 1 para jugar al clásico o 2 si te atreves a jugar al pro:`
  );
  if (gameMode === null) {
    return null;
  } else if (gameMode !== "1" && gameMode !== "2") {
    return promptGameMode(userName);
  } else return gameMode;
};

const confirmCard = () => {
  let confirmCard;
  let bingoCard;
  while (!confirmCard) {
    bingoCard = generateCard();
    showCard(bingoCard);
    confirmCard = confirm("Quieres jugar con estos números?");
  }
  return bingoCard;
};

const promptNewTurn = () => {
  return confirm("Quieres sacar otro número?");
};

const promptNewGame = (userName) => {
  const newGame = confirm("Quieres jugar otra vez?");
  if (!newGame) {
    console.log(`Gracias por jugar, ${userName}. Hasta la próxima!`);
  } else main();
};

const generateCard = () => {
  const bingoCard = [];
  while (bingoCard.length < 15) {
    const num = Math.floor(Math.random() * 90 + 1);
    if (!bingoCard.includes(num)) {
      bingoCard.push(num);
    }
  }
  bingoCard.sort((a, b) => a - b);
  return bingoCard;
};

const getRows = (bingoCard) => {
  const firstRow = bingoCard.slice(0, 5);
  const secondRow = bingoCard.slice(5, 10);
  const thirdRow = bingoCard.slice(10, 15);
  return [firstRow, secondRow, thirdRow];
};

const formatSingleDigits = (rows) => {
  for (let i = 0; i < rows.length; i++) {
    for (let j = 0; j < rows[i].length; j++) {
      rows[i][j] = String(rows[i][j]).padStart(2, " ");
    }
  }
  return rows;
};

const showCard = (bingoCard) => {
  const [firstRow, secondRow, thirdRow] = getRows(bingoCard);
  formatSingleDigits([firstRow, secondRow, thirdRow]);
  console.log(
    ` _______________\n|${firstRow
      .toString()
      .split(",")
      .join("|")}|\n ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n _______________\n|${secondRow
      .toString()
      .split(",")
      .join("|")}|\n ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾\n _______________\n|${thirdRow
      .toString()
      .split(",")
      .join("|")}|\n ‾‾‾‾‾‾‾‾‾‾‾‾‾‾‾`
  );
};

const getNewNum = (usedNums) => {
  let randomNum;
  let unique;
  while (!unique) {
    randomNum = Math.floor(Math.random() * 90 + 1);
    unique = !usedNums.includes(randomNum);
  }
  return randomNum;
};

const checkNum = (bingoCard, randomNum, player) => {
  let found;
  for (let i = 0; i < bingoCard.length && !found; i++) {
    if (bingoCard[i] === randomNum) {
      found = true;
      bingoCard[i] = "X";
      console.log(
        `Tenemos un match! ${randomNum} se ha tachado de tu cartón.\nTienes ${player.score} puntos.`
      );
    }
  }
  if (!found) {
    console.log(
      `Has sacado ${randomNum}. Desafortunadamente, no está en tu cartón.\nTienes ${player.score} puntos.`
    );
  }
};

const checkWin = (arrBingoNums) => {
  return arrBingoNums.every((num) => num === "X");
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

const rankingPositionComment = (userName, players, player) => {
  switch (players.indexOf(player)) {
    case 0:
      rankingComment = "Felicidades, campeón!";
      break;
    case 1:
      rankingComment = `Casi lo consigues, ${userName}!`;
      break;
    case 2:
      rankingComment = "Mejor suerte la próxima vez.";
      break;
    case 3:
      rankingComment = "Bueno, al menos no has perdido...";
      break;
    case 4:
      rankingComment = `No te desanimes, ${userName}! Siempre puedes volver a probar tu suerte echando otra partida... :)`;
      break;
  }
  return rankingComment;
};

const showGameState = (
  userName,
  gameMode,
  bingoCard,
  usedNums,
  gameState,
  player,
  players
) => {
  let ranking = sortPlayers(players);
  let rankingComment = rankingPositionComment(userName, players, player);
  const [firstRow, secondRow, thirdRow] = getRows(bingoCard);

  if (gameMode === "1") {
    player.score = player.score - 5;
    const isLine =
      checkWin(firstRow) || checkWin(secondRow) || checkWin(thirdRow);
    if (isLine && !gameState.isLine) {
      gameState.isLine = true;
      gameState.finish = true;
      alert("LÍNEA!!!");
      console.log(
        `LÍNEA!!! Has ganado en ${usedNums.length} turnos.\nHas conseguido ${
          player.score
        } puntos, con lo que acabas en la ${
          ranking.indexOf(player) + 1
        }a posición. ${rankingComment}\nEl ranking final es:`
      );
      ranking.forEach((player) => {
        console.log(`${player.name}: ${player.score} puntos`);
      });
    }
  }

  if (gameMode === "2") {
    player.score = player.score - 10;
    const isBingo = checkWin(bingoCard);
    const isOneLine =
      checkWin(firstRow) || checkWin(secondRow) || checkWin(thirdRow);
    const isTwoLines =
      (checkWin(firstRow) && checkWin(secondRow)) ||
      (checkWin(firstRow) && checkWin(thirdRow)) ||
      (checkWin(secondRow) && checkWin(thirdRow));

    if (isBingo && !gameState.isBingo) {
      gameState.isBingo = true;
      gameState.finish = true;
      alert("BINGO!!!");
      console.log(
        `BINGO!!! Has ganado en ${usedNums.length} turnos.\nHas conseguido ${
          player.score
        } puntos, con lo que acabas en la ${
          ranking.indexOf(player) + 1
        }a posición. ${rankingComment}\nEl ranking final es:`
      );
      ranking.forEach((player) => {
        console.log(`${player.name}: ${player.score} puntos`);
      });
    }

    if (isTwoLines && !gameState.isTwoLines) {
      alert("LÍNEA!!!");
      gameState.isTwoLines = true;
    }

    if (isOneLine && !gameState.isOneLine) {
      alert("LÍNEA!!!");
      gameState.isOneLine = true;
    }
  }
  return gameState;
};

const newTurn = (
  userName,
  gameMode,
  bingoCard,
  usedNums,
  gameState,
  player,
  players
) => {
  const randomNum = getNewNum(usedNums);
  usedNums.push(randomNum);

  checkNum(bingoCard, randomNum, player);
  showCard(bingoCard);

  return showGameState(
    userName,
    gameMode,
    bingoCard,
    usedNums,
    gameState,
    player,
    players
  );
};

const gameModeClassic = (userName, gameMode, player) => {
  const players = [
    { name: "Anabel", score: 190 },
    { name: "Bruno", score: 135 },
    { name: "Carla", score: 230 },
    { name: "Daniel", score: 105 },
  ];
  player.score = 500;
  players.push(player);

  console.log(
    `Has elegido el modo clásico. Cuando consigas una línea, ganas.\nEmpiezas el juego con ${player.score} puntos. Cada turno te cuesta 5 puntos. El jugador que consiga LÍNEA en menos turnos, gana la partida.\nJuguemos!`
  );
  const bingoCard = confirmCard();
  console.log(`Sabia elección, ${userName}! Empezamos!`);

  const usedNums = [];
  let gameState = { isLine: false, finish: false };
  while (!gameState.finish && !gameState.isLine) {
    newTurn(
      userName,
      gameMode,
      bingoCard,
      usedNums,
      gameState,
      player,
      players
    );
    if (!gameState.isLine) {
      gameState.finish = !promptNewTurn(userName);
    }
  }
  return players;
};

const gameModePro = (userName, gameMode, player) => {
  const players = [
    { name: "Adrián", score: 190 },
    { name: "Belén", score: 210 },
    { name: "Cristina", score: 155 },
    { name: "Diego", score: 115 },
  ];
  player.score = 1000;
  players.push(player);

  console.log(
    `Has elegido el modo pro. Llena toda la carta para ganar.\nEmpiezas el juego con ${player.score} puntos. Cada turno te cuesta 5 puntos. El jugador que consiga BINGO en menos turnos, gana la partida.\nJuguemos!`
  );
  const bingoCard = confirmCard();
  console.log(`Sabia elección, ${userName}! Empezamos!`);

  const usedNums = [];
  let gameState = {
    isOneLine: false,
    isTwoLines: false,
    isBingo: false,
    finish: false,
  };
  while (!gameState.finish) {
    newTurn(
      userName,
      gameMode,
      bingoCard,
      usedNums,
      gameState,
      player,
      players
    );
    if (!gameState.isBingo) {
      gameState.finish = !promptNewTurn(userName);
    }
  }
  return players;
};

const main = () => {
  const player = promptUserName();
  const userName = player.name;
  if (userName === null) {
    return;
  }

  const gameMode = promptGameMode(userName);
  if (gameMode === null) {
    return;
  }
  if (gameMode === "1") {
    gameModeClassic(userName, gameMode, player);
  }
  if (gameMode === "2") {
    gameModePro(userName, gameMode, player);
  }

  promptNewGame(userName);
};

main();
