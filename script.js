let backgroundMusic = new Audio('audio/background-music.mp3');
backgroundMusic.loop = true;
backgroundMusic.volume = 0.2;

let isMuted = localStorage.getItem('isMuted') === 'true';
backgroundMusic.muted = isMuted;
let gameSounds = [];

/**
 * Registers a sound so its mute state can be updated with the other game sounds.
 * @param {HTMLAudioElement} sound - The sound to register.
 */
function registerSound(sound) {
    gameSounds.push(sound);
    sound.muted = isMuted;
}

/**
 * Plays a sound unless the game is muted.
 * @param {HTMLAudioElement} sound - The sound to play.
 */
function playSound(sound) {
    if (isMuted) return;
    sound.play();
}


/** Toggles the mute state for all game sounds and updates the mute controls. */
function toggleMute() {
    isMuted = !isMuted;
    localStorage.setItem('isMuted', isMuted);
    backgroundMusic.muted = isMuted;

    gameSounds.forEach(sound => {
        sound.muted = isMuted;
    });

    updateMuteButtons();
    document.activeElement.blur();
}


/** Updates the mute button icons to match the current mute state. */
function updateMuteButtons() {
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
}

window.addEventListener('DOMContentLoaded', updateMuteButtons);

/** Hides the start screen and initializes the game. */
function startGame() {
    document.getElementById('startScreen').style.display = 'none';
    document.getElementById('canvas').style.display = 'block';
    document.getElementById('game-mute-button').style.display = 'flex';

    backgroundMusic.currentTime = 0;
    backgroundMusic.play();
    showMobileControls();
    init();
}


/** Shows or hides the touch controls based on the current screen orientation. */
function showMobileControls() {
    let touchControls = document.getElementById('touch-controls');

    let isTouchDevice = window.matchMedia(
        '(max-width: 1200px)'
    ).matches;

    touchControls.classList.toggle('active', isTouchDevice);
}


let intervalIds = [];

/**
 * Starts an interval that can later be stopped when the game ends.
 * @param {Function} fn - The callback to run repeatedly.
 * @param {number} time - The interval delay in milliseconds.
 */
function setStoppableInterval(fn, time) {
    let id = setInterval(fn, time);
    intervalIds.push(id);
}

/** Stops the game animation, intervals, and background music. */
function stopGame() {
    intervalIds.forEach(id => clearInterval(id));
    intervalIds = [];

    if (typeof world !== 'undefined' &&
        world &&
        world.animationFrameId !== null) {
        cancelAnimationFrame(world.animationFrameId);
        world.animationFrameId = null;
    }
}

/** Resets the end screens and starts a new game. */
function restartGame() {
    stopGame();
    document.getElementById('game-over-screen')
        .classList.add('d-none');
    document.getElementById('win-screen')
        .classList.add('d-none');
    backgroundMusic.play();
    init();
}

/** Stops the game and returns to the start screen. */
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



/** Opens the controls dialog. */
function showControls() {
    document.getElementById('controls-dialog').classList.remove('d-none');
}


/** Opens the imprint dialog. */
function showHelp() {
    document.getElementById('imprint-dialog').classList.remove('d-none');
}


/**
 * Closes the dialog with the given element ID.
 * @param {string} dialogId - The ID of the dialog to close.
 */
function closeDialog(dialogId) {
    document.getElementById(dialogId).classList.add('d-none');
}