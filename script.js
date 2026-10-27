let backgroundMusic = new Audio('audio/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

let isMuted = false;
let gameSounds = [];

function registerSound(sound) {
    gameSounds.push(sound);
    sound.muted = isMuted;
}

function playSound(sound) {
    if (isMuted) return;
    sound.play();
}

function toggleMute() {
    isMuted = !isMuted;
    backgroundMusic.muted = isMuted;
    gameSounds.forEach(sound => {
        sound.muted = isMuted;
    });

    let buttons = [
        document.getElementById('mute-button'),
        document.getElementById('game-mute-button')
    ];

    buttons.forEach(button => {
        let image = button.querySelector('img');
        image.src = isMuted
            ? 'img/9_intro_outro_screens/ui/volume-off.svg'
            : 'img/9_intro_outro_screens/ui/volume-on.svg';
    });
    document.activeElement.blur();
}

function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('game-mute-button').style.display = 'flex';

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    showMobileControls();
    init();
}


function showMobileControls() {
    let touchControls = document.getElementById('touch-controls');
    let isMobileLandscape = window.matchMedia(
        '(max-width: 900px) and (orientation: landscape)'
    ).matches;

    touchControls.classList.toggle('active', isMobileLandscape);
}


let intervalIds = [];

function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

function stopGame() {
    if (world.animationFrameId !== null) {
        cancelAnimationFrame(world.animationFrameId);
        world.animationFrameId = null;
    }
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
    document.getElementById('game-mute-button').style.display = 'none';
    document.getElementById('startScreen').style.display = 'flex';
}



function showControls() {
    document.getElementById('controls-dialog').classList.remove('d-none');
}


function showHelp() {
    document.getElementById('imprint-dialog').classList.remove('d-none');
}


function closeDialog(dialogId) {
    document.getElementById(dialogId).classList.add('d-none');
}


