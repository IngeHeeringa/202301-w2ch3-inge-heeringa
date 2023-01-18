export const welcomeSelectors = {
    welcomeScreen: document.querySelector('.welcome-screen'),
    welcomeButton: document.querySelector('.welcome-button')
};

export const usernameSelectors = {
    usernameScreen: document.querySelector('.username-screen'),
    usernameInput: document.querySelector('.username-screen__username-input'),
    submitUsernameButton: document.querySelector('.submit-username-button'),
    username: document.querySelector('.username'),
    highscoreItem: document.querySelector('.highscore-item'),
    highscore: document.querySelector('.highscore')
};

export const gameModeSelectors = {
    gameModeScreen: document.querySelector('.game-mode-screen'),
    easyModeButton: document.querySelector('.game-mode-button_easy'),
    mediumModeButton: document.querySelector('.game-mode-button_medium'),
    hardModeButton: document.querySelector('.game-mode-button_hard'),
    gameMode: document.querySelector('.game-mode')
};

export const gamePlaySelectors = {
    startContainer: document.querySelector('.start'),
    startButton: document.querySelector('.start-button'),
    exitButton: document.querySelector('.exit-button'),
    scoreContainer: document.querySelector('.current-score'),
    currentScore: document.querySelector('.current-score__score'),
    timerText: document.querySelector('.timer__text'),
    letters: document.querySelectorAll('.letter'),
    questionContainer: document.querySelector('.question-answer-wrapper'),
    keyboardControls: document.querySelector('.keyboard-controls-info'),
    keyboardControlsButton: document.querySelector('.keyboard-controls-button'),
    startingWith: document.querySelector('.letter_starting-with'),
    question: document.querySelector('.question'),
    userAnswer: document.querySelector('.answer-input'),
    requiredAlert: document.querySelector('.required-alert'),
    submitAnswerButton: document.querySelector('.submit-answer-button'),
    passButton: document.querySelector('.pass-button'),
    answerFeedback: document.querySelector('.answer-feedback')
};

export const endOfGameSelectors = {
    endOfGameScreen: document.querySelector('.end-screen'),
    endOfGameTitle: document.querySelector('.end-title'),
    endOfGameInfo: document.querySelector('.end-info'),
    playAgainButton: document.querySelector('.play-again-button')
};

export const audioSelectors = {
    music: document.querySelector('.music'),
    musicPlayer: document.querySelector('.music-player'),
    musicCheckBox: document.querySelector('.music-player__checkbox')
};