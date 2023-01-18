const promptUserName = () => {
  let userName = window.prompt("Welcome to Pasapalabra! What is your name?");
  if (userName === "" || userName === " ") {
    userName = "Stranger";
  }

  const player = { name: userName, score: 0 };
  return player;
};

const promptGameMode = (userName) => {
  console.log(
    `The rules are simple. You get 26 questions, one for each letter of the alphabet. Every correct answer earns you a point. If you don't know the answer right away, you can pass by saying 'pasapalabra' and answer at a later stage. If you want to leave, just say 'end' or hit cancel.\nYou have 3 minutes to answer all of the questions. When time is up, the game is over.`
  );
  const gameMode = window.prompt(
    `Let's choose the game mode, ${userName}. You have three options:\n1. Easy\n2. Medium\n3. Hard\n\nEnter 1, 2 or 3 and hit OK`
  );

  if (gameMode === null) {
    return null;
  } else if (gameMode !== "1" && gameMode !== "2" && gameMode !== "3") {
    return promptGameMode(userName);
  } else return gameMode;
};

const confirmStart = () => {
  let startGame = confirm(`Ready? Let's play!`);
  if (!startGame) {
    return null;
  }
};

const promptQuestion = (letters, gameMode) => {
  const [questionsEasy, questionsMedium, questionsHard] =
    letters[letter].questions;
  let currentQuestion;

  switch (gameMode) {
    case "1":
      currentQuestion = questionsEasy;
      break;
    case "2":
      currentQuestion = questionsMedium;
      break;
    case "3":
      currentQuestion = questionsHard;
      break;
  }

  const currentLetter = letters[letter].letter.toUpperCase();
  const userAnswer = prompt(
    `Starting with ${currentLetter}: ${currentQuestion.question}`
  );
  if (userAnswer === null) {
    return [currentQuestion, null];
  } else if (userAnswer === "" || userAnswer === " ") {
    alert(`Please enter a word starting with ${currentLetter}`);
    return promptQuestion(letters, gameMode);
  } else return [currentQuestion, userAnswer];
};

const promptNewGame = (userName) => {
  const newGame = confirm("Would you like to play again?");
  if (!newGame) {
    console.log(`Thanks for playing, ${userName}. See you soon!`);
  } else main();
};

const setTimer = (gameState) => {
  gameState.startTime = Date.now();
};

const formatNumOfWords = (gameState) => {
  return gameState.rightAnswers === 1 ? "word" : "words";
};

const showGameState = (gameState) => {
  console.log(
    `CURRENT SCORE\nRight answers: ${gameState.rightAnswers}\nWrong answers: ${gameState.wrongAnswers}\nPassed words: ${gameState.passedWords}`
  );
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

const formatRankingPosition = (players, player) => {
  switch (players.indexOf(player) + 1) {
    case 1:
      ending = "st";
      break;
    case 2:
      ending = "nd";
      break;
    case 3:
      ending = "rd";
      break;
    default:
      ending = "th";
      break;
  }
  return ending;
};

const showRanking = (player, gameState) => {
  const players = [
    { name: "Abby", score: Math.floor(Math.random() * 26) },
    { name: "Bruce", score: Math.floor(Math.random() * 26) },
    { name: "Claire", score: Math.floor(Math.random() * 26) },
    { name: "Dennis", score: Math.floor(Math.random() * 26) },
  ];
  players.push(player);
  player.score = gameState.rightAnswers;
  let word_s = formatNumOfWords(gameState);
  const ranking = sortPlayers(players);
  const rankingPositionFormat = formatRankingPosition(players, player);
  const timeInSeconds = (Date.now() - gameState.startTime) / 1000;
  const minutesPassed = Math.floor(timeInSeconds / 60);
  const secondsRemaining = Math.floor(timeInSeconds - minutesPassed * 60);

  if (player.score === 26) {
    alert(
      `WE HAVE A WINNER!!!\nYour time: ${minutesPassed}:${secondsRemaining}`
    );
  }

  console.log(
    `You got ${player.score} ${word_s} right, which puts you in the ${
      ranking.indexOf(player) + 1
    }${rankingPositionFormat} position.\nFinal ranking:`
  );
  ranking.forEach((player) => {
    console.log(`${player.name}: ${player.score} points`);
  });
  return ranking;
};

const checkAnswer = (letters, player, gameMode, gameState) => {
  let [currentQuestion, userAnswer] = promptQuestion(letters, gameMode);
  let word_s = formatNumOfWords(gameState);

  if (userAnswer === null) {
    gameState.finish = true;
    console.log(`You got ${gameState.rightAnswers} ${word_s} right.`);
    return;
  } else userAnswer = userAnswer.toLowerCase();

  switch (userAnswer) {
    case "end":
      gameState.finish = true;
      console.log(`You got ${gameState.rightAnswers} ${word_s} right.`);
      break;
    case currentQuestion.answer:
      letters[letter].state.gotRight = true;
      gameState.rightAnswers += 1;
      player.score += 1;
      console.log("Correct!");
      break;
    case "pasapalabra":
      letters[letter].state.passed = true;
      gameState.passedWords += 1;
      console.log("You passed for now, let's come back later.");
      break;
    default:
      letters[letter].state.gotWrong = true;
      gameState.wrongAnswers += 1;
      console.log(
        `That's not correct! The right answer is ${currentQuestion.answer}.`
      );
      break;
  }
};

const newTurn = (letters, player, gameMode, gameState) => {
  let word_s = formatNumOfWords(gameState);
  for (letter in letters) {
    if (Date.now() - gameState.startTime >= gameState.maxTime) {
      alert("TIME'S UP! GAME OVER.");
      console.log(
        `You've run out of time! You got ${gameState.rightAnswers} ${word_s} right.`
      );
      gameState.finish = true;
      break;
    }

    if (
      !letters[letter].state.gotRight &&
      !letters[letter].state.gotWrong &&
      !gameState.finish
    ) {
      checkAnswer(letters, player, gameMode, gameState);
      showGameState(gameState);
    }
  }
  return gameState;
};

const gameFlow = (letters, player, gameMode) => {
  let gameState = {
    rightAnswers: 0,
    wrongAnswers: 0,
    passedWords: 0,
    maxTime: 180000,
    startTime: null,
    finish: false,
  };
  setTimer(gameState);
  while (!gameState.finish) {
    newTurn(letters, player, gameMode, gameState);
    if (
      letters.every((letter) => letter.state.gotRight || letter.state.gotWrong)
    ) {
      gameState.finish = true;
      showRanking(player, gameState);
    }
  }
};

const gameModeEasy = (letters, player, userName, gameMode) => {
  alert(`Playing it safe or just warming up, ${userName}?`);
  let startGame = confirmStart();
  if (startGame === null) {
    return;
  }
  gameFlow(letters, player, gameMode);
};

const gameModeMedium = (letters, player, userName, gameMode) => {
  alert(`The golden mean between two extremes. Great choice, ${userName}!`);
  let startGame = confirmStart();
  if (startGame === null) {
    return;
  }
  gameFlow(letters, player, gameMode);
};

const gameModeHard = (letters, player, userName, gameMode) => {
  alert(`You like a challenge, don't you, ${userName}?`);
  let startGame = confirmStart();
  if (startGame === null) {
    return;
  }
  gameFlow(letters, player, gameMode);
};

const main = () => {
  const letters = [
    {
      letter: "a",
      questions: [
        { question: "Variable that stores multiple values", answer: "array" },
        { question: "Value passed to a function", answer: "argument" },
        { question: "Set of programming instructions", answer: "algorithm" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "b",
      questions: [
        { question: "True or false", answer: "boolean" },
        {
          question: "Don't forget this in your switch statement",
          answer: "break",
        },
        {
          question: "The project was harder than this question",
          answer: "bingo",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "c",
      questions: [
        { question: "Your webpage would look ugly without it", answer: "css" },
        {
          question: "Template used to create objects in JavaScript",
          answer: "class",
        },
        {
          question: "Function passed as an argument into another function",
          answer: "callback",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "d",
      questions: [
        {
          question: "What we aspire to be after the bootcamp",
          answer: "developer",
        },
        {
          question: "Statement used to check if your code works",
          answer: "debugger",
        },
        {
          question:
            "JavaScript expression that makes it possible to unpack values from arrays, or properties from objects, into distinct variables",
          answer: "destructuring",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "e",
      questions: [
        {
          question: "What you get when you try to reassign a constant variable",
          answer: "error",
        },
        { question: "How JavaScript interacts with HTML", answer: "events" },
        {
          question:
            "JavaScript standard intended to ensure the interoperability of webpages across different browsers",
          answer: "ecmascript",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "f",
      questions: [
        { question: "Block of code that returns a value", answer: "function" },
        {
          question: "You can use this instead of a for loop",
          answer: "foreach",
        },
        {
          question:
            "Returns the largest integer less than or equal to a number",
          answer: "floor",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "g",
      questions: [
        { question: "Knows everything", answer: "google" },
        {
          question: "Scope in which variables can be accessed from anywhere",
          answer: "global",
        },
        {
          question: "Functions that can be exited and later re-entered",
          answer: "generator",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "h",
      questions: [
        { question: "The structural base of a webpage", answer: "html" },
        { question: "The Document Metadata element in HTML", answer: "head" },
        {
          question:
            "Default behavior of moving all the declarations to the top of the scope before code execution",
          answer: "hoisting",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "i",
      questions: [
        { question: "The best coding school", answer: "isdi" },
        {
          question: "Refers to the position of the elements in an array",
          answer: "index",
        },
        { question: "This loop will break your system", answer: "infinite" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "j",
      questions: [
        {
          question:
            "Object-oriented programming language that is not JavaScript",
          answer: "java",
        },
        {
          question:
            "Creates and returns a new string by concatenating all of the elements in an array",
          answer: "join",
        },
        {
          question:
            "Syntax based upon JavaScript syntax for serializing objects, arrays, numbers, strings, booleans, and null",
          answer: "json",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "k",
      questions: [
        {
          question:
            "Reserved word that is part of the syntax in a programming language",
          answer: "keyword",
        },
        {
          question: "Method that returns the property names of an object",
          answer: "keys",
        },
        {
          question:
            "CSS at-rule that controls the intermediate steps in an animation sequence",
          answer: "keyframes",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "l",
      questions: [
        {
          question: "Used to perform repeated tasks based on a condition",
          answer: "loop",
        },
        {
          question:
            "Property that refers to the number of elements in a given array",
          answer: "length",
        },
        { question: "HTML label that defines a list element", answer: "li" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "m",
      questions: [
        {
          question:
            "Method that calls a function on all elements of an array and creates a new array",
          answer: "map",
        },
        {
          question:
            "CSS property that defines the space on all sides of an element",
          answer: "margin",
        },
        {
          question:
            "Built-in JS object that has properties and methods for mathematical constants and functions",
          answer: "math",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "n",
      questions: [
        { question: "The intentional absence of a value", answer: "null" },
        { question: "A loop in a loop", answer: "nested" },
        {
          question:
            "Library that is used for running web applications outside the client's browser",
          answer: "nodejs",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "o",
      questions: [
        { question: "(Almost) everything in JavaScript", answer: "object" },
        {
          question: "The sort() method does this with the values of an array",
          answer: "order",
        },
        {
          question: "Defines the transparency level of an element in CSS",
          answer: "opacity",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "p",
      questions: [
        { question: "Method to ask for user input", answer: "prompt" },
        {
          question: "Variable that is attached to an object",
          answer: "property",
        },
        {
          question:
            "Mechanism by which JavaScript objects inherit features from one another",
          answer: "prototype",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "q",
      questions: [
        { question: "Common keyboard layout", answer: "qwerty" },
        {
          question: "What your program does when you cancel a prompt",
          answer: "quit",
        },
        { question: "The <q> tag in HTML", answer: "quote" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "r",
      questions: [
        { question: "To get a value from a function", answer: "return" },
        {
          question: "A webpage that looks good on all devices",
          answer: "responsive",
        },
        { question: "Type of function that calls itself", answer: "recursive" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "s",
      questions: [
        {
          question: "Zero or more characters written inside quotes",
          answer: "string",
        },
        {
          question: "Your question has probably been asked on here already",
          answer: "stackoverflow",
        },
        {
          question: "Operator that only requires three dots",
          answer: "spread",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "t",
      questions: [
        {
          question: "Operator that checks the type of a value",
          answer: "typeof",
        },
        {
          question: "JavaScript operator that takes three operands",
          answer: "ternary",
        },
        {
          question:
            "Strongly typed programming language that builds on JavaScript",
          answer: "typescript",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "u",
      questions: [
        {
          question: "When you forget to assign a value to a variable",
          answer: "undefined",
        },
        {
          question: "Method used to add an item to the beginning of an array",
          answer: "unshift",
        },
        {
          question: "Universal character encoding standard",
          answer: "unicode",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "v",
      questions: [
        { question: "Var, let or const", answer: "variable" },
        {
          question: "How we check if a user fills in a form field correctly",
          answer: "validation",
        },
        {
          question: "JavaScript framework for building user interfaces",
          answer: "vuejs",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "w",
      questions: [
        {
          question:
            "Type of loop used to repeat a specific block of code until a condition is met",
          answer: "while",
        },
        {
          question: "Object on which we call prompts and alerts",
          answer: "window",
        },
        { question: "What getDay() gives you in a number", answer: "weekday" },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "x",
      questions: [
        { question: "Better not name your variable this", answer: "x" },
        {
          question: "Markup Language used to transport and save data",
          answer: "xml",
        },
        {
          question:
            'Agile software development methodology that takes "best practices" to extreme levels',
          answer: "xp",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "y",
      questions: [
        { question: "Output of the getFullYear() method", answer: "year" },
        { question: "Color represented by #FFFF00", answer: "yellow" },
        {
          question: "Keyword used to pause and resume a generator function",
          answer: "yield",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
    {
      letter: "z",
      questions: [
        {
          question: "Developer who has not slept for 3 nights solving a bug",
          answer: "zombie",
        },
        {
          question: "The index of the first element in an array",
          answer: "zero",
        },
        {
          question:
            "CSS property that sets the order of a positioned element and its descendants",
          answer: "z-index",
        },
      ],
      state: { gotRight: false, gotWrong: false, passed: false },
    },
  ];

  const player = promptUserName();
  const userName = player.name;
  if (userName === null) {
    return;
  }

  let gameMode = promptGameMode(userName);
  switch (gameMode) {
    case "1":
      gameModeEasy(letters, player, userName, gameMode);
      break;
    case "2":
      gameModeMedium(letters, player, userName, gameMode);
      break;
    case "3":
      gameModeHard(letters, player, userName, gameMode);
      break;
    case null:
      return;
  }

  promptNewGame(userName);
};

main();
