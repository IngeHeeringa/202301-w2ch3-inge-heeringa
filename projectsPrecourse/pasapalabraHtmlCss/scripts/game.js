import { welcomeSelectors, usernameSelectors, gameModeSelectors, gamePlaySelectors, endOfGameSelectors, audioSelectors } from "./selectors.js"
import { letters } from "./variables.js"

const state = {
    gameMode: '',
    time: 180,
    score: 0,
    indexQuestion: 0,
    finish: false
};

const initializeGame = () => {
    welcomeSelectors.welcomeScreen.classList.remove('hidden');
    usernameSelectors.highscoreItem.classList.add('hidden');
    endOfGameSelectors.endOfGameScreen.classList.add('hidden');
    gamePlaySelectors.startContainer.classList.add('hidden');
    gamePlaySelectors.scoreContainer.classList.add('hidden');
    gamePlaySelectors.questionContainer.classList.add('hidden');
    gamePlaySelectors.letters.forEach(letter => letter.classList.remove('letter_correct', 'letter_incorrect', 'letter_selected'));
    letters.forEach(letter => {
        letter.state.gotRight = false;
        letter.state.gotWrong = false;
        letter.state.passed = false;
    });
    usernameSelectors.username.innerText = '';
    usernameSelectors.usernameInput.value = '';
    usernameSelectors.highscore.innerText = '';
    gameModeSelectors.gameMode.innerText = '';
    gamePlaySelectors.timerText.innerText = '3:00';
    gamePlaySelectors.startingWith.innerText = '';
    gamePlaySelectors.question.innerText = '';
    gamePlaySelectors.userAnswer.value = '';
    gamePlaySelectors.userAnswer.placeholder = '';
    gamePlaySelectors.answerFeedback.innerText = '';
    gamePlaySelectors.currentScore.innerText = '0';
    endOfGameSelectors.endOfGameInfo.innerHTML = '';
    state.gameMode = '';
    state.time = 180;
    state.score = 0;
    state.indexQuestion = 0;
    state.finish = false;
};

const checkScreenSize = () => {
    const isSmallScreen = window.matchMedia("(max-width: 600px)");
    if (isSmallScreen.matches) {
        gamePlaySelectors.startContainer.classList.remove('hidden');
        gamePlaySelectors.questionContainer.classList.remove('hidden');
    } else gamePlaySelectors.keyboardControls.classList.remove('hidden');
};

const setUpGame = () => {
    gameModeSelectors.gameModeScreen.classList.add('hidden');
    gamePlaySelectors.scoreContainer.classList.remove('hidden');
    checkScreenSize();
};

const startGame = () => {
    gamePlaySelectors.exitButton.removeAttribute('disabled');
    gamePlaySelectors.exitButton.classList.remove('button_disabled');
    gamePlaySelectors.startContainer.classList.add('hidden');
    gamePlaySelectors.submitAnswerButton.removeAttribute('disabled');
    gamePlaySelectors.passButton.removeAttribute('disabled');
    gamePlaySelectors.submitAnswerButton.classList.remove('button_disabled');
    gamePlaySelectors.passButton.classList.remove('button_disabled');
};

const breakDownGame = () => {
    endOfGameSelectors.endOfGameScreen.classList.remove('hidden');
    gamePlaySelectors.questionContainer.classList.add('hidden');
    gamePlaySelectors.submitAnswerButton.setAttribute('disabled', '');
    gamePlaySelectors.passButton.setAttribute('disabled', '');
    gamePlaySelectors.submitAnswerButton.classList.add('button_disabled');
    gamePlaySelectors.passButton.classList.add('button_disabled');
    gamePlaySelectors.scoreContainer.classList.add('hidden');
    gamePlaySelectors.exitButton.classList.add('button_disabled');
    gamePlaySelectors.exitButton.setAttribute('disabled', '');
};

const checkGameMode = () => {
    let gameModeQuestion;

    switch (state.gameMode) {
        case 'easy':
            gameModeQuestion = letters[state.indexQuestion].questions[0];
            break;
        case 'medium':
            gameModeQuestion = letters[state.indexQuestion].questions[1];
            break;
        case 'hard':
            gameModeQuestion = letters[state.indexQuestion].questions[2];
            break;
    };

    return gameModeQuestion;
};

const startTimer = () => {
    const countdown = () => {
        let minutes = Math.floor(state.time / 60).toString();
        let seconds = Math.floor(state.time - minutes * 60).toString().padStart(2, '0');
        gamePlaySelectors.timerText.textContent = `${minutes}:${seconds}`;
        state.time--;

        if (seconds / 60 === 1) {
            seconds = '0';
            minutes++;
        };

        if (state.time < 0) {
            state.finish = true;
            endOfGameSelectors.endOfGameTitle.innerText = 'Game over';
            endOfGameSelectors.endOfGameInfo.innerText = `You ran out of time :(\n\nFinal score: ${gamePlaySelectors.currentScore.innerText}`;
        };
        
        if (state.finish) {
            clearInterval(timer);
            breakDownGame();
        };
    };
    const timer = setInterval(countdown, 1000);
};

const findIndex = () => {
    if (letters.every(letter => letter.state.gotRight || letter.state.gotWrong || letter.state.passed)) {
        letters.forEach(letter => {
            letter.state.passed = false;
        });
    };
    state.indexQuestion = letters.findIndex(object => !object.state.gotRight && !object.state.gotWrong && !object.state.passed);
};

const renderQuestion = () => {
    const currentQuestion = checkGameMode();
    const startingLetter = letters[state.indexQuestion].letter.toUpperCase();
    gamePlaySelectors.letters[state.indexQuestion].classList.add('letter_selected');
    gamePlaySelectors.startingWith.innerText = `${startingLetter}`;
    gamePlaySelectors.question.innerText = currentQuestion.question;
    gamePlaySelectors.userAnswer.value = '';
    gamePlaySelectors.userAnswer.placeholder = `${startingLetter}...`;
};

const showRequiredAlert = () => {
    gamePlaySelectors.requiredAlert.style.visibility = 'visible';
    gamePlaySelectors.requiredAlert.style.margin = 'auto';
};

const hideRequiredAlert = () => {
    gamePlaySelectors.requiredAlert.style.visibility = 'hidden';
    gamePlaySelectors.requiredAlert.style.marginBottom = '-5rem';
};

const checkAnswer = (currentLetter) => {
    const currentQuestion = checkGameMode();
    const feedbackMessagesRightAnswer = ['Correct!', 'You rock!', `That's right, ${usernameSelectors.username.innerText}!`, `${usernameSelectors.username.innerText} is on fire!`];
    const feedbackMessagesWrongAnswer = [`Oops! Did you mean "${currentQuestion.answer}"?`, `Nope! The answer is "${currentQuestion.answer}"`];

    const answer = String(gamePlaySelectors.userAnswer.value).toLowerCase();

    switch (answer) {
        case currentQuestion.answer:
            currentLetter.state.gotRight = true;
            gamePlaySelectors.letters[state.indexQuestion].classList.add('letter_correct');
            state.score += 1;
            gamePlaySelectors.currentScore.innerText = state.score;
            gamePlaySelectors.answerFeedback.innerText = feedbackMessagesRightAnswer[Math.floor(Math.random() * feedbackMessagesRightAnswer.length)];
            break;
        default:
            currentLetter.state.gotWrong = true;
            gamePlaySelectors.letters[state.indexQuestion].classList.add('letter_incorrect');
            gamePlaySelectors.answerFeedback.innerText = feedbackMessagesWrongAnswer[Math.floor(Math.random() * feedbackMessagesWrongAnswer.length)];
            break;
    };
};

const sortPlayers = (players) => players.sort((a, b) => b.score - a.score);

const showRanking = () => {
    endOfGameSelectors.endOfGameTitle.innerText = 'Ranking';
    
    const currentUser = {
        name: usernameSelectors.username.innerText,
        score: gamePlaySelectors.currentScore.innerText
    };
    
    const players = [
        {name: 'Abby', score: Math.floor(Math.random() * 26)},
        {name: 'Bruce', score: Math.floor(Math.random() * 26)},
        {name: 'Claire', score: Math.floor(Math.random() * 26)},
        {name: 'Dennis', score: Math.floor(Math.random() * 26)}
    ];

    players.push(currentUser);
    sortPlayers(players);

    const rankingTable = document.createElement("table");
    const rankingTableBody = document.createElement("tbody");
    let rankingTableCell;
    
    for (let i = 0; i < players.length; i++) {
        const rankingTableRow = document.createElement("tr");
        for (let j = 0; j < 2; j++) {
          rankingTableCell = document.createElement("td");
          rankingTableCell.classList.add('text-align-left');
          rankingTableRow.appendChild(rankingTableCell);
        };
        rankingTableBody.appendChild(rankingTableRow);
        rankingTableRow.firstChild.innerText = `${players[i].name}`;
        rankingTableRow.lastChild.innerText = `${players[i].score}`;
        if (rankingTableCell.innerText === currentUser.score) {
            rankingTableRow.classList.add('user-ranking-position');
        };
    };
    rankingTable.appendChild(rankingTableBody);
 endOfGameSelectors.endOfGameInfo.appendChild(rankingTable);
};

window.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.code === 'Escape') {
        state.finish = true;
        gamePlaySelectors.exitButton.click();
    };
});

usernameSelectors.usernameInput.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.code === 'Enter') {
        usernameSelectors.submitUsernameButton.click();
    };
});

gamePlaySelectors.userAnswer.addEventListener('keyup', (event) => {
    event.preventDefault();
    if (event.code === 'Enter') {
        gamePlaySelectors.submitAnswerButton.click();
    } else if (event.code === 'Space') {
        gamePlaySelectors.passButton.click();
    };
});

audioSelectors.musicCheckBox.addEventListener('change', () => {
    const songs = ['media/audio/song1.mp3', 'media/audio/song2.mp3', 'media/audio/song3.mp3'];
    const randomSong = songs[Math.floor(Math.random() * songs.length)];
    audioSelectors.music.setAttribute('src', randomSong);

    if (audioSelectors.musicCheckBox.checked) {
        audioSelectors.music.play();
    } else audioSelectors.music.pause();
});

gamePlaySelectors.exitButton.addEventListener('click', () => {
    state.finish = true;
    endOfGameSelectors.endOfGameTitle.innerText = 'You quit';
    endOfGameSelectors.endOfGameInfo.innerText = `Final score: ${gamePlaySelectors.currentScore.innerText}`;
});

welcomeSelectors.welcomeButton.addEventListener('click', () => {
    welcomeSelectors.welcomeScreen.classList.add('hidden');
    usernameSelectors.usernameScreen.classList.remove('hidden');
});

usernameSelectors.submitUsernameButton.addEventListener('click', () => {
    if (usernameSelectors.usernameInput.value === '' || usernameSelectors.usernameInput.value === ' ') {
        usernameSelectors.usernameInput.value = 'Guest';
    } else usernameSelectors.highscoreItem.classList.remove('hidden');

    usernameSelectors.username.innerText = usernameSelectors.usernameInput.value;
    usernameSelectors.highscore.innerText = Math.floor(Math.random() * 26);
    usernameSelectors.usernameScreen.classList.add('hidden');
    gameModeSelectors.gameModeScreen.classList.remove('hidden');
});

gameModeSelectors.easyModeButton.addEventListener('click', () => {
    state.gameMode = 'easy';
    gameModeSelectors.gameMode.innerText = 'Easy';
    setUpGame();
});

gameModeSelectors.mediumModeButton.addEventListener('click', () => {
    state.gameMode = 'medium';
    gameModeSelectors.gameMode.innerText = 'Medium';
    setUpGame();
});

gameModeSelectors.hardModeButton.addEventListener('click', () => {
    state.gameMode = 'hard';
    gameModeSelectors.gameMode.innerText = 'Hard';
    setUpGame();
});

gamePlaySelectors.keyboardControlsButton.addEventListener('click', () => {
    gamePlaySelectors.keyboardControls.classList.add('hidden');
    gamePlaySelectors.startContainer.classList.remove('hidden');
    gamePlaySelectors.questionContainer.classList.remove('hidden');
});

gamePlaySelectors.startButton.addEventListener('click', () => {
    startGame();
    startTimer();
    renderQuestion();
});

gamePlaySelectors.submitAnswerButton.addEventListener('click', () => {
    if (gamePlaySelectors.userAnswer.value === '') {
        showRequiredAlert();
        return;
    } else {
        hideRequiredAlert();
    };

    const currentLetter = letters[state.indexQuestion];

    if (!currentLetter.state.gotRight && !currentLetter.state.gotWrong) {
        checkAnswer(currentLetter);
        gamePlaySelectors.letters[state.indexQuestion].classList.remove('letter_selected');
        if (!letters.every(letter => letter.state.gotRight || letter.state.gotWrong)) {
            findIndex();
            renderQuestion();
        } else {
            state.finish = true;
            showRanking();
        };
    };
});

gamePlaySelectors.passButton.addEventListener('click', () => {
    hideRequiredAlert();
    const currentLetter = letters[state.indexQuestion];
    currentLetter.state.passed = true;
    gamePlaySelectors.answerFeedback.innerText = `You passed!\nLet's come back later`;
    gamePlaySelectors.letters[state.indexQuestion].classList.remove('letter_selected');
    findIndex();
    renderQuestion();
});

endOfGameSelectors.playAgainButton.addEventListener('click', initializeGame);