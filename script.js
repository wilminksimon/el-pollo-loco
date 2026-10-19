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
