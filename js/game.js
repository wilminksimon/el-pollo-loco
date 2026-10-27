let canvas;
let world;
let keyboard = new Keyboard();
let touchEventsBound = false;


function init() {
    bindTouchEvents();
    canvas = document.getElementById('canvas');
    keyboard.lastKeyPress = new Date().getTime();
    world = new World(canvas, keyboard);
}

window.addEventListener("keydown", (e) => {

    keyboard.lastKeyPress = new Date().getTime();

    if (e.keyCode == 39) {
        keyboard.RIGHT = true;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = true;
    }

    if (e.keyCode == 38) {
        keyboard.UP = true;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = true;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = true;
    }

    if (e.keyCode == 68) {
        keyboard.D = true;
    }
})

window.addEventListener("keyup", (e) => {

    if (e.keyCode == 39) {
        keyboard.RIGHT = false;
    }

    if (e.keyCode == 37) {
        keyboard.LEFT = false;
    }

    if (e.keyCode == 38) {
        keyboard.UP = false;
    }

    if (e.keyCode == 40) {
        keyboard.DOWN = false;
    }

    if (e.keyCode == 32) {
        keyboard.SPACE = false;
    }

    if (e.keyCode == 68) {
        keyboard.D = false;
    }
})



function bindTouchEvents() {
        if (touchEventsBound) {
        return;
    }

    touchEventsBound = true;
    window.addEventListener('resize', showMobileControls);

    

    document.getElementById('touch-left')
        .addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.lastKeyPress = new Date().getTime();
            keyboard.LEFT = true;
        });
    document.getElementById('touch-left')
        .addEventListener('touchend', () => {
            keyboard.LEFT = false;
        });

    document.getElementById('touch-right')
        .addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.lastKeyPress = new Date().getTime();
            keyboard.RIGHT = true;
        });
    document.getElementById('touch-right')
        .addEventListener('touchend', () => {
            keyboard.RIGHT = false;
        });

    document.getElementById('touch-jump')
        .addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.lastKeyPress = new Date().getTime();
            keyboard.SPACE = true;
        });
    document.getElementById('touch-jump')
        .addEventListener('touchend', () => {
            keyboard.SPACE = false;
        });

    document.getElementById('touch-throw')
        .addEventListener('touchstart', (e) => {
            e.preventDefault();
            keyboard.lastKeyPress = new Date().getTime();
            keyboard.D = true;
        });
    document.getElementById('touch-throw')
        .addEventListener('touchend', () => {
            keyboard.D = false;
        });
}

