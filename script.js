let backgroundMusic = new Audio('audio/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    init();
}

let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    backgroundMusic.pause();
    backgroundMusic.currentTime = 0;
}

function restartGame() {
    stopGame();
    document.getElementById('game-over-screen')
        .classList.add('d-none');
    document.getElementById('win-screen')
        .classList.add('d-none');
    backgroundMusic.play();
    init();
}

function goToStartScreen() {
    stopGame();
    document.getElementById('game-over-screen')
        .classList.add('d-none');
    document.getElementById('win-screen')
        .classList.add('d-none');
    document.getElementById('canvas').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}
